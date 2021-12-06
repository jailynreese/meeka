"use strict";

var handleLogin = function handleLogin(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '') {
    //responseText("Username or password is empty");
    UIkit.modal.alert('Username or password is empty');
    return false;
  }

  console.log($("input[name=_csrf]").val());
  sendAjax('POST', $("#loginForm").attr("action"), $("#loginForm").serialize(), redirect);
  return false;
};

var handleSignup = function handleSignup(e) {
  e.preventDefault();

  if ($("#user").val() == '' || $("#pass").val() == '' || $("#pass2").val() == '') {
    //responseText("All fields are required");
    UIkit.modal.alert("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    //responseText("Passwords do no match");
    UIkit.modal.alert("Passwords do no match");
    return false;
  }

  sendAjax('POST', $("#signupForm").attr("action"), $("#signupForm").serialize(), redirect);
  return false;
};

var LoginWindow = function LoginWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "loginForm",
    name: "loginForm",
    onSubmit: handleLogin,
    action: "/login",
    method: "POST",
    className: "mainForm data-uk-form-stacked"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inputContainers"
  }, /*#__PURE__*/React.createElement("span", {
    className: "data-uk-form-icon",
    "data-uk-icon": "icon: user"
  }), /*#__PURE__*/React.createElement("input", {
    id: "user",
    className: "data-uk-input",
    type: "text",
    name: "username",
    placeholder: "username"
  })), /*#__PURE__*/React.createElement("div", {
    className: "inputContainers"
  }, /*#__PURE__*/React.createElement("span", {
    className: "data-uk-form-icon",
    "data-uk-icon": "icon: lock"
  }), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    className: "data-uk-input",
    type: "password",
    name: "pass",
    placeholder: "password"
  })), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("button", {
    className: "data-uk-button data-uk-button-default"
  }, "Sign in"));
};

var SignupWindow = function SignupWindow(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "signupForm",
    name: "signupForm",
    onSubmit: handleSignup,
    action: "/signup",
    method: "POST",
    className: "mainForm data-uk-form-stacked"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inputContainers"
  }, /*#__PURE__*/React.createElement("span", {
    className: "data-uk-form-icon",
    "data-uk-icon": "icon: user"
  }), /*#__PURE__*/React.createElement("input", {
    id: "user",
    className: "data-uk-input",
    type: "text",
    name: "username",
    placeholder: "username"
  })), /*#__PURE__*/React.createElement("div", {
    className: "inputContainers"
  }, /*#__PURE__*/React.createElement("span", {
    className: "data-uk-form-icon",
    "data-uk-icon": "icon: lock"
  }), /*#__PURE__*/React.createElement("input", {
    id: "pass",
    className: "data-uk-input",
    type: "password",
    name: "pass",
    placeholder: "password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "inputContainers"
  }, /*#__PURE__*/React.createElement("span", {
    className: "data-uk-form-icon",
    "data-uk-icon": "icon: lock"
  }), /*#__PURE__*/React.createElement("input", {
    id: "pass2",
    className: "data-uk-input",
    type: "password",
    name: "pass2",
    placeholder: "retype password"
  })), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "formSubmit data-uk-button data-uk-button-default",
    type: "submit",
    value: "Sign Up"
  }));
};

var createLoginWindow = function createLoginWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LoginWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var createSignupWindow = function createSignupWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(SignupWindow, {
    csrf: csrf
  }), document.querySelector("#content"));
};

var setup = function setup(csrf) {
  var loginButton = document.querySelector("#loginButton");
  var signupButton = document.querySelector("#signupButton");
  signupButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSignupWindow(csrf);
    return false;
  });
  loginButton.addEventListener("click", function (e) {
    e.preventDefault();
    createLoginWindow(csrf);
    return false;
  });
  createLoginWindow(csrf); //default view
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var responseText = function responseText(message) {
  $("#feedback").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      responseText(messageObj.error);
    }
  });
};
