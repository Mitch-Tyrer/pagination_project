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

//create element function
const newElement = (type, parent) => {
   let el = document.createElement(type);
   parent.appendChild(el);
   return el;
}

// No Results LI
const noRes = newElement('li', studentUL)
noRes.textContent = 'No results found...';
noRes.style.display = 'none';


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
   if(list.length === 0){
      noRes.style.display = 'block'
   } else {
      noRes.style.display = 'none';
   }
}



//Function to append links to the bottom of the page based on number of items in the list
const addPageLinks = (list) => {
   // create a div element class pagination, append to page div
   let pageDiv = document.querySelector('.page');
   let linkDiv = newElement('div', pageDiv);
   linkDiv.className = 'pagination';
   // Add ul to div
   let linksUL = newElement('ul', linkDiv)
   //iterate for every page and add an li w/ a tags containing page number
   for (let i = 0; i < totalPages; i++) {
      let li = newElement('li', linksUL);
      li.innerHTML = `<a href="#"> ${i + 1} </a>`;
   }
   let page = document.querySelectorAll('.pagination > ul > li > a');
   if(totalPages > 2){
      page[curPage -1].className = 'active';
   } else {
      page[0].className ='active';
   }
   // add a click listener to each a tag that calls show page with appropriate page
   linksUL.addEventListener('click', (e) => {
      // iterate through links and remove active class
      for (let i = 0; i < page.length; i++) {
         page[i].className = '';
         // add active class to event target link
         e.target.className = 'active';
      }
      //update current page number and call the show function
      curPage = e.target.textContent
      showPage(list, curPage);

   });
}

// function to delete page links
const deletePageLinks = () => {
   // declare links div
   const linkDiv = document.querySelector('.pagination')
   // remove them from the parent node
   linkDiv.parentNode.removeChild(linkDiv);
}

// function to append a search bar to top of page
const searchBar = () => {
   //declare variable to append to the header
   let header = document.querySelector('.page-header');
   //create form element with inputs
   let form = newElement('form', header);
   let search = newElement('input', form);
   // add classes and types then append to form element
   search.type = 'text';
   search.placeholder = 'Filter Students';
   form.className = 'page-header student-search';
   //append to header

   // Event Listener for search functionality
   form.addEventListener('keyup', (e) => {
      //reset current page
      curPage = 1;
      //varible to target names
      const students = document.querySelectorAll('.student-details > h3');
      // find user input
      const userInput = e.target.value.toLowerCase();
      // new array to push displayed items
      let filtered = [];
      //iterate over the node list, compare input to names in students text content
      for (let i = 0; i < students.length; i++) {
         // convert to lowercase
         students[i].textContent.toLowerCase();
         // conditional to display names that match
         if (students[i].textContent.indexOf(userInput) !== -1) {
            filtered.push(studentList[i]);
         } else {
            studentList[i].style.display = 'none';
         }
      }
      deletePageLinks();
      totalPages = filtered.length / perPage;
      showPage(filtered, curPage);
      addPageLinks(filtered);
   });
}



//initial call on load of page
showPage(studentList, curPage);
addPageLinks(studentList);
searchBar();



