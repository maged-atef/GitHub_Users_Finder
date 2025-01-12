const card_info = document.getElementById('card-data')
const btn_info = document.getElementById('btn-data')
const info = document.getElementById('info-data')
const repo = document.getElementById('repo-data')
const input = document.getElementById('input')
const visit = document.getElementById('visit')
const main = document.getElementById('main-content')
const repo_search = document.getElementById('repo_search')
let user = "";
let allrepo =""; 

input.addEventListener('keyup', function (e) {
    console.log(e.target.value)
    let Search_Value = e.target.value;
    let repo_content = '';
  
    $.ajax({
        url: 'https://api.github.com/users/' + `${Search_Value}` + '/repos',
        dataType: "JSON",
        data: {
            App_ID: "1109406",
            client_ID: "Iv23li5IsiOy6iLCUW0o",
        },
        method: "GET"

    }).done(function (user_repo) {
        console.log(user_repo)
        allrepo = user_repo; 
       for(let i=0; i<user_repo.length; i++){
        repo_content += `
        <div class="accordion container" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                     <div class="view-rules"> 
                         <div ><strong>${user_repo[i].name}</strong></div>
                   
                       
                       
                     </div>
                  
                  </h2>
                
                       
                        
                    
                  <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                    <div class="accordion-body">
                        <ul class="list-group">
                        
                            <li class="list-group-item list-group-item-primary">
                              <span class="badge bg-danger">Visibility: ${user_repo[i].visibility}</span>
                        <span class="badge bg-secondary">Watchers: ${user_repo[i].watchers_count}</span>
                        <span class="badge bg-success">License: ${user_repo[i].license}</span>
                            </li>
                            <li class="list-group-item list-group-item-primary">Repo Page: <a href=${user_repo[i].html_url} target="_blank">View Repo</a></li>
                            <li class="list-group-item list-group-item-primary">Demo: <a href=${user_repo[i].homepage} target="_blank">Demo</a></li>
                           
                            <li class="list-group-item list-group-item-secondary">Language : ${user_repo[i].language}</li>
                            <li class="list-group-item list-group-item-success">Open Issues Count: ${user_repo[i].open_issues_count}</li>
                            <li class="list-group-item list-group-item-danger">Updated At : ${user_repo[i].updated_at}</li>
                           
                          </ul>
                    </div>
                  </div>
                </div>
                
              </div>
              </div>
    
    `
       }
       
       
        repo.innerHTML = repo_content;
    })
    $.ajax({
        url: `https://api.github.com/users/${Search_Value}`,
        method: "GET",
        dataType: "JSON",
        data: {
            App_ID: "1109406",
            client_ID: "Iv23li5IsiOy6iLCUW0o",
        }
    }).done(function (user_data) {
        console.log(user_data)
        user = user_data
        console.log(user)
        let content = '';

        content = `
        <div class="col-md-3">
                    <div class="card" id="card-data">
                        <h3 class="h4 ms-1 mt-1">${user.login}</h3>
                        <img src=${user.avatar_url} class="card-img-top w-100" alt="...">
                        <div class="card-body">
                          <h5 class="card-title">UserID : ${user.id}</h5>
                          <a href=${user.html_url} target="_blank" class="btn btn-primary">Open Profile</a>
                        </div>
                      </div>     
                </div>

                <div class="col-md-9 mt-3">
                   <div class="mb-2" id="btn-data">
                        <span class="badge bg-primary">Public Repo:${user.public_repos}</span>
                          <span class="badge bg-secondary">Public Gists:${user.public_gists}</span>
                          <span class="badge bg-success">Followers: ${user.followers}</span>
                          <span class="badge bg-danger">Following: ${user.following}</span>
                   </div>
                   <ul class="list-group" id="info-data">
                    <li class="list-group-item">Company: ➡${user.company ?? " No Data Registered"}</li>
                    <li class="list-group-item">WebSite: ➡${user.blog ?? " No Data Registered"}  </li>
                    <li class="list-group-item">Location: ➡ ${user.location ?? " No Data Registered"} </li>
                    <li class="list-group-item">Member Since: ➡${user.created_at}  </li>
                    <li class="list-group-item">Email: ➡${user.email ?? " No Data Registered"}  </li>
                    <li class="list-group-item">Type: ➡${user.type}  </li>
                  </ul>
                </div>
        
        `
        main.innerHTML = content;

    })
})

repo_search.addEventListener('keyup',function(e){
    let repo_content_seatch = ''; 
    let repo_content=""
   let repoName = e.target.value; 
   let searchResult = allrepo.filter((repo)=> repo.name.toLowerCase() == repoName.toLowerCase())
   for(let i=0; i<searchResult.length; i++){
    repo_content_seatch += `
    <div class="accordion container" id="accordionPanelsStayOpenExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                 <div class="view-rules"> 
                     <div ><strong>${searchResult[i].name}</strong></div>
               
                   
                   
                 </div>
              
              </h2>
               
                  
                 
              <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                <div class="accordion-body">
                    <ul class="list-group">

                        <li class="list-group-item list-group-item-danger"><span class="badge bg-primary">Visibility: ${searchResult[i].visibility}</span>
                          <span class="badge bg-secondary">Watchers: ${searchResult[i].watchers_count}</span>
                          <span class="badge bg-success">License: ${searchResult[i].license}</span>
                        </li>
                        <li class="list-group-item list-group-item-primary">Repo Page: <a href=${searchResult[i].html_url} target="_blank">View Repo</a></li>
                        <li class="list-group-item list-group-item-primary">Demo: <a href=${searchResult[i].homepage} target="_blank">Demo</a></li>
                       
                        <li class="list-group-item list-group-item-secondary">Language : ${searchResult[i].language}</li>
                        <li class="list-group-item list-group-item-success">Open Issues Count: ${searchResult[i].open_issues_count}</li>
                        <li class="list-group-item list-group-item-danger">Updated At : ${searchResult[i].updated_at}</li>
                       
                      </ul>
                </div>
              </div>
            </div>
            
          </div>
          </div>

`

   }
   if(repoName ==="" || repoName == null){
    for(let i=0; i<allrepo.length; i++){
        repo_content += `
        <div class="accordion container" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                     <div class="view-rules"> 
                         <div ><strong>${allrepo[i].name}</strong></div>
                   
                       
                       
                     </div>
                  
                  </h2>
                  
                         
                        
                    
                  <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                    <div class="accordion-body">
                        <ul class="list-group">
                         <li class="list-group-item list-group-item-danger">
                         <span class="badge bg-primary">Visibility: ${allrepo[i].visibility}</span>
                        <span class="badge bg-secondary">Watchers: ${allrepo[i].watchers_count}</span>
                        <span class="badge bg-success">License: ${allrepo[i].license}</span>
                        </li>
                            <li class="list-group-item list-group-item-primary">Repo Page: <a href=${allrepo[i].html_url} target="_blank">View Repo</a></li>
                            <li class="list-group-item list-group-item-primary">Demo: <a href=${allrepo[i].homepage} target="_blank">Demo</a></li>
                           
                            <li class="list-group-item list-group-item-secondary">Language : ${allrepo[i].language}</li>
                            <li class="list-group-item list-group-item-success">Open Issues Count: ${allrepo[i].open_issues_count}</li>
                            <li class="list-group-item list-group-item-danger">Updated At : ${allrepo[i].updated_at}</li>
                           
                          </ul>
                    </div>
                  </div>
                </div>
                
              </div>
              </div>
    
    `
    
       }
        repo.innerHTML = repo_content; 
   }else{
    repo.innerHTML = repo_content_seatch;
   }
})

