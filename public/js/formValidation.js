/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: formValidation.js

    Last Modified: 03/02/2024
*/

/* Form validation */

(() => {
  "use strict";

  // Fetch all the elements with class name "needs-validation"
  var forms = document.querySelectorAll(".needs-validation");

  Array.prototype.slice
    .call(forms) // Convert the NodeList of elements with class name "needs-validation" to an array
    .forEach(function (form) {
      // Loop over them and prevent submission
      form.addEventListener(
        "submit",
        (event) => {
          // Add a submit event listener to each form.
          // runs the function when the form is submitted because of "submit" event
          if (!form.checkValidity()) {
            // If the form is invalid, prevent submission
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated"); // Add the class "was-validated" to the form
        },
        false
      );
    });
})(); // recalling the function
