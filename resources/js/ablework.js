// $(document).ready(function() {

var users = {
  jobSeekers: [],
  businesses: [],
  createUser: function(type, name, email, password, pic) {
    if (type === "jobSeeker") {
      this.jobSeekers.push({
        name: name,
        email: email,
        password: password,
        profPic: pic || "",
        descriptor:
          "Add a one sentence description of yourself or your job goal here.",
        resume: "",
        skills: "Add your skills here",
        bio: "Add a brief bio/story about yourself here",
        secretPower: "Describe your disability here",
        mobile: "",
        whatsApp: ""
      });
    }
    if (type === "business") {
      this.businesses.push({
        name: name,
        email: email,
        password: password,
        profPic: pic || "",
        descriptor:
          "Add a one sentence description of your business and the type of people you employ/train here.",
        jobs: [],
        opTypes: [],
        capacity: [],
        bio: "Add a brief bio/story about yourself here",
        mobile: "",
        whatsApp: ""
      });
    }
  }
};

var handlers = {
  checkErrors: function() {
    var error =
      "Could not create account as some information is incorrect. Please check your information again.";
    var inputs = document.querySelectorAll(".text-input-style");
    var errors = document.querySelectorAll(".error");
    var isError = false;
    errors.forEach(error => {
      if (error.textContent != "") {
        isError = true;
        return;
      }
    });
    inputs.forEach(input => {
      if (input.value === "") {
        isError = true;
        return;
      }
    });
    if (isError) {
      document.getElementById("submit-error").innerHTML = error;
      return;
    } else {
      document.getElementById("submit-error").innerHTML = "";
      handlers.createUser();
      location.href = "search.html";
    }
  },
  createUser: function() {
    var type = (function() {
      var type1 = document.getElementById("type1").checked;
      var type2 = document.getElementById("type2").checked;
      if (type1) {
        return "jobSeeker";
      }
      if (type2) {
        return "business";
      }
    })();
    var name = document.getElementById("name");
    var email = document.getElementById("email");
    var password = document.getElementById("password");
    users.createUser(type, name.value, email.value, password.value);
    console.log(users.jobSeekers);
  },
  toggleFilter: function() {
    const filterForm = document.querySelector(".filter-form");
    filterForm.classList.toggle("show");
  },
  toggleEvent: function() {
    const eventForm = document.querySelector(".event-form");
    eventForm.classList.toggle("show");
  },
  toggleResource: function() {
    const resourceForm = document.querySelector(".resource-form");
    resourceForm.classList.toggle("show");
  },
  toggleOpp: function() {
    const oppForm = document.querySelector(".opp-form");
    oppForm.classList.toggle("show");
  },
  selectTab: function() {
    var opportunities = document.getElementById("opportunities");
    var jobseekers = document.getElementById("jobseekers");
    var jobSearch = document.getElementById("jobSearch");
    var pplSearch = document.getElementById("pplSearch");
    opportunities.classList.toggle("selected");
    opportunities.classList.toggle("not-selected");
    jobseekers.classList.toggle("selected");
    jobseekers.classList.toggle("not-selected");
    jobSearch.classList.toggle("show");
    jobSearch.classList.toggle("hide");
    pplSearch.classList.toggle("show");
    pplSearch.classList.toggle("hide");
  }
};

var events = {
  setUpEventListeners: function(url) {
    if (
      url.includes("search") ||
      url.includes("events") ||
      url.includes("tips")
    ) {
      const filterDropdown = document.getElementById("filter");
      const filterButton = document.getElementById("run-filter");
      const closeFilter = document.getElementById("close-filter");
      filterDropdown.addEventListener("click", handlers.toggleFilter);
      filterButton.addEventListener("click", handlers.toggleFilter);
      closeFilter.addEventListener("click", handlers.toggleFilter);
    }

    if (url.includes("create-account")) {
      // var createBtn = document.getElementById('account-create');
      var formInputs = document.querySelectorAll(".text-input-style");
      var startBtn = document.getElementById("start-btn");
      formInputs.forEach(input =>
        input.addEventListener("blur", validators.validate)
      );
      startBtn.addEventListener("click", handlers.checkErrors);
    }

    if (url.includes("search")) {
      // Switch tabs
      const tab = document.querySelectorAll(".tab");
      tab.forEach(tab => tab.addEventListener("click", handlers.selectTab));
      // Create Opportunity
      const newOpp = document.getElementById("new-opp");
      const submitOpp = document.getElementById("submit-opp");
      const closeOpp = document.getElementById("close-opp");
      newOpp.addEventListener("click", handlers.toggleOpp);
      submitOpp.addEventListener("click", handlers.toggleOpp);
      closeOpp.addEventListener("click", handlers.toggleOpp);
    }

    if (url.includes("events")) {
      // Create Event
      const newEvent = document.getElementById("new-event");
      const submitEvent = document.getElementById("submit-event");
      const closeEvent = document.getElementById("close-event");
      newEvent.addEventListener("click", handlers.toggleEvent);
      submitEvent.addEventListener("click", handlers.toggleEvent);
      closeEvent.addEventListener("click", handlers.toggleEvent);
    }

    if (url.includes("tips")) {
      // Create Resource
      const newResource = document.getElementById("new-resource");
      const submitResource = document.getElementById("submit-resource");
      const closeResource = document.getElementById("close-resource");
      newResource.addEventListener("click", handlers.toggleResource);
      submitResource.addEventListener("click", handlers.toggleResource);
      closeResource.addEventListener("click", handlers.toggleResource);
    }
  }
};

var validators = {
  validate: function() {
    var error = "";
    var errors = document.querySelectorAll(".error");
    var formInputs = document.querySelectorAll(".text-input-style");
    formInputs.forEach(input => {
      var name = input.id;
      if (input.value === "") {
        error = "This field is mandatory";
        document.getElementById(`${name}-error`).innerHTML = error;
      } else if (
        input.value.length > input.maxLength ||
        input.value.length < input.minLength
      ) {
        error = `Number of characters must be between ${input.minLength} and ${
          input.maxLength
        }`;
        document.getElementById(`${name}-error`).innerHTML = error;
      } else if (
        input.value.length <= input.maxLength &&
        input.value.length >= input.minLength
      ) {
        error = "";
        document.getElementById(`${name}-error`).innerHTML = error;
      }
      if (input.id === "email") {
        var emailInput = document.getElementById("email").value;
        emailError = validators.validateEmail(emailInput);
        document.getElementById(`email-error`).innerHTML = emailError;
      }
      if (input.id === "password") {
        var pwInput = document.getElementById("password").value;
        pwError = validators.validatePw(pwInput);
        document.getElementById(`password-error`).innerHTML = pwError;
      }
      if (input.id === "confirm-password") {
        var pwcInput = document.getElementById("confirm-password").value;
        var pwInput = document.getElementById("password").value;
        pwcError = validators.validatePwc(pwInput, pwcInput);
        document.getElementById(`confirm-password-error`).innerHTML = pwcError;
      }
    });

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
  validateEmail: function(email) {
    var re = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
    );
    if (!re.test(email)) {
      return "Please enter a valid email address";
    } else {
      return "";
    }
  },
  validatePw: function(password) {
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (!re.test(password)) {
      return "Password must contain at least one number, one lowercase and one uppercase letter at least six characters";
    } else {
      return "";
    }
  },
  validatePwc: function(password, passwordconf) {
    if (password !== passwordconf) {
      return "Password does not match";
    } else {
      return "";
    }
  }
};

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
