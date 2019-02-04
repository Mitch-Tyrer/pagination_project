/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

// Declare Variables
const studentUL = document.querySelector('.student-list');
const studentList = studentUL.children;
const perPage = 10;
let curPage = 1;
let totalPages = studentList.length / perPage;

// function to show the the page based on the total items per page
const showPage = (list, pageNum) => {
   //find indexes of first and last element
   let first = (pageNum - 1) * perPage;
   let last = (pageNum * perPage) - 1;
   // iterate over the list and change display
   for (let i = 0; i < list.length; i++) {
      // hide all
      list[i].style.display = 'none';
      //show only those between first and last index
      if (i >= first && i <= last) {
         list[i].style.display = 'block';
      }
   }
}

//Function to append links to the bottom of the page based on number of items in the list
const addPageLinks = () => {
   // create a div element class pagination, append to page div
   let pageDiv = document.querySelector('.page');
   let linkDiv = document.createElement('div');
   linkDiv.className = 'pagination';
   pageDiv.appendChild(linkDiv)
   // Add ul to div
   let linksUL = document.createElement('ul');
   linkDiv.appendChild(linksUL);
   //iterate for every page and add an li w/ a tags containing page number
   for(let i = 0; i < totalPages; i++){
      let li = document.createElement('li');
      li.innerHTML = `<a href="#"> ${i + 1} </a>`;
      linksUL.appendChild(li);
   }
   let page = document.querySelectorAll('.pagination > ul > li > a');
   page[curPage -1].className = 'active';
   // add a click listener to each a tag that calls show page with appropriate page
   linksUL.addEventListener('click', (e) => {
      // iterate through links and remove active class
      for(let i = 0; i < page.length; i++){
         page[i].className = '';
         // add active class to event target link
         e.target.className = 'active';
      }
      //update current page number and call the show function
      curPage = e.target.textContent
      showPage(studentList, curPage);

   });  
}

// function to append a search bar to top of page
const searchBar = () => {
   //declare variable to append to the header
   let header = document.querySelector('.page-header');
   //create form element with inputs
   let form = document.createElement('form');
   let search = document.createElement('input');
   let button = document.createElement('button');
   // add classes and types then append to form element
   button.type = 'submit';
   button.textContent = 'Search';
   search.type = 'text';
   search.placeholder = 'Search for Students';
   form.className = 'page-header student-search';
   form.appendChild(search);
   form.appendChild(button);
   //append to header
   header.appendChild(form);

         // Event Listener for search functionality
         form.addEventListener('keyup', (e) => {
            //varible to target names
            const students = document.querySelectorAll('.student-details > h3');
            // find user input
            const userInput = e.target.value.toLowerCase();

            //iterate over the node list, compare input to names in students text content
            for(let i = 0; i < students.length; i++){
               // convert to lowercase
               students[i].textContent.toLowerCase();

               // conditional to display names that match
               if(students[i].textContent.indexOf(userInput) !== -1){
                  studentList[i].style.display = 'block';
               } else {
                  studentList[i].style.display = 'none';
               }
            }
         
         })
}



//initial call on load of page
showPage(studentList, curPage);
addPageLinks();
searchBar();



// Remember to delete the comments that came with this file, and replace them with your own code comments.