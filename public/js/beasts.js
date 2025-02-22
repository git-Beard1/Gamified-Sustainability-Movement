/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: beasts.js

    Last Modified: 03/02/2024
*/

// Load all the pets from the database and display them on the page
document.addEventListener("DOMContentLoaded", () => {
  // Get pets id from the HTML
  const petList = document.getElementById("pets");

  // Callback function to handle the response
  const callback = (responseStatus, responseData) => {
    // Log out the responseStatus and responseData for easier debugging
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus === 200) {
      // Get the pageTitle id from HTML
      const pageTitle = document.getElementById("pageTitle");

      // Create the pageTitleName h1 element
      const pageTitleName = document.createElement("h1");
      pageTitleName.classList.add("text-light");

      // Create the pageTitleText, greenText and opportunitiesText text nodes for page title name
      const pageTitleText = document.createTextNode("Find Your ");
      const greenText = document.createElement("span");
      greenText.textContent = "Mythical";
      greenText.classList.add("text-danger");
      const opportunitiesText = document.createTextNode(" Partner");

      // Append the text nodes to the pageTitleName h1 element
      pageTitleName.appendChild(pageTitleText);
      pageTitleName.appendChild(greenText);
      pageTitleName.appendChild(opportunitiesText);

      // Append the pageTitleName h1 element to the pageTitle div
      pageTitle.appendChild(pageTitleName);

      // Loop through responseData and create a card for each pet
      responseData.forEach((pet) => {
        // Set color scheme for rarity
        switch (pet.rarity) {
          case "Uncommon":
            rarityColor = "bg-success";
            break;
          case "Rare":
            rarityColor = "bg-warning";
            break;
          case "Legendary":
            rarityColor = "bg-danger";
            break;
          default:
            rarityColor = "bg-info";
            break;
        }

        // Create a main container div element with the class of col-lg-4 col-md-6 col-sm-12
        const pets = document.createElement("div");
        pets.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-5");

        // Create the card container div
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card", "mx-auto", "h-100", "card-color");
        cardContainer.style.width = "18rem";

        // Create the position-relative div
        const positionRelativeDiv = document.createElement("div");
        positionRelativeDiv.classList.add("position-relative");

        // Create the position-absolute div
        const positionAbsoluteDiv = document.createElement("div");
        positionAbsoluteDiv.classList.add("position-absolute", "ps-1", "mt-2");

        // Create the rarity span
        const raritySpan = document.createElement("span");
        raritySpan.classList.add(rarityColor, "text-light", "p-2", "rounded-3");
        raritySpan.textContent = pet.rarity;

        // Append the rarity span to the position-absolute div
        positionAbsoluteDiv.appendChild(raritySpan);

        // Create the image element
        const imageElement = document.createElement("img");
        imageElement.src = `http://localhost:3000/images/${pet.picture}`;
        imageElement.classList.add("card-img-top", "image-fluid");
        imageElement.alt = `Picture of ${pet.pet_name}`;

        // Append the position-absolute div and image element to the position-relative div
        positionRelativeDiv.appendChild(positionAbsoluteDiv);
        positionRelativeDiv.appendChild(imageElement);

        // Append the position-relative div to the card container div
        cardContainer.appendChild(positionRelativeDiv);

        // Create the card body div
        const cardBodyDiv = document.createElement("div");
        cardBodyDiv.classList.add("card-body");

        // Create the card title heading
        const cardTitleHeading = document.createElement("h5");
        cardTitleHeading.classList.add(
          "card-title",
          "text-light",
          "text-center"
        );
        cardTitleHeading.textContent = `${pet.pet_name} #${pet.pet_id}`;

        // Create the row div for points and view more link
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row", "mt-4");

        // Create the first column points container div
        const pointsContainer = document.createElement("div");
        pointsContainer.classList.add("col-6", "text-start", "pt-2");

        // Create the paragraph for points
        const points = document.createElement("p");
        points.classList.add("card-text", "text-light", "text-center");
        points.textContent = `${pet.required_eco_points} Points `;

        // Create the coin icon for points required
        const coinIcon = document.createElement("i");
        coinIcon.classList.add("bi", "bi-coin", "text-warning");
        points.appendChild(coinIcon);

        // Append the card text paragraph to the first column div
        pointsContainer.appendChild(points);

        // Create the second column view more button
        const viewMoreBtn = document.createElement("div");
        viewMoreBtn.classList.add("col-6", "text-end");

        // Create the view more link
        const viewMoreLink = document.createElement("a");
        viewMoreLink.href = `singleBeast.html?pet_id=${pet.pet_id}`;
        viewMoreLink.classList.add("btn", "btn-primary");
        viewMoreLink.textContent = "View More";

        // Append the view more link to the second column div
        viewMoreBtn.appendChild(viewMoreLink);

        // Append the first and second column divs to the row div
        rowDiv.appendChild(pointsContainer);
        rowDiv.appendChild(viewMoreBtn);

        // Append the card title heading and row div to the card body div
        cardBodyDiv.appendChild(cardTitleHeading);
        cardBodyDiv.appendChild(rowDiv);

        // Append the card body div to the main container div
        cardContainer.appendChild(cardBodyDiv);

        // Append the main container div to the document body or any other desired parent element
        pets.appendChild(cardContainer);

        // Append the pets div element to the petList div element
        petList.appendChild(pets);
      });
    }

    // If responseStatus is not 200
    else {
      // Get the pageTitle id from HTML
      const pageTitle = document.getElementById("pageTitle");

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

      // Append all the elements to the pageTitle div
      pageTitle.appendChild(pageTitleStatus);
      pageTitle.appendChild(pageTitleResponse);
      pageTitle.appendChild(icon);
    }
  };

  axiosMethod(currentUrl + `/api/pets`, callback);
});
