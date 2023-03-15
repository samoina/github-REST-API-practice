/* */

const token = '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'

/* GET BUTTONS*/
const btnRepos = document.querySelector('.main__button--searchRepos');
const btnIssues = document.querySelector('.main__button--searchIssues');
const btnCommits = document.querySelector('.main__button--searchCommits');
const btnCreateIssue = document.querySelector('.main__button--createIssue');
const main = document.querySelector('.main');

/*ADD EVENT LISTENERS */
btnRepos.addEventListener('click', getRepos);


/* ASYNC FUNCTIONS */
async function getRepos(){
  baseURL();
  
  const url = "https://api.github.com/search/repositories?q=org:freecodecamp"

  const fetchOptions = {
    'method':'GET',
    'headers' : {
      'Authorization': `Token ${token}`
    }
  }

  let response = await fetch(url, fetchOptions),
      result = await response.json(),
      reposArr= result.items; 

  let repoPara = document.createElement('p'),
      ol = document.createElement('ol');

  repoPara.textContent = 'I searched for repositories owned by the freeCodeCamp organization';

  main.appendChild(repoPara);

  reposArr.forEach(repo=>{
    console.log(repo.full_name);
  

    let li = document.createElement('li'),
        repoFullName = document.createTextNode(repo.full_name);

    li.appendChild(repoFullName);
    ol.appendChild(li);
  })
  
  main.appendChild(ol);
}

async function baseURL(){
  const url = 'https://api.github.com';

  let response = await fetch(url);
  let result = await response.json();

  console.log(result);
}


