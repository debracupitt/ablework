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
      var formInputs = document.querySelectorAll('.text-input-style');
      formInputs.forEach(input => input.addEventListener('blur', validators.validate));
    }

    if (url.includes("search")) {
      const filterButton = document.querySelector('.filter');
      filterButton.addEventListener('click', handlers.toggleOpen)
    }
  }
}

var validators = {
  validate: function () {
    var error;
    if (this.value === '') {
      error = "This field is mandatory";
    }
    else if (this.value.length > this.maxLength || this.value.length < this.minLength) {
      error = `Number of characters must be between ${this.minLength} and ${this.maxLength}`;
    }
    else if (this.id === 'email') {
      var emailInput = document.getElementById('email').value;
      error = validators.validateEmail(emailInput)
      }
    else if (this.id === 'password') {
      var pwInput = document.getElementById('password').value;
      error = validators.validatePw(pwInput)
      }
    else if (this.id === 'confirm-password') {
      var pwcInput = document.getElementById('confirm-password').value;
      var pwInput = document.getElementById('password').value;
      error = validators.validatePwc(pwInput, pwcInput)
      }
    else {
      error = "";
    }
    document.getElementById(`${this.id}-error`).innerHTML = error;
  },
  // valEmail: function () {
  //   var emailInput = document.getElementById('email');
  //   email = emailInput.value
  //   // console.log(emailInput.name)
  //   if (!emailInput.validity.valid) {
  //    return "Please enter a valid email address";
  //  } else {
  //    return "";
  //  }
  // },
  validateEmail: function (email) {
    var re = new RegExp ("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$");
    if (!re.test(email)) {
     return "Please enter a valid email address";
    } else {
     return "";
   }
  },
  // valPw: function () {
  //   var pwInput = document.getElementById('password');
  //   console.log(pwInput.name);
  //   var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  //   if (!re.test(pwInput.value)) {
  //     return "Password must contain at least one number, one lowercase and one uppercase letter at least six characters";
  //   } else {
  //     return "";
  //   }
  // },
  validatePw: function (password) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!re.test(password)) {
      return "Password must contain at least one number, one lowercase and one uppercase letter at least six characters";
    } else {
      return "";
    }
  },
  // valPwc: function () {
  //   var pwcInput = document.getElementById('confirm-password');
  //   var pwInput = document.getElementById('password');
  //   if (pwcInput.value !== pwInput.value) {
  //     return "Password does not match";
  //   } else {
  //     return "";
  //   }
  // },
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
