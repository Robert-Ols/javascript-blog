'use strict';

const opts = { 
  articleSelector: '.post',
  titleSelector: '.post-title',
  titleListSelector: '.titles',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post .post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  authorsListSelector: '.list.authors',
};

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
  opts.articleSelector = clickedElement.getAttribute ('href');  
  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(opts.articleSelector);
  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  function clearTitleList() {
    titleList.innerHTML = '';
  }
  clearTitleList();
  /* for each article */
  const articles = document.querySelectorAll(opts.articleSelector + customSelector);
  //console.log(opts.articleSelector + customSelector);
  let html = '';
  for(let article of articles) {
    /*get the article id*/
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    /* get the title from the title element */
    /* create HTML of the link */
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a><li>';
    /* insert link into titleList */
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  //console.log(links);  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find tags wrapper */
    const wrapper = article.querySelector(opts.articleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');  
    /* [DONE] split tags into array */
    const articleTagsArray = articleTags.split(' ');
    /* [DONE] START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /* [DONE] generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';                 
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
  console.log('Tag was Clicked',clickedElement);
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
  const articles = document.querySelectorAll(opts.articleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector(opts.articleAuthorSelector);
    let html = '';
    /* [DONE] get tags from post-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    /* [DONE] generate HTML of the link */
    const authorHTML = '<a href="#author-' + articleAuthor + '">' + articleAuthor + '</a>';
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
  console.log('Autor was Clicked', clickedElement);
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

/* -- Generate tags in the right column. -- */
function calculateTagsParams(tags){
  const params = {
    max : 0, 
    min : 999999
  };
  for(let tag in tags){
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (opts.cloudClassCount - 1) + 1 );
  return classNumber;
}

function generateTags(){
  /* [DONE] [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
  /* [DONE] find tags wrapper */
    const tagWrapper = article.querySelector(opts.articleTagsSelector);
    /* [DONE] make html variable with empty string */
    let html = '';
    /* [DONE] get tags from data-tags attribute */
    const tagsData = article.getAttribute('data-tags');
    /* [DONE] split tags into array */
    const tagsArray = tagsData.split(' ');  
    /* [DONE] START LOOP: for each tag */
    for(let tag of tagsArray){ 
    /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* [DONE] add generated code to html variable */
      html = html + ' ' + linkHTML; 
      /* [DONE] [NEW] check if this link is NOT already in allTags */      
      if(!allTags[tag]) {
      /* [DONE] [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }else {
        allTags[tag]++;
      }
    /* [DONE] END LOOP: for each tag */
    }
    /* [DONE] insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    /* [DONE] END LOOP: for every article: */
  }    
  /* [DONE] [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);
  /* [DONE] [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  let allTagsHTML = '';
  /* [DONE] [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [DONE] [NEW] generate code of a link and add it to allTagsHTML */
    const tagLinkHTML = '<li><a class="tag-size-'+ calculateTagClass(allTags[tag], tagsParams) +'" href="#tag-' + tag + '">' + tag + '</a></li>';
    allTagsHTML += tagLinkHTML;
    /* [DONE] [NEW] END LOOP: for each tag in allTags: */
  }
  /* [DONE] [NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;
}

/* -- Generate the author in the right column. -- */
function generateAuthors(){
  /* [DONE] [NEW] create a new variable allAuthors with an empty object */
  let allAuthors = {};
  /* [DONE] find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector(opts.articleAuthorSelector);
    /* [DONE] make html variable with empty string */
    let html = ' ';
    /* [DONE] get authors from data-tags attribute */
    const dataAuthor = article.getAttribute('data-author');
    /* [DONE] split tags into array */
    const authorsArray = dataAuthor.split('  ');
    /* [DONE] START LOOP: for each author */
    for(let author of authorsArray){
      /* [DONE] generate HTML of the link */
      const linkHTML ='<a href="#- ' + author + '"><span class="author-name">' + author + '</span></a>';    
      /*[DONE]  add generated code to html variable */
      html = html + ' ' + linkHTML;      
      /* [DONE] [NEW] check if this link is NOT already in allAuthors */
      if(!allAuthors[author]) {
        /* [DONE] [NEW] add author to allAuthors object */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
    /* [DONE] END LOOP: for each author */
    }    
    /* [DONE] insert HTML of all the links into the author wrapper */
    authorWrapper.innerHTML = html;    
  /* [DONE] END LOOP: for every article: */
  }
  /* [DONE] [NEW] find list of authors in right column */
  const authorList = document.querySelector(opts.authorsListSelector);
  /* [DONE] [NEW] create variable for all links HTML code */
  let allAuthorsHTML = ' ';
  /* [DONE] [NEW] START LOOP: for each author in allAuthors: */
  for(let author in allAuthors){
    /* [DONE] [NEW] generate code of a link and add it to allAuthorsHTML */
    const authorLinkHTML = '<a href="#- ' + author + ' "><span>' + author  + '</span> (' + allAuthors[author] +') </a>';
    allAuthorsHTML += authorLinkHTML;            
    /* [DONE] [NEW] END LOOP: for each author in allAuthors: */
  }
  /* [DONE] [NEW] add HTML from allAuthorsHTML to authorsList */
  authorList.innerHTML = allAuthorsHTML;
}

