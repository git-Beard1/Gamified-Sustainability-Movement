/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: ecoTasks.js

    Last Modified: 03/02/2024
*/

// Load all the tasks from the database and display them on the page
document.addEventListener("DOMContentLoaded", () => {
  // Get TaskList HTML element to append all tasks
  const taskList = document.getElementById("tasks");

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
      const pageTitleText = document.createTextNode("Unlock ");
      const greenText = document.createElement("span");
      greenText.textContent = "Green";
      greenText.classList.add("green_theme");
      const opportunitiesText = document.createTextNode(" Opportunities");

      // Append the text nodes to the pageTitleName h1 element
      pageTitleName.appendChild(pageTitleText);
      pageTitleName.appendChild(greenText);
      pageTitleName.appendChild(opportunitiesText);

      // Append the pageTitleName h1 element to the pageTitle div
      pageTitle.appendChild(pageTitleName);

      // Loop through responseData and create a card for each task
      responseData.forEach((task) => {
        // Create a main container div element with the class of col-lg-4 col-md-6 col-sm-12
        const tasks = document.createElement("div");
        tasks.classList.add("col-lg-4", "col-md-6", "col-sm-12", "mb-5");

        // Create the card container div
        const cardContainer = document.createElement("div");
        cardContainer.classList.add("card", "mx-auto", "h-100", "card-color");
        cardContainer.style.width = "18rem";

        // Create the card image
        const taskImage = document.createElement("img");
        taskImage.src = `http://localhost:3000/images/${task.picture}`;
        taskImage.classList.add("card-img-top");
        taskImage.alt = `Picture of ${task.title}`;

        // Append the card image to the card container div
        cardContainer.appendChild(taskImage);

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
        cardTitleHeading.textContent = `${task.title}`;

        // Create the card text paragraph for description
        const description = document.createElement("p");
        description.classList.add("card-text", "text-light", "text-center");
        description.textContent = `${task.description}`;

        // Create the row div for points and view more link
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("row", "mt-4");

        // Create the first column points container div
        const pointsContainer = document.createElement("div");
        pointsContainer.classList.add("col-6", "text-start", "pt-2");

        // Create the paragraph for points
        const points = document.createElement("p");
        points.classList.add("card-text", "text-light", "text-center");
        points.textContent = `${task.points} Points `;

        // Create the coin icon for points required
        const coinIcon = document.createElement("i");
        coinIcon.classList.add("bi", "bi-coin", "text-warning");
        points.appendChild(coinIcon);

        // Append the card text paragraph to the first column div
        pointsContainer.appendChild(points);

        // Create the container div for the complete button
        const completeBtnDiv = document.createElement("div");
        completeBtnDiv.classList.add("col-6", "text-end");

        // Create the complete button
        const completeBtn = document.createElement("button");
        completeBtn.classList.add("btn", "btn-primary");
        completeBtn.textContent = "Complete";
        completeBtn.setAttribute("data-bs-taskName", task.title);
        completeBtn.setAttribute("data-bs-taskId", task.task_id);
        completeBtn.setAttribute("onclick", "buttonModal(this)");

        // Append the view more link to the second column div
        completeBtnDiv.appendChild(completeBtn);

        // Append the first and second column divs to the row div
        rowDiv.appendChild(pointsContainer);
        rowDiv.appendChild(completeBtnDiv);

        // Append the card title heading and row div to the card body div
        cardBodyDiv.appendChild(cardTitleHeading);
        cardBodyDiv.appendChild(description);
        cardBodyDiv.appendChild(rowDiv);

        // Append the card body div to the main container div
        cardContainer.appendChild(cardBodyDiv);

        // Append the main container div to the document body or any other desired parent element
        tasks.appendChild(cardContainer);

        // Append the tasks div element to the taskList div element
        taskList.appendChild(tasks);
      });
    }

    // If responseStatus is not 200
    else {
      // Create the pageTitleStatus h1 element
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

  axiosMethod(currentUrl + `/api/tasks`, callback);
});

// Button to trigger once complete button is clicked (modal)
const buttonModal = (button) => {
  // Get user_id from jwt-decode
  const user_id = jwt_decode(localStorage.getItem("token")).user_id;

  // Get the taskName and taskId from the button
  const taskTitle = button.getAttribute("data-bs-taskName");
  taskId = button.getAttribute("data-bs-taskId");

  // Get the completeTaskModal
  const taskModal = new bootstrap.Modal(
    document.getElementById("completeTaskModal")
  );

  // Get the modal title
  const modalTitle = document.querySelector(".modal-title");

  // Set the innerText of the modal title to taskTitle
  modalTitle.innerText = taskTitle;

  // Get the petsOwned div element
  const petsOwned = document.getElementById("petsOwned");

  const callback = (responseStatus, responseData) => {
    // Log out the responseStatus and responseData for easier debugging
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus === 200) {
      // Reset the innerHTML of the petsOwned div element
      petsOwned.innerHTML = "";

      // Loop the pets options user has owned
      responseData.forEach((pet) => {
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
        input.name = "pet";
        // Set the class of the input to option-checkbox
        inputClassNames = ["option-checkbox", "ps-1"];
        // Loop the classList and add each class to the input element
        input.classList.add(...inputClassNames);
        // Set the data-bs-petId attribute to the pet.pet_id
        input.setAttribute("data-bs-petId", pet.pet_id);

        // Create a label element
        const label = document.createElement("label");
        // Set the class of the label to form-check-label
        labelClassNames = ["form-check-label", "ps-1"];
        // Loop the classList and add each class to the label element
        label.classList.add(...labelClassNames);
        // Set the for attribute of the label to flexCheckDefault
        label.htmlFor = "flexCheckDefault";
        // Set the innerText of the label to pet.pet_name
        label.innerText = pet.pet_name;

        // Append the input and label to the checkBox div element
        checkBox.appendChild(input);
        checkBox.appendChild(label);
        petsOwned.appendChild(checkBox);
      });

      // Make sure user check only one pet
      const checkBoxes = document.querySelectorAll('input[name="pet"]');
      checkBoxes.forEach((checkBox) => {
        checkBox.addEventListener("change", () => {
          checkBoxes.forEach((cb) => {
            if (cb !== checkBox) {
              cb.checked = false;
            }
          });
        });
      });
    }

    // If responseStatus is not 200
    else {
      // Display message in red text of modal
      petsOwned.classList.add("ps-3", "text-danger");
      petsOwned.innerText = `${responseData.message}`;
    }
  };

  // Fetch pets owned by user
  axiosMethod(currentUrl + `/api/pet_bonds/${user_id}`, callback);

  // Show the modal
  taskModal.show();
};

// Complete Task button event to trigger once the completeTask button is clicked (Send to database)
document.addEventListener("DOMContentLoaded", () => {
  // Get the completeTask button and trigger click event
  document.getElementById("completeTask").addEventListener("click", () => {
    // Get the notes from the textarea
    const notes = document.getElementById("notes").value;

    // Get user_id from jwt-decode
    const user_id = jwt_decode(localStorage.getItem("token")).user_id;

    // Get pet_id from the checked pet
    let pet_id = null;
    const petCheckbox = document.querySelector('input[name="pet"]:checked');
    if (petCheckbox) {
      pet_id = petCheckbox.getAttribute("data-bs-petId");
    }

    // Data to be sent to the server
    const data = {
      user_id,
      pet_id,
      task_id: taskId,
      completion_date: new Date().toISOString().slice(0, 10),
      notes: notes,
    };

    // Callback function to handle the response
    const callback = (responseStatus, responseData) => {
      // Log out the responseStatus and responseData for easier debugging
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      // If responseStatus is 201 or 200, reload the page
      if (responseStatus === 201 || responseStatus === 200) {
        window.location.reload();
      } 
      
      // If responseStatus is not 201 or 200, alert the user with the message
      else {
        window.alert(responseData.message);
      }
    };

    // Fetch the task_progress api with the data and callback function
    axiosMethod(currentUrl + "/api/task_progress", callback, "POST", data);
  });
});
