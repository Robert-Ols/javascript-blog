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
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  function clearTitleList() {
    titleList.innerHTML = '';
  }
  clearTitleList();
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log(optArticleSelector + customSelector);
  let html = '';
  for(let article of articles) {
    /*get the article id*/
    const articleId = article.getAttribute('id');
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
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
  const articles = document.querySelectorAll(optArticleSelector);
  /* [DONE] START LOOP: for every article: */
  for(let article of articles){
    /* [DONE] find author wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
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
    //console.log(tag + ' is used ' + tags[tag] + ' times');
  }
  return params;

}

//calculateTagsParams()

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  return classNumber;
}

function generateTags(){
  /* + + [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  //console.log('allTags', allTags);
  /* + + find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log('articles Tags', articles );
  /* + + START LOOP: for every article: */
  for(let article of articles){
  /* - - find tags wrapper */
    const tagWrapper = article.querySelector(optArticleTagsSelector);
    //console.log('Wrapper tags- ', tagWrapper);
    /* make html variable with empty string */
    let html = '';
    //console.log('let html', html);
    /* + + get tags from data-tags attribute */
    const tagsData = article.getAttribute('data-tags');
    //console.log('Data tags- ', tagsData); 
    /* + + split tags into array */
    const tagsArray = tagsData.split(' ');
    //console.log('Array tags- ', tagsArray);  
    /* START LOOP: for each tag */
    for(let tag of tagsArray){ 
    /* + + generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      //console.log('tag HTML', linkHTML);
      /* add generated code to html variable */
      html = html + ' ' + linkHTML;
      //console.log(html = html + ' ' + linkHTML);  
      /* + + [NEW] check if this link is NOT already in allTags */
      
      if(!allTags[tag]) {
      /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      }else {
        allTags[tag]++;
      }
      //if(allTags.indexOf(linkHTML) == -1){
      //  /* [NEW] add generated code to allTags arry */
      //  allTags.push(linkHTML);
      //}
    /* + + END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagWrapper.innerHTML = html;
    //console.log('tag Wrapper', tagWrapper);
    /* + + END LOOP: for every article: */
  }    
  /* + + [NEW] find list of tags in right column */
  const tagList = document.querySelector(optTagsListSelector);
  //console.log('end allTags ', allTags);
  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
  let allTagsHTML = '';
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    allTagsHTML += tag + ' (' + allTags[tag] + ') ';
    //allTagsHTML += tagLinkHTML;
    //const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
    //console.log('tagLinkHTML:', tagLinkHTML);
    /* [NEW] END LOOP: for each tag in allTags: */
  }
  /*[NEW] add HTML from allTagsHTML to tagList */
  tagList.innerHTML = allTagsHTML;

}

