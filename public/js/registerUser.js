/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: registerUser.js

    Last Modified: 03/02/2024
*/

document.addEventListener("DOMContentLoaded", function () {

  // Get all required HTML elements
  const signupForm = document.getElementById("signupForm");
  const warningModalTitle = document.getElementById("warningModalTitle");
  const warningText = document.getElementById("warningText");

  // Display Pop Up Message for successful/failed Register
  popUpDisplay = (title, message, addColor, removeColor) => {
    warningModalTitle.innerText = title;
    warningModalTitle.classList.remove(removeColor);
    warningModalTitle.classList.add(addColor);
    warningText.innerText = message;
  };

  // Clear local storage
  localStorage.clear();

  // Callback function for axiosMethod
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If responseStatus is 200
    if (responseStatus === 200) {
      // Display Pop Up Message
      popUpDisplay(
        "Success",
        "Sign Up Successful",
        "text-success",
        "text-danger"
      );

      // Check if signup was successful
      if (responseData.token) {
        // Store the token in local storage
        localStorage.setItem("token", responseData.token);
        // Redirect or perform further actions for logged-in user
        window.location.href = "profile.html";
      }
    }

    // If responseStatus is not 200
    else {
      // Display Pop Up Message
      popUpDisplay(
        "Error",
        responseData.message,
        "text-danger",
        "text-success"
      );
      // Reset the form fields
      signupForm.reset();
      return;
    }
  };

  // Add Event Listener to signupForm
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("emailAddress").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    const data = {
      username,
      email,
      password,
      confirmPassword,
    };

    if (
      !data.username ||
      !data.email ||
      !data.password ||
      !data.confirmPassword
    ) {
      popUpDisplay(
        "Error",
        "Please fill in all the fields",
        "text-danger",
        "text-success"
      );
      // Reset the form fields
      signupForm.reset();
      return;
    }

    if (password !== confirmPassword) {
      // Display Pop Up Message
      popUpDisplay(
        "Error",
        "Passwords do not match",
        "text-danger",
        "text-success"
      );
      // Reset the form fields
      signupForm.reset();
      return;
    }

    console.log(checkBox.checked);

    // If checkbox is not checked
    if (!checkBox.checked) {
      // Display Pop Up Message
      popUpDisplay(
        "Error",
        "Please agree to the terms and conditions",
        "text-danger",
        "text-success"
      );
      // Reset the form fields
      signupForm.reset();
      return;
    }

    // Perform signup request
    axiosMethod(currentUrl + "/api/register", callback, "POST", data);
  });
});
