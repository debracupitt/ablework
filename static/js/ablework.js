$(document).ready(function() {
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
      }
    },

    toggleFilter: function() {
      const filterForm = document.querySelector(".filter-form");
      filterForm.classList.toggle("showform");
    },

    toggleEvent: function() {
      const eventForm = document.querySelector(".event-form");
      eventForm.classList.toggle("showform");
    },

    toggleResource: function() {
      const resourceForm = document.querySelector(".resource-form");
      resourceForm.classList.toggle("showform");
    },

    toggleOpp: function() {
      const oppForm = document.querySelector(".opp-form");
      oppForm.classList.toggle("showform");
    },

    toggleProfile: function() {
      const profileForm = document.querySelector(".profile-form");
      profileForm.classList.toggle("showform");
    },

    toggleBiz: function() {
      const profileForm = document.querySelector(".biz-form");
      profileForm.classList.toggle("showform");
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
      // if (
      //   url.includes("search") ||
      //   url.includes("events") ||
      //   url.includes("tips")
      // ) {
      //   const filterDropdown = document.getElementById("filter");
      //   const filterButton = document.getElementById("run-filter");
      //   const closeFilter = document.getElementById("close-filter");
      //   filterDropdown.addEventListener("click", handlers.toggleFilter);
      //   filterButton.addEventListener("click", handlers.toggleFilter);
      //   closeFilter.addEventListener("click", handlers.toggleFilter);
      // }

      if (url.includes("create-account")) {
        // var createBtn = document.getElementById('account-create');
        var formInputs = document.querySelectorAll(".text-input-style");
        var startBtn = document.getElementById("start-btn");
        formInputs.forEach(input =>
          input.addEventListener("blur", validators.validate)
        );
        startBtn.addEventListener("click", handlers.checkErrors);
      }

      if (url.includes("explore")) {
        // Switch tabs
        const tabA = document.getElementById("opportunities");
        const tabB = document.getElementById("jobseekers");
        tabA.addEventListener("click", handlers.selectTab);
        tabB.addEventListener("click", handlers.selectTab);

        // Create Opportunity
        const newOpp = document.getElementById("new-opp");
        const newOppBtn = document.getElementById("new-opp-btn");
        const submitOpp = document.getElementById("submit-opp");
        const closeOpp = document.getElementById("close-opp");
        newOpp.addEventListener("click", handlers.toggleOpp);
        newOppBtn.addEventListener("click", handlers.toggleOpp);
        submitOpp.addEventListener("click", handlers.toggleOpp);
        closeOpp.addEventListener("click", handlers.toggleOpp);
      }

      if (url.includes("events")) {
        // Create Event
        const newEvent = document.getElementById("new-event");
        const newEventBtn = document.getElementById("new-event-btn");
        const submitEvent = document.getElementById("submit-event");
        const closeEvent = document.getElementById("close-event");
        newEvent.addEventListener("click", handlers.toggleEvent);
        newEventBtn.addEventListener("click", handlers.toggleEvent);
        submitEvent.addEventListener("click", handlers.toggleEvent);
        closeEvent.addEventListener("click", handlers.toggleEvent);
      }

      if (url.includes("blog")) {
        // Create Resource
        const newResourceBtn = document.getElementById("new-resource-btn");
        const newResource = document.getElementById("new-resource");
        const submitResource = document.getElementById("submit-resource");
        const closeResource = document.getElementById("close-resource");
        newResource.addEventListener("click", handlers.toggleResource);
        newResourceBtn.addEventListener("click", handlers.toggleResource);
        submitResource.addEventListener("click", handlers.toggleResource);
        closeResource.addEventListener("click", handlers.toggleResource);
      }

      if (url.includes("profile")) {
        // Edit Profile
        const editButton = document.getElementById("edit-profile");
        const editButtonBtn = document.getElementById("edit-profile-btn");
        const saveProfile = document.getElementById("save-profile");
        const closeProfile = document.getElementById("close-profile");
        editButton.addEventListener("click", handlers.toggleProfile);
        editButtonBtn.addEventListener("click", handlers.toggleProfile);
        saveProfile.addEventListener("click", handlers.toggleProfile);
        closeProfile.addEventListener("click", handlers.toggleProfile);
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
          error = `Number of characters must be between ${
            input.minLength
          } and ${input.maxLength}`;
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
          document.getElementById(
            `confirm-password-error`
          ).innerHTML = pwcError;
        }
      });
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
});
