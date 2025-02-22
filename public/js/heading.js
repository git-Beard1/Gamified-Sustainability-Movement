/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: heading.js

    Last Modified: 03/02/2024
*/

// Navbar Brand Animation
const navbarBrand = document.getElementById("navBrand"); // link with navBrand id
const pageNameArray = ["E", "c", "o", "v", "e", "n", "t", "u", "r", "e"]; // an array of letters to be displayed in the navbar

let index = 0; // Initialize the current index to 0

function addAnimation() {
  const name = document.createElement("span"); // Create a span element
  name.classList.add("fs-2", "fw-bolder"); // add class fs-2 and fw-bolder for font size and bold font weight.

  // Determine the color class based on the current index
  if (index == 0 || index == 1 || index == 2) {
    name.classList.add("green_theme"); // add class green_theme for green color.
  } else {
    name.classList.add("text-light"); // add class text-light for white color.
  }

  name.textContent = pageNameArray[index]; // display the letter at the current index

  navbarBrand.appendChild(name); // Append the span element to the navbarBrand

  index++; // Increment the current index for the next letter

  if (index == pageNameArray.length) {
    clearInterval(animationInterval); // Stop the animation when all letters are added
  }
}

const animationInterval = setInterval(addAnimation, 100); // Call the addAnimation function every 100 milliseconds, loop
