$(document).ready(function() {

var users = {
  jobSeekers: [],
  businesses: [],
  createUser: function(type, name, email, password, pic) {
    if (type === 'jobSeeker') {
      this.jobSeekers.push({
        name: name,
        email: email,
        password: password,
        profPic: pic || '',
        descriptor: 'Add a one sentence description of yourself or your job goal here.',
        resume: '',
        skills: 'Add your skills here',
        bio: 'Add a brief bio/story about yourself here',
        secretPower: 'Describe your disability here',
        mobile: '',
        whatsApp: ''
      })
    }
    if (type === 'business') {
      this.businesses.push({
        name: name,
        email: email,
        password: password,
        profPic: pic || '',
        descriptor: 'Add a one sentence description of your business and the type of people you employ/train here.',
        jobs: [],
        opTypes: [],
        capacity: [],
        bio: 'Add a brief bio/story about yourself here',
        mobile: '',
        whatsApp: ''
      })
    }
  }
}

var handlers = {
  createUser: function () {
    var type = function() {
      var type1 = document.getElementById('type1').checked;
      var type2 = document.getElementById('type2').checked;
      if (type1) {
        return 'jobSeeker';
      };
      if (type2) {
        return 'business';
      }
    }();
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    users.createUser(type, name.value, email.value, password.value);
    console.log(users.jobSeekers);
  },
  toggleOpen: function () {
    const filterForm = document.querySelector('.search-form');
    filterForm.classList.toggle('show');
  }
}

var events = {
  setUpEventListeners: function(url) {
    if (url.includes("create-account")) {
      var createBtn = document.getElementById('account-create');
      createBtn.addEventListener('click', handlers.createUser);
    }

    if (url.includes("search")) {
      const filterButton = document.querySelector('.filter');

      filterButton.addEventListener('click', handlers.toggleOpen)
    }
  }
}

events.setUpEventListeners(window.location.href);
var opportunities = [];

// var opportunity = {
//   opName: opp,
//   jobPic: picFile,
//   opType: type, // training, apprenticeship, position
//   contractType: contract,
//   sector: sector,
//   bizName: biz.name,
//   bizDes: biz.bio,
//   role: roleDescription,
//   apply: howToApply
// }

});
