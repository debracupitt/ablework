$(document).ready(function() {

const filterButton = document.querySelector('.filter');
const filterForm = document.querySelector('.search-form');

// function toggleOpen () {
//   filterForm.classList.toggle('show');
// }

function viewForm () {
  if (filterForm.style.display === "none") {
    filterForm.style.display = "block";
  } else {
    filterForm.style.display = "none";
  }
}

filterButton.addEventListener('click', viewForm)

});
