"use strict";

var handleEntry = function handleEntry(e) {
  e.preventDefault();

  if ($("#entryDate").val() == '' || $("#entryMood").val() == '' || $("#entryMain").val() == '') {
    UIkit.modal.alert('All fields are required!');
    return false;
  }

  console.dir($("#entryForm").serialize());
  UIkit.modal("#entryFormContainer").hide(); //let images = new FormData($(imgUpload).value);
  //sendAjax('POST', "/uploadFile", images);

  sendAjax('POST', $("#entryForm").attr("action"), $("#entryForm").serialize(), function () {
    loadEntriesFromServer();
  });
  return false;
};

var EntryForm = function EntryForm(props) {
  return /*#__PURE__*/React.createElement("div", {
    className: "uk-modal-dialog uk-modal-body"
  }, /*#__PURE__*/React.createElement("button", {
    className: "uk-modal-close-default",
    type: "button",
    "uk-close": "true"
  }), /*#__PURE__*/React.createElement("form", {
    id: "entryForm",
    onSubmit: handleEntry,
    name: "entryForm",
    action: "/maker",
    method: "POST",
    className: "entryForm data-uk-form-stacked"
  }, /*#__PURE__*/React.createElement("h2", null, "New Entry"), /*#__PURE__*/React.createElement("div", {
    className: "uk-margin"
  }, /*#__PURE__*/React.createElement("label", {
    className: "data-uk-form-label",
    htmlFor: "entryDate",
    value: props.today
  }, "Date: "), /*#__PURE__*/React.createElement("input", {
    id: "entryDate",
    type: "date",
    name: "entryDate"
  })), /*#__PURE__*/React.createElement("div", {
    className: "uk-margin"
  }, /*#__PURE__*/React.createElement("label", {
    className: "data-uk-form-label",
    htmlFor: "entryRating"
  }, "Rate Your Day: "), /*#__PURE__*/React.createElement(StarSVG, {
    id: "svg1",
    value: 1
  }), /*#__PURE__*/React.createElement(StarSVG, {
    id: "svg2",
    value: 2
  }), /*#__PURE__*/React.createElement(StarSVG, {
    id: "svg3",
    value: 3
  }), /*#__PURE__*/React.createElement(StarSVG, {
    id: "svg4",
    value: 4
  }), /*#__PURE__*/React.createElement(StarSVG, {
    id: "svg5",
    value: 5
  })), /*#__PURE__*/React.createElement("div", {
    className: "uk-margin"
  }, /*#__PURE__*/React.createElement("label", {
    className: "data-uk-form-label",
    htmlFor: "entryMood"
  }, "Overall Mood: "), /*#__PURE__*/React.createElement("input", {
    id: "entryMood",
    className: "data-uk-input",
    type: "text",
    name: "entryMood"
  })), /*#__PURE__*/React.createElement("div", {
    className: "uk-margin"
  }, /*#__PURE__*/React.createElement("label", {
    className: "data-uk-form-label",
    htmlFor: "entryMood"
  }, "Write Your Journal Entry Here: "), /*#__PURE__*/React.createElement("textarea", {
    id: "entryMain",
    className: "data-uk-textarea",
    name: "entryMain",
    rows: "4",
    cols: "50"
  })), /*#__PURE__*/React.createElement("div", {
    className: "uk-margin"
  }, /*#__PURE__*/React.createElement("input", {
    className: "makeentrySubmit data-uk-button data-uk-button-default",
    type: "submit",
    value: "Make entry"
  })), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  })));
};

var StarSVG = function StarSVG(props) {
  var clicked = false;

  var mouseOnStar = function mouseOnStar(e, clickedBool) {
    clicked = clickedBool;

    if (e.target.id === "svg1") {
      $("#svg1").css("fill", "yellow");
    } else if (e.target.id === "svg2") {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
    } else if (e.target.id === "svg3") {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
      $("#svg3").css("fill", "yellow");
    } else if (e.target.id === "svg4") {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
      $("#svg3").css("fill", "yellow");
      $("#svg4").css("fill", "yellow");
    } else {
      $("#svg1").css("fill", "yellow");
      $("#svg2").css("fill", "yellow");
      $("#svg3").css("fill", "yellow");
      $("#svg4").css("fill", "yellow");
      $("#svg5").css("fill", "yellow");
    }
  };

  var mouseOffStar = function mouseOffStar() {
    if (!clicked) {
      $("#svg1").css("fill", "black");
      $("#svg2").css("fill", "black");
      $("#svg3").css("fill", "black");
      $("#svg4").css("fill", "black");
      $("#svg5").css("fill", "black");
    }
  };

  var svgStyle = {
    stroke: "black",
    strokeWidth: "1.2",
    padding: "5px"
  };
  var padding = {
    padding: "5px"
  };
  return /*#__PURE__*/React.createElement("svg", {
    id: props.id,
    value: props.value,
    onMouseEnter: mouseOnStar,
    onMouseLeave: mouseOffStar,
    xmlns: "http://www.w3.org/2000/svg",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    style: padding
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z",
    style: svgStyle
  }));
};

var stringToDate = function stringToDate(date) {
  var year = date.slice(0, 4);
  var month = date.slice(5, 7);
  var day = date.slice(8, 10);
  var update = new Date(year, month - 1, day);
  return update;
};

var EntryList = function EntryList(props) {
  if (props.entries.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "entryList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyList"
    }, "No entries yet"));
  }

  var sortByDate = props.entries.reverse();
  var journalNodes = sortByDate.map(function (entry) {
    var thisDateEntry = stringToDate(entry.date); //console.log(getPicsByDate(entry.date));

    thisDateEntry = new Intl.DateTimeFormat('en-US', {
      year: "numeric",
      month: "long",
      day: "2-digit"
    }).format(thisDateEntry);
    var toggleString = "target: #MODAL" + entry._id;
    var idString = "MODAL" + entry._id;
    console.log(entry);
    return /*#__PURE__*/React.createElement("tr", {
      key: entry._id
    }, /*#__PURE__*/React.createElement("td", {
      id: entry._id,
      className: "entry"
    }, /*#__PURE__*/React.createElement("a", {
      "uk-toggle": toggleString
    }, thisDateEntry), /*#__PURE__*/React.createElement("div", {
      id: idString,
      "uk-modal": "true"
    }, /*#__PURE__*/React.createElement("div", {
      className: "uk-modal-dialog uk-modal-body"
    }, /*#__PURE__*/React.createElement("button", {
      className: "uk-modal-close-default",
      type: "button",
      "uk-close": "true"
    }), /*#__PURE__*/React.createElement("h2", {
      className: "uk-modal-title"
    }, thisDateEntry), /*#__PURE__*/React.createElement("h4", null, "Mood: ", entry.mood), /*#__PURE__*/React.createElement("h4", null, "Entry: "), /*#__PURE__*/React.createElement("p", null, entry.entry)))));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "entryList"
  }, /*#__PURE__*/React.createElement("table", {
    className: "uk-table uk-table-hover uk-table-divider"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Entries"))), /*#__PURE__*/React.createElement("tbody", null, journalNodes)));
}; // const getPicsByDate = (date) => {
//     sendAjax('GET', '/retrieveFile', {entryDate: date}, (data) => {
//         return data;
//     });
// };


var loadEntriesFromServer = function loadEntriesFromServer() {
  sendAjax('GET', '/getEntries', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(EntryList, {
      entries: data.entries
    }), document.querySelector("#entries"));
  });
};

var createEntryListWindow = function createEntryListWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(EntryList, {
    entries: []
  }), document.querySelector("#entries"));
  ReactDOM.render( /*#__PURE__*/React.createElement("div", null), document.querySelector("#settings"));
  loadEntriesFromServer();
};

var createSettingsWindow = function createSettingsWindow(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement("div", null), document.querySelector("#entries"));
  ReactDOM.render( /*#__PURE__*/React.createElement(Settings, {
    csrf: csrf
  }), document.querySelector("#settings"));
};

var setup = function setup(csrf) {
  var settingsButton = document.querySelector("#settingsButton");
  var mainPageButton = document.querySelector("#mainPageButton");
  settingsButton.addEventListener("click", function (e) {
    e.preventDefault();
    createSettingsWindow(csrf);
    return false;
  });
  mainPageButton.addEventListener("click", function (e) {
    e.preventDefault();
    createEntryListWindow(csrf);
    return false;
  }); //default view

  createEntryListWindow(csrf);
  ReactDOM.render( /*#__PURE__*/React.createElement(EntryForm, {
    csrf: csrf
  }), document.querySelector("#entryFormContainer"));
};

var Settings = function Settings(props) {
  return /*#__PURE__*/React.createElement("div", {
    id: "settings"
  }, /*#__PURE__*/React.createElement(UpdatePassForm, {
    csrf: props.csrf
  }), /*#__PURE__*/React.createElement("button", null, "Upgrade to get file uploading abilities"));
};

var UpdatePassForm = function UpdatePassForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "updatePassForm",
    name: "updatePassForm",
    onSubmit: handleUpdate,
    action: "/updatePass",
    method: "POST",
    className: "data-uk-form-stacked"
  }, /*#__PURE__*/React.createElement("h2", null, "Update Password"), /*#__PURE__*/React.createElement("div", {
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
    value: "Update"
  }));
};

var handleUpdate = function handleUpdate(e) {
  e.preventDefault();

  if ($("#pass").val() == '' || $("#pass2").val() == '') {
    //responseText("All fields are required");
    UIkit.modal.alert("All fields are required");
    return false;
  }

  if ($("#pass").val() !== $("#pass2").val()) {
    //responseText("Passwords do no match");
    UIkit.modal.alert("Passwords do no match");
    return false;
  }

  sendAjax('POST', $("#updatePassForm").attr("action"), $("#updatePassForm").serialize(), UIkit.modal.alert('Password update successful!'));
  return false;
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
