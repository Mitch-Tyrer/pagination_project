/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/
const list = document.querySelectorAll('.student-item');
const itemsPerPage = 10;
let curPage = 1;




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



/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

const addPageLinks = (list) => {
   // display totalPages
      const totalPages = list.length/itemsPerPage;
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

showPage(list, curPage);
addPageLinks(list);
 



// Remember to delete the comments that came with this file, and replace them with your own code comments.