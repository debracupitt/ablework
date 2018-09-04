$(document).ready(function() {

const filterButton = document.querySelector('.filter');
const filterForm = document.querySelector('.search-form');

function toggleOpen () {
  // console.log(filterForm)
  filterForm.classList.toggle('show');
}

filterButton.addEventListener('click', toggleOpen)

});
