// $(document).ready(function() {

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
  checkErrors: function () {
    var error = "Could not create account as some information is incorrect. Please check your information again."
    var inputs = document.querySelectorAll('.text-input-style')
    var errors = document.querySelectorAll('.error')
    var isError = false;
    errors.forEach(error => {
      if (error.textContent != "") {
        isError = true;
        return;
      }
    })
    inputs.forEach(input => {
      if (input.value === "") {
        isError = true;
        return;
      }
    })
    if (isError) {
      document.getElementById('submit-error').innerHTML = error;
      return;
    } else {
      document.getElementById('submit-error').innerHTML = "";
      handlers.createUser()
      location.href = "search.html";
    }
  },
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
  },
  selectTab: function () {
    var opportunities = document.getElementById('opportunities');
    var jobseekers = document.getElementById('jobseekers');
    var jobSearch = document.getElementById('jobSearch');
    var pplSearch = document.getElementById('pplSearch');
    opportunities.classList.toggle('selected');
    opportunities.classList.toggle('not-selected');
    jobseekers.classList.toggle('selected');
    jobseekers.classList.toggle('not-selected');
    jobSearch.classList.toggle('show');
    jobSearch.classList.toggle('hide');
    pplSearch.classList.toggle('show');
    pplSearch.classList.toggle('hide');
  }
}

var events = {
  setUpEventListeners: function(url) {
    if (url.includes("create-account")) {
      // var createBtn = document.getElementById('account-create');
      var formInputs = document.querySelectorAll('.text-input-style');
      var startBtn = document.getElementById('start-btn');
      formInputs.forEach(input => input.addEventListener('blur', validators.validate));
      startBtn.addEventListener('click', handlers.checkErrors)
    }

    if (url.includes("search")) {
      const filterButton = document.querySelector('.filter');
      const tab = document.querySelectorAll('.tab');
      tab.forEach(tab => tab.addEventListener('click', handlers.selectTab));
      filterButton.addEventListener('click', handlers.toggleOpen);
    }
  }
}

var validators = {
  validate: function () {
    var error = "";
    var errors = document.querySelectorAll('.error');
    var formInputs = document.querySelectorAll('.text-input-style');
    formInputs.forEach(input => {
      var name = input.id;
      if (input.value === '') {
        error = "This field is mandatory";
        document.getElementById(`${name}-error`).innerHTML = error;
      }
      else if (input.value.length > input.maxLength || input.value.length < input.minLength) {
        error = `Number of characters must be between ${input.minLength} and ${input.maxLength}`;
        document.getElementById(`${name}-error`).innerHTML = error;
      } else if (input.value.length <= input.maxLength && input.value.length >= input.minLength) {
        error = "";
        document.getElementById(`${name}-error`).innerHTML = error;
      }
      if (input.id === 'email') {
        var emailInput = document.getElementById('email').value;
        emailError = validators.validateEmail(emailInput);
        document.getElementById(`email-error`).innerHTML = emailError;
      }
      if (input.id === 'password') {
        var pwInput = document.getElementById('password').value;
        pwError = validators.validatePw(pwInput);
        document.getElementById(`password-error`).innerHTML = pwError;
      }
      if (input.id === 'confirm-password') {
        var pwcInput = document.getElementById('confirm-password').value;
        var pwInput = document.getElementById('password').value;
        pwcError = validators.validatePwc(pwInput, pwcInput);
        document.getElementById(`confirm-password-error`).innerHTML = pwcError;
      }
    })



    //
    //
    //
    // if (this.value === '') {
    //   error = "This field is mandatory";
    // }
    // else if (this.value.length > this.maxLength || this.value.length < this.minLength) {
    //   error = `Number of characters must be between ${this.minLength} and ${this.maxLength}`;
    // }
    // else if (this.id === 'email') {
    //   var emailInput = document.getElementById('email').value;
    //   error = validators.validateEmail(emailInput)
    //   }
    // else if (this.id === 'password') {
    //   var pwInput = document.getElementById('password').value;
    //   error = validators.validatePw(pwInput)
    //   }
    // else if (this.id === 'confirm-password') {
    //   var pwcInput = document.getElementById('confirm-password').value;
    //   var pwInput = document.getElementById('password').value;
    //   error = validators.validatePwc(pwInput, pwcInput)
    //   }
    // else {
    //   error = "";
    //   errors.forEach(e => e.textContent = error);
    // }
    // document.getElementById(`${this.id}-error`).innerHTML = error;
    // return error;
  },
  validateEmail: function (email) {
    var re = new RegExp ("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    if (!re.test(email)) {
     return "Please enter a valid email address";
    } else {
     return "";
   }
  },
  validatePw: function (password) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!re.test(password)) {
      return "Password must contain at least one number, one lowercase and one uppercase letter at least six characters";
    } else {
      return "";
    }
  },
  validatePwc: function (password, passwordconf) {
    if (password !== passwordconf) {
      return "Password does not match";
    } else {
      return "";
    }
  }
}

events.setUpEventListeners(window.location.href);

// });






// var opportunities = [];

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
