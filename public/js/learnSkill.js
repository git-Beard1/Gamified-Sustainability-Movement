/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: learnSkill.js

    Last Modified: 03/02/2024
*/

// Show the pet's information
document.addEventListener("DOMContentLoaded", () => {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const pet_id = urlParams.get("pet_id");

  const beastInfo = document.getElementById("beastInfo");

  const callback = (responseStatus, responseData) => {
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
      const image = document.createElement("img");
      image.src = `http://localhost:3000/images/${responseData[0].picture}`;
      image.classList.add("img-fluid", "rounded-3", "w-100");
      image.setAttribute("alt", `Picture of ${responseData[0].pet_name}`);
      imageContainer.appendChild(image);

      // Right side column (info of the pet)
      const infoContainer = document.createElement("div");
      infoContainer.classList.add(
        "col-lg-6",
        "col-md-6",
        "col-sm-12",
        "pt-sm-4"
      );
      infoContainer.setAttribute("id", "infoContainer");
      const petName = document.createElement("h2");
      petName.classList.add("text-center", "text-light");
      petName.textContent = responseData[0].pet_name;

      const descriptionTitle = document.createElement("h5");
      descriptionTitle.classList.add("text-start", "text-light", "pt-4");
      descriptionTitle.textContent = "Description";
      const petDescription = document.createElement("p");
      petDescription.classList.add("text-start", "text-light");
      petDescription.textContent = responseData[0].description;

      const rarityTitle = document.createElement("h5");
      rarityTitle.classList.add("text-start", "text-light", "pt-4");
      rarityTitle.textContent = "Rarity";
      const rarity = document.createElement("span");
      rarity.classList.add("badge");

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

      const skillsTitle = document.createElement("h5");
      skillsTitle.classList.add("text-start", "text-light", "pt-4", "pb-2");
      skillsTitle.textContent = "Skills";
      const skills = document.createElement("ul");
      skills.classList.add("text-start", "text-light");

      responseData.forEach((skill) => {
        const skillItem = document.createElement("li");
        skillItem.classList.add("text-light");
        skillItem.textContent = `${skill.skill_name} - LV ${skill.required_level}`;
        skills.appendChild(skillItem);
      });

      infoContainer.appendChild(petName);
      infoContainer.appendChild(descriptionTitle);
      infoContainer.appendChild(petDescription);
      infoContainer.appendChild(rarityTitle);
      infoContainer.appendChild(rarity);

      beastInfo.appendChild(imageContainer);
      beastInfo.appendChild(infoContainer);
    }

    // If responseStatus is not 200
    else {
      // Create page title for error message
      const pageTitle = document.getElementById("pageTitle");
      pageTitle.classList.add("my-lg-5", "my-md-5", "my-sm-4");

      // Display error status
      const pageTitleStatus = document.createElement("h1");
      pageTitleStatus.classList.add("fs-1", "text-danger", "fw-bolder");

      // Display error message
      const pageTitleResponse = document.createElement("h4");
      pageTitleResponse.classList.add("text-light");

      // If response data has message
      if (responseData.message) {
        pageTitleStatus.innerText = `${responseStatus}`;
        pageTitleResponse.innerText = responseData.message;
      }

      // If response data has no message
      else {
        pageTitleStatus.innerText = `${responseStatus}`;
        pageTitleResponse.innerText = "NOT FOUND";
      }

      // Create icon for error message
      const icon = document.createElement("i");
      icon.classList.add(
        "bi",
        "bi-exclamation-triangle-fill",
        "text-warning",
        "fs-1"
      );

      // Append page title, status, response, and icon to page title
      pageTitle.appendChild(pageTitleStatus);
      pageTitle.appendChild(pageTitleResponse);
      pageTitle.appendChild(icon);
    }

    document.dispatchEvent(new Event("PetInfoLoaded"));
  };

  axiosMethod(currentUrl + `/api/pets/${pet_id}`, callback);
});

// Show the pet's skills
document.addEventListener("PetInfoLoaded", () => {
  url = new URL(document.URL);
  const urlParams = url.searchParams;
  const pet_id = urlParams.get("pet_id");

  // Get user_id from jwt-decode
  const user_id = jwt_decode(localStorage.getItem("token")).user_id;

  const infoContainer = document.getElementById("infoContainer");
  const beastInfo = document.getElementById("beastInfo");
  const callback = (responseStatus, responseData) => {
    // If the responseStatus is 200
    if (responseStatus === 200) {
      // Skill Block
      const skillsTitle = document.createElement("h5");
      skillsTitle.classList.add("text-start", "text-light", "pt-4", "pb-2");
      skillsTitle.textContent = "Learnt Skills";
      const skills = document.createElement("ul");
      skills.classList.add("text-start", "text-light");

      responseData.forEach((skill) => {
        const skillItem = document.createElement("li");
        skillItem.classList.add("text-light");
        skillItem.textContent = `${skill.skill_name}`;
        skills.appendChild(skillItem);
      });

      const buttonGroups = document.createElement("div");
      buttonGroups.classList.add("row", "mt-5");

      const backButtonContainer = document.createElement("div");
      backButtonContainer.classList.add(
        "mb-3",
        "col-lg-6",
        "col-md-6",
        "col-sm-6",
        "text-center"
      );
      const backButton = document.createElement("a");
      backButton.classList.add("btn", "btn-danger");
      backButton.setAttribute("href", "index.html");
      backButton.textContent = "Back";
      backButtonContainer.appendChild(backButton);
      buttonGroups.appendChild(backButtonContainer);

      const learnSkillButtonContainer = document.createElement("div");
      learnSkillButtonContainer.classList.add(
        "mb-3",
        "col-lg-6",
        "col-md-6",
        "col-sm-6",
        "text-center"
      );
      const learnSkillButton = document.createElement("button");
      learnSkillButton.classList.add("btn", "btn-primary");
      learnSkillButton.setAttribute("onclick", "learnSkillButtonModal(this)");
      learnSkillButton.setAttribute("data-bs-petId", pet_id);
      learnSkillButton.textContent = "Learn Skill";
      learnSkillButtonContainer.appendChild(learnSkillButton);
      buttonGroups.appendChild(learnSkillButtonContainer);

      infoContainer.appendChild(skillsTitle);
      infoContainer.appendChild(skills);
      infoContainer.appendChild(buttonGroups);
      beastInfo.appendChild(infoContainer);
    }

    // If the responseStatus is not 200
    if (responseStatus !== 200) {
      // Skill Block
      const skillsTitle = document.createElement("h5");
      skillsTitle.classList.add("text-start", "text-light", "pt-4", "pb-2");
      skillsTitle.textContent = "Learnt Skills";
      const skills = document.createElement("p");
      skills.classList.add("text-start", "text-warning");
      skills.innerText = `${responseData.message}`;

      const buttonGroups = document.createElement("div");
      buttonGroups.classList.add("row", "mt-5");

      const backButtonContainer = document.createElement("div");
      backButtonContainer.classList.add(
        "mb-3",
        "col-lg-6",
        "col-md-6",
        "col-sm-6",
        "text-center"
      );
      const backButton = document.createElement("a");
      backButton.classList.add("btn", "btn-danger");
      backButton.setAttribute("href", "index.html");
      backButton.textContent = "Back";
      backButtonContainer.appendChild(backButton);
      buttonGroups.appendChild(backButtonContainer);

      const learnSkillButtonContainer = document.createElement("div");
      learnSkillButtonContainer.classList.add(
        "mb-3",
        "col-lg-6",
        "col-md-6",
        "col-sm-6",
        "text-center"
      );
      const learnSkillButton = document.createElement("button");
      learnSkillButton.classList.add("btn", "btn-primary");
      learnSkillButton.setAttribute("onclick", "learnSkillButtonModal(this)");
      learnSkillButton.setAttribute("data-bs-petId", pet_id);
      learnSkillButton.textContent = "Learn Skill";
      learnSkillButtonContainer.appendChild(learnSkillButton);
      buttonGroups.appendChild(learnSkillButtonContainer);

      infoContainer.appendChild(skillsTitle);
      infoContainer.appendChild(skills);
      infoContainer.appendChild(buttonGroups);
      beastInfo.appendChild(infoContainer);
    }
  };

  axiosMethod(
    currentUrl + `/api/skills_mastered/${user_id}/${pet_id}`,
    callback
  );
});

// Learn Skill Modal
const learnSkillButtonModal = (button) => {
  const learnSkillModal = new bootstrap.Modal(
    document.getElementById("learnSkillModal")
  );

  pet_id = button.getAttribute("data-bs-petId");

  const modalTitle = document.querySelector(".modal-title");

  modalTitle.innerText = "Learn Skill";

  const skillsList = document.getElementById("skillsList");
  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If responseStatus is 200
    if (responseStatus === 200) {
      // Reset the innerHTML of the petsOwned div element
      skillsList.innerHTML = "";

      // Loop the pets options user has owned
      responseData.forEach((skill) => {
        // Create a div element with the class of form-check col-lg-6 col-md-6 col-sm-12
        const checkBox = document.createElement("div");
        checkBoxClassNames = [
          "form-check",
          "col-lg-6",
          "col-md-6",
          "col-sm-12",
        ];

        // Loop the classList and add each class to the checkBox div element
        checkBox.classList.add(...checkBoxClassNames);

        // Create an input element with the type of checkbox
        const input = document.createElement("input");
        // Set Input type to checkbox
        input.type = "checkbox";
        // Set the name of the input to pet
        input.name = "skill";
        // Set the class of the input to option-checkbox
        inputClassNames = ["option-checkbox", "ps-1"];
        // Loop the classList and add each class to the input element
        input.classList.add(...inputClassNames);
        // Set the data-bs-skillId attribute to the pet.pet_id
        input.setAttribute("data-bs-skillId", skill.skill_id);

        // Create a label element
        const label = document.createElement("label");
        // Set the class of the label to form-check-label
        labelClassNames = ["form-check-label", "ps-1"];
        // Loop the classList and add each class to the label element
        label.classList.add(...labelClassNames);
        // Set the for attribute of the label to flexCheckDefault
        label.htmlFor = "flexCheckDefault";
        // Set the innerText of the label to pet.pet_name
        label.innerText = skill.skill_name;

        const lineSkip = document.createElement("br");

        // Create a span element for error message
        const errorMessage = document.createElement("span");
        errorMessage.classList.add("text-danger", "d-none", "error");
        errorMessage.innerText = "Select one skill";

        // Append the input and label to the checkBox div element
        checkBox.appendChild(input);
        checkBox.appendChild(label);
        checkBox.appendChild(lineSkip);
        checkBox.appendChild(errorMessage);
        skillsList.appendChild(checkBox);
      });

      // Check for only one checkbox to be checked
      const checkBoxes = document.querySelectorAll('input[name="skill"]');
      checkBoxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
          checkBoxes.forEach((c) => {
            if (c !== checkbox) c.checked = false;
          });
        });
      });
    }

    // If responseStatus is not 200
    else {
      skillsList.classList.add("ps-3", "text-danger");
      skillsList.innerText = `${responseData.message}`;
    }
  };

  axiosMethod(currentUrl + `/api/skills/${pet_id}`, callback);

  learnSkillModal.show();
};

// Learn Skill Click Event
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("learnSkill").addEventListener("click", () => {
    // Get user_id from jwt-decode
    const user_id = jwt_decode(localStorage.getItem("token")).user_id;

    // Call checkBoxesCheck to check if there is only one checkbox checked
    const checkBoxesCheck = document.querySelectorAll('input[name="skill"]');
    const errorElements = document.querySelectorAll(".error");

    // Set checkedCount to 0
    let checkedCount = 0;
    checkBoxesCheck.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedCount++;
      }
    });

    // If checkedCount is not 1, remove d-none class from errorElements and show error message
    if (checkedCount !== 1) {
      errorElements.forEach((errorElement) => {
        errorElement.classList.remove("d-none");
      });
    } 
    
    // If not, add d-none class to errorElements and hide error message
    else {
      errorElements.forEach((errorElement) => {
        errorElement.classList.add("d-none");
      });
    }

    let skill_id = null;
    const skillCheckbox = document.querySelector('input[name="skill"]:checked');
    if (skillCheckbox) {
      skill_id = skillCheckbox.getAttribute("data-bs-skillId");
    }

    const data = {
      user_id,
      skill_id,
      pet_id,
    };

    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus === 201) {
        window.location.reload();
      } else {
        window.alert(responseData.message);
      }
    };

    // If checkedCount is 1, call axiosMethod to send POST request to /api/skills_mastered
    if (checkedCount === 1) {
      axiosMethod(currentUrl + "/api/skills_mastered", callback, "POST", data);
    }
  });
});
