/*
Assignement:

HTML: Complete the HTML to have semantic and compliant markups.

JAVASCRIPT: Dynamically add a user to the users list.
- Highlight the email input when a user enters an invalid email address and display following message: "please enter a valid email address" in red.
- Use the add_user function to submit the user's data.


*/


// START YOUR CODE HERE
var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i,
  errorElem = document.getElementById("errors");
document.getElementById("email").addEventListener("change", function(evt) {
  if (!pattern.test(evt.target.value)) {
    errorElem.innerHTML = "please enter a valid email address";
    document.getElementById("email").style.border = '#FF0000 1px solid';
  } else {
  document.getElementById("email").style.border = '';
    errorElem.innerHTML = "";
  }
});

function submitForm() {
  var name = document.getElementById("name").value,
    email = document.getElementById("email").value;

  if (name === "" || email === "") {
    errorElem.innerHTML = "please enter all fields";
    return;
  } else if (!pattern.test(email)) {
    errorElem.innerHTML = "please enter a valid email address";
    document.getElementById("email").style.border = '#FF0000 1px solid';
    return;
  } else {
  	document.getElementById("email").style.border = '';
    addUser(name, email, addUserCallback);
  }
}

function addUserCallback(res) {
  var userElem = document.getElementById("users");
  if (res.success === true) {
    listElem = document.createElement("LI"),
      node = document.createTextNode("Name: " + res.user.username + " Email: " + res.user.email);
    listElem.appendChild(node);
    userElem.appendChild(listElem);
  } else {
    errorElem.innerHTML = res.error;
    return;
  }

}
// END YOUR CODE HERE

// Do not modify this function. Add user service wrapper.
function addUser(username, email, callback) {
  var response,
    success = (!!Math.round(Math.random()));

  if (!success) {
    response = JSON.stringify({
      success: success,
      error: "Oups, something went wrong!"
    });
  } else {
    response = JSON.stringify({
      success: success,
      user: {
        username: username,
        email: email
      }
    });
  }

  $.ajax({
    url: '/echo/json/',
    type: "post",
    data: {
      json: response
    },
    success: callback
  });
}
