/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: beastInfo.js

    Last Modified: 03/02/2024
*/

// Load the page to display the pet information
document.addEventListener("DOMContentLoaded", () => {
  // Get the current page URL
  url = new URL(document.URL);
  const urlParams = url.searchParams;

  // Get the pet_id from the URL
  const pet_id = urlParams.get("pet_id");

  // Get the beastInfo div
  const beastInfo = document.getElementById("beastInfo");

  const callback = (responseStatus, responseData) => {
    // Log out the responseStatus and responseData for easier debugging
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If responseStatus is 200
    if (responseStatus == 200) {
      // Adjust padding for top of page
      const titlePadding = document.getElementById("titlePadding");
      titlePadding.classList.add("my-md-4", "my-lg-4", "mt-sm-4");

      // Left side column (image of the pet)
      const imageContainer = document.createElement("div");
      imageContainer.classList.add(
        "col-lg-6",
        "col-md-6",
        "col-sm-12",
        "d-flex",
        "justify-content-center",
        "align-items-center"
      );

      // Create the image element and append to the imageContainer
      const petImage = document.createElement("img");
      petImage.src = `http://localhost:3000/images/${responseData[0].picture}`;
      petImage.classList.add("img-fluid", "rounded-3", "w-100");
      petImage.setAttribute("alt", `Picture of ${responseData[0].pet_name}`);
      imageContainer.appendChild(petImage);

      // Right side column (info of the pet)
      const infoContainer = document.createElement("div");
      infoContainer.classList.add(
        "col-lg-6",
        "col-md-6",
        "col-sm-12",
        "pt-sm-4"
      );

      // Pet name
      const petName = document.createElement("h2");
      petName.classList.add("text-center", "text-light");
      petName.textContent = responseData[0].pet_name;

      // Append petName to the infoContainer
      infoContainer.appendChild(petName);

      // Description
      const descriptionTitle = document.createElement("h5");
      descriptionTitle.classList.add("text-start", "text-light", "pt-4");
      descriptionTitle.textContent = "Description";
      const petDescription = document.createElement("p");
      petDescription.classList.add("text-start", "text-light");
      petDescription.textContent = responseData[0].description;
      infoContainer.appendChild(descriptionTitle);
      infoContainer.appendChild(petDescription);

      // Points required
      const pointsTitle = document.createElement("h5");
      pointsTitle.classList.add("text-start", "text-light", "pt-4");
      pointsTitle.textContent = "Points Required";
      const ecoPoints = document.createElement("p");
      ecoPoints.classList.add("text-start", "text-light");
      ecoPoints.textContent = `${responseData[0].required_eco_points} Points`;

      // Append pointsTitle and ecoPoints to the infoContainer
      infoContainer.appendChild(pointsTitle);
      infoContainer.appendChild(ecoPoints);

      // Rarity
      const rarityTitle = document.createElement("h5");
      rarityTitle.classList.add("text-start", "text-light", "pt-4");
      rarityTitle.textContent = "Rarity";
      const rarity = document.createElement("span");
      rarity.classList.add("badge");

      // Color theme for rarity of pet
      switch (responseData[0].rarity) {
        case "Uncommon":
          rarity.classList.add("bg-success");
          break;
        case "Rare":
          rarity.classList.add("bg-warning");
          break;
        case "Legendary":
          rarity.classList.add("bg-danger");
          break;
        default:
          rarity.classList.add("bg-info");
          break;
      }
      rarity.textContent = responseData[0].rarity;

      // Append rarityTitle and rarity to the infoContainer
      infoContainer.appendChild(rarityTitle);
      infoContainer.appendChild(rarity);

      // Skills
      const skillsTitle = document.createElement("h5");
      skillsTitle.classList.add("text-start", "text-light", "pt-4", "pb-2");
      skillsTitle.textContent = "Skills";
      const skills = document.createElement("ul");
      skills.classList.add("text-start", "text-light");

      // Loop through the skills and append to the skills list
      responseData.forEach((skill) => {
        const skillItem = document.createElement("li");
        skillItem.classList.add("text-light");
        skillItem.textContent = `${skill.skill_name} - LV ${skill.required_level}`;
        skills.appendChild(skillItem);
      });

      // Append skillsTitle and skills to the infoContainer
      infoContainer.appendChild(skillsTitle);
      infoContainer.appendChild(skills);

      // Button groups for going back to all beasts page and buying the pet
      const buttonGroups = document.createElement("div");
      buttonGroups.classList.add("row", "mt-4");

      // Back button to all beasts page
      // Back Button container
      const backButtonContainer = document.createElement("div");
      backButtonContainer.classList.add(
        "mb-3",
        "col-lg-6",
        "col-md-6",
        "col-sm-6",
        "text-center"
      );

      // Back Button
      const backButton = document.createElement("a");
      backButton.classList.add("btn", "btn-danger");
      backButton.setAttribute("href", "beasts.html");
      backButton.textContent = "Back";

      // Append back button to the back button container
      backButtonContainer.appendChild(backButton);
      buttonGroups.appendChild(backButtonContainer);

      // Buy button container
      const buyButtonContainer = document.createElement("div");
      buyButtonContainer.classList.add(
        "mb-3",
        "col-lg-6",
        "col-md-6",
        "col-sm-6",
        "text-center"
      );

      // Buy button
      const buyButton = document.createElement("button");
      buyButton.classList.add("btn", "btn-primary");
      buyButton.setAttribute("onclick", "buyButton(this)");
      buyButton.setAttribute("data-bs-petId", responseData[0].pet_id);
      buyButton.textContent = "Exchange";

      // Append buy button to the buy button container
      buyButtonContainer.appendChild(buyButton);
      buttonGroups.appendChild(buyButtonContainer);

      // Append all the elements to the beastInfo div
      beastInfo.appendChild(imageContainer);
      beastInfo.appendChild(infoContainer);
      infoContainer.appendChild(buttonGroups);
    }

    // If responseStatus is not 200
    else {
      // Adjust padding for top of page for error
      const titlePadding = document.getElementById("titlePadding");
      titlePadding.classList.add("mt-md-5", "mt-lg-5", "mt-sm-5");

      // Display Error Status
      const pageTitleStatus = document.createElement("h1");
      pageTitleStatus.classList.add("fs-1", "text-danger", "fw-bolder");

      // Display Error Response
      const pageTitleResponse = document.createElement("h4");
      pageTitleResponse.classList.add("text-light");

      // Set to not found if no response message
      if (responseData.message) {
        pageTitleStatus.innerText = `${responseStatus}`;
        pageTitleResponse.innerText = responseData.message;
      } else {
        pageTitleStatus.innerText = `${responseStatus}`;
        pageTitleResponse.innerText = "NOT FOUND";
      }

      // Create the exclamation triangle icon for error
      const icon = document.createElement("i");
      icon.classList.add(
        "bi",
        "bi-exclamation-triangle-fill",
        "text-warning",
        "fs-1"
      );

      // Append all the elements to the beastInfo div
      pageTitle.appendChild(pageTitleStatus);
      pageTitle.appendChild(pageTitleResponse);
      pageTitle.appendChild(icon);
    }
  };

  axiosMethod(currentUrl + `/api/pets/${pet_id}`, callback);
});

// Buy button function to trigger when the exchange button is clicked
const buyButton = (button) => {
  // Retrieve the pet_id from the button
  const pet_id = button.getAttribute("data-bs-petId");

  // Get the exchangePetModal
  const petModal = new bootstrap.Modal(
    document.getElementById("exchangePetModal")
  );

  // Get the modal title and body
  const modalTitle = document.querySelector(".modal-title");
  const modalBody = document.querySelector(".modal-body");

  // Get user_id from jwt-decode
  const user_id = jwt_decode(localStorage.getItem("token")).user_id;

  // Data to be sent to the server
  const data = {
    user_id,
    pet_id,
  };

  // Callback function to handle the response
  const callback = (responseStatus, responseData) => {
    // Log out the responseStatus and responseData for easier debugging
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If responseStatus is 201, pop up success modal
    if (responseStatus === 201) {
      modalTitle.classList.remove("text-danger");
      modalTitle.classList.add("text-success");
      modalTitle.innerText = `Success`;
      modalBody.innerHTML = `
              <p>${responseData.message}</p>
              `;
    }

    // If responseStatus is not 201, pop up error modal
    else {
      modalTitle.classList.remove("text-success");
      modalTitle.classList.add("text-danger");
      modalTitle.innerText = `Error`;
      modalBody.innerHTML = `
              <p>${responseData.message}</p>
              `;
    }
  };

  // Fetch data from the server
  axiosMethod(currentUrl + `/api/pet_bonds`, callback, "POST", data);

  // Show the modal
  petModal.show();
};
