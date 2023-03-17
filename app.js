/* */

const token = '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'

/* GET BUTTONS*/
const btnRepos = document.querySelector('.main__button--searchRepos');
const btnIssues = document.querySelector('.main__button--searchIssues');
const btnCommits = document.querySelector('.main__button--searchCommits');
const btnCreateIssue = document.querySelector('.main__button--createIssue');
const article = document.querySelector('.article');


async function baseURL(){
  const url = 'https://api.github.com';

  let response = await fetch(url);
  let result = await response.json();

  console.log(result);
}

baseURL();

/*ADD EVENT LISTENERS */
btnRepos.addEventListener('click', getRepos);
btnIssues.addEventListener('click', getIssues);

/* ASYNC FUNCTIONS */
/* GET REPOS*/
async function getRepos(){
  clear();
  
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

  repoPara.innerHTML = 'I searched for repositories owned by the freeCodeCamp organization and here is a list: <br><br>';

  repoPara.style.marginTop = '1rem'

  article.appendChild(repoPara);

  reposArr.forEach(repo=>{
    console.log(repo.full_name);
  

    let li = document.createElement('li'),
        repoFullName = document.createTextNode(repo.full_name);

    li.appendChild(repoFullName);
    ol.appendChild(li);
  })
  
  article.appendChild(ol);
}

/* GET ISSUES*/
async function getIssues(){
  clear();

  const url = 'https://api.github.com/search/issues?q=freecodecamp/freecodecamp'

  let response = await fetch(url);
  let results = await response.json();

  let resultsArr= results.items,
      para = document.createElement('p'),
      ol = document.createElement('ol');

  console.log(resultsArr);

 resultsArr.map(result => {
  let issueStr = result.body;
  console.log(issueStr);

  let li = document.createElement('li'),
      anchor = document.createElement('a'),
      link = result.html_url;

  anchor.setAttribute('href', link);
  anchor.textContent = `${issueStr}`.substring(0, 120) + '...';

  li.appendChild(anchor);
  ol.appendChild(li);
 })

 para.innerHTML = 'I searched for issues within the freeCodeCamp repos and here is a list: <br><br>';

 article.appendChild(para);
 article.appendChild(ol);
 
}


/* CLEAR THE PAGE*/
function clear(){
  while(article.firstChild){
    article.removeChild(article.firstChild);
  }
}


