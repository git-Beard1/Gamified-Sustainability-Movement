/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: logInUser.js

    Last Modified: 03/02/2024
*/


document.addEventListener("DOMContentLoaded", () => {
  // Get All HTML Elements
  const loginForm = document.getElementById("loginForm");
  const warningModalTitle = document.getElementById("warningModalTitle");
  const warningText = document.getElementById("warningText");

  // Display Pop Up Message for successful/failed login
  popUpDisplay = (title, message, addColor, removeColor) => {
    warningModalTitle.innerText = title;
    warningModalTitle.classList.remove(removeColor);
    warningModalTitle.classList.add(addColor);
    warningText.innerText = message;
  };

  localStorage.clear();

  // Callback function for axiosMethod
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If responseStatus is 200
    if (responseStatus == 200) {
      // Display Message
      popUpDisplay(
        "Success",
        "Sign In Successful",
        "text-success",
        "text-danger"
      );

      // Check if login was successful
      if (responseData.token) {
        // Store the token in local storage
        localStorage.setItem("token", responseData.token);
        // Redirect or perform further actions for logged-in user
        window.location.href = "profile.html";
      }
    }

    // If responseStatus is not 200
    else {
      // Display Message
      popUpDisplay(
        "Error",
        responseData.message,
        "text-danger",
        "text-success"
      );
      loginForm.reset();
      return;
    }
  };

  // Add Event Listener to loginForm
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const data = {
      username: username,
      password: password,
    };

    // If username or password is empty
    if (!data.username || !data.password) {
      popUpDisplay(
        "Error",
        "Please fill in all fields",
        "text-danger",
        "text-success"
      );
      loginForm.reset();
      return;
    }

    // If checkbox is not checked
    if (!checkBox.checked) {
      // Display Pop Up Message
      popUpDisplay(
        "Error",
        "Please agree to the terms and conditions",
        "text-danger",
        "text-success"
      );
      loginForm.reset();
      return;
    }

    // Perform login request
    axiosMethod(currentUrl + "/api/login", callback, "POST", data);
  });
});
