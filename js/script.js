'use strict';

/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/

const titleClickHandler = function(event){
  const clickedElement = this;
  event.preventDefault();  
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute ('href');  
  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author';

function generateTitleLinks(){

  /* [DONE] remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);  
  titleList.innerHTML = '';  
  /* [DONE] for each article */
  /* [DONE] find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for(let article of articles){   
    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    /* [DONE] find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    /* [DONE] get the title from the title element */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log('linkHtml', linkHTML);
    /* [DONE] create HTML of the link */
    //titleList.innerHTML = titleList.innerHTML + linkHTML;
    /* [DONE] insert link into titleList */
    /* [DONE] insert link into html variable */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
    //console.log(html);
  }
  titleList.innerHTML = html;      

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');  
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /* [DONE] generate HTML of the link */
      const tagHTML = '<li><a href="#' + tag + '">' + tag + '</a></li>';
      /* [DONE] add generated code to html variable */
      html = html + ' ' + tagHTML;
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    wrapper.innerHTML = html;  
    /* [DONE] END LOOP: for every article: */
  }
}

generateTags();

function tagClickHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag Clicked', clickedElement);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', ''); 
  /* [DONE] find all tag links with class active */
  const allTagsLiknsActive = document.querySelectorAll('a.active[href^="#tag-"]');
  /* [DONE] START LOOP: for each active tag link */
  for(let tagLinkActive of allTagsLiknsActive){
    /* [DONE] remove class active */
    tagLinkActive.classList.remove('active');
    /* [DONE] END LOOP: for each active tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const allTagsLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
  for(let tagsLinkHref of allTagsLinksHref){
    /* [DONE] add class active */
    tagsLinkHref.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with article selector as argument */
  function generateTitleLinks(customSelector = ''){
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for(let article of articles){   
    /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* [DONE] insert link into html variable */
      html = html + linkHTML;
    }
  }  
  generateTitleLinks('[data-tags~="' + tag + '"]');  
}

function addClickListenersToTags(){
  /* [DONE] find all links to tags */
  const links = document.querySelectorAll('.list.list-horizontal a, .list.tags a');
  /* [DONE] START LOOP: for each link */
  for(const link of links){
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click',tagClickHandler);
    /* [DONE] END LOOP: for each link */
  }
}
addClickListenersToTags();

function generateAuthors(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    let html = '';
    /* [DONE] get tags from post-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    /* [DONE] generate HTML of the link */
    const authorHTML = '<a href="#tagAuthor-' + articleAuthor + '">' + articleAuthor + '</a>';
    /* [DONE] add generated code to html variable */
    html = html + ' ' + authorHTML;
    /* [DONE] END LOOP: for each tag */
    /* [DONE] insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html;  
  /* [DONE] END LOOP: for every article: */
  }
}

generateAuthors();


function authorClickedHandler(event){
  /* [DONE] prevent default action for this event */
  event.preventDefault();
  /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Autor Clicked', clickedElement);
  /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
  const tagAuthor = href.replace('#author-', '');
  /* [DONE] find all tag author links with class active */
  const authorsLikns = document.querySelectorAll('a.active[href^="#tagauthor-"]');
  /* [DONE] START LOOP: for each active tag link */
  for(let authorLik of authorsLikns){
    /* [DONE] remove class active */
    authorLik.classList.remove('active');
    /* [DONE] END LOOP: for each active author tag link */
  }
  /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
  const allTagsLinksHref = document.querySelectorAll('a[href="' + href + '"]');
  /* [DONE] START LOOP: for each found tag link */
  for(let tagsLinkHref of allTagsLinksHref) {
    /* [DONE] add class active */
    tagsLinkHref.classList.add('active');
    /* [DONE] END LOOP: for each found tag link */
  }
  /* [DONE] execute function "generateTitleLinks" with author selector as argument */
  function generateTitleLinks(customSelector = ''){
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for(let article of articles){   
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      /* [DONE] find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* [DONE] get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      /* [DONE] insert link into html variable */
      html = html + linkHTML;
    }   
  }
  generateTitleLinks('[data-author="' + tagAuthor + '"]');

}

function addClickListenersToAuthors(){
  /* [DONE] find all links to tags */
  const links = document.querySelectorAll('.post-author a');
  /* [DONE] START LOOP: for each link */
  for(const link of links){
    /* [DONE] add tagClickHandler as event listener for that link */
    link.addEventListener('click', authorClickedHandler);
    /* [DONE] END LOOP: for each link */
  }
}

addClickListenersToAuthors();