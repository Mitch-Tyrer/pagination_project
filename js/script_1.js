/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


//Global Variables
const ul = document.querySelector('.student-list');
const list = ul.children;
const itemsPerPage = 10;
let curPage = 1;

// no results page
const noResults = document.createElement('li');
noResults.textContent = 'No results found...';
ul.appendChild(noResults);
noResults.style.display = 'none';



// show list items function
const showPage = (arr, page) => {
   //iterate over the list items
   for(let i = 0; i < arr.length; i++){
      //hide them all to start
      arr[i].style.display = 'none';
      // declare the first and last items index based on page number
      // if display is 11 - 20 (index = 10 - 19) ---- first is (2-1)*10 --- last is (2*10) - 1; 
      let first = (page - 1) * itemsPerPage;
      let last = (page * itemsPerPage) -1;
      // show elements if their index is between the first and last element's index
      if( i >= first && i <= last){
         arr[i].style.display = 'block';
      } 
   }
}

// delete page links
const deleteLinks = () => {
   let links = document.querySelector('.pagination');
   ul.parentNode.removeChild(links);
}

//fucntion to add a search field to the DOM
const searchBar = () => {
   //insert the input field to the header div
   const header = document.querySelector('.page-header')
   const searchForm = document.createElement('form');
   const searchBar = document.createElement('input');
   searchForm.className = 'page-header student-search';
   searchBar.type = 'text';
   searchBar.placeholder = 'Search for Students';
   searchForm.appendChild(searchBar);
   header.appendChild(searchForm);
   //create a varible to find the text content of the student details h3 element
   const names = document.querySelectorAll('.student-details > h3');     
   // add key up event listener to begin filtering on each keystroke
   searchForm.addEventListener('keyup', (e) => {
      //retreive user input
      const userInput = e.target.value.toLowerCase();
      //iterate over the node list and compare inputed value to text content of lists h3
      for(let i = 0; i < names.length; i++){
         names[i].textContent.toLowerCase();
         
      // if statement to filter each name based on user input
         if(names[i].textContent.indexOf(userInput) !== -1){
            list[i].style.display = 'block';
         } else {
            list[i].style.display = 'none';
         } 

      }
  
   });
}



// JavaScript to add to make links to pages

const addPageLinks = (list, numPages) => {
   // display totalPages
      const totalPages = numPages/itemsPerPage;
   // create div element with class of pagination and append to the .page div
      let pageDiv = document.querySelector('.page');
      let linkDiv = document.createElement('div');
      linkDiv.className = 'pagination';
      pageDiv.appendChild(linkDiv)
   // create a ul and append to the pagination div
      let linksUL = document.createElement('ul');
      linkDiv.appendChild(linksUL);
   // iterate through totalPages and append a li w/ an a tag with page number
      for(let i = 0; i < totalPages; i++){
         let li = document.createElement('li');
         li.innerHTML = `<a href="#"> ${i + 1} </a>`;
         linksUL.appendChild(li);
      }
   
   // add click listener to a tags 
         let pages = document.querySelectorAll('a');
         pages[curPage - 1].className = 'active';
         linksUL.addEventListener('click', (e) => {
            // loop over the links and remove active class
            for(let i = 0; i < pages.length; i++){
               pages[i].className = '';
               // add active class to event target (link that was clicked)
               e.target.className = 'active';
            }
               // call the show page passing in the event target as the pagenumber
               curPage = e.target.textContent;
               showPage(list, curPage);
      });
}

searchBar();
showPage(list, curPage);
addPageLinks(list, list.length);
 



// Remember to delete the comments that came with this file, and replace them with your own code comments.