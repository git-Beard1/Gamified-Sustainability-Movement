/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: profile.js

    Last Modified: 03/02/2024
*/

// Load User Profile when DOM is loaded and user info is retrieved
document.addEventListener("UserInfoRetrieved", () => {
  // Get user profile container by id
  const userProfileContainer = document.getElementById("userProfile");
  // Get user_id from jwt-decode
  const user_id = jwt_decode(localStorage.getItem("token")).user_id;

  // Callback function for axiosMethod
  const callback = (responseStatus, responseData) => {
    // Log response status and response data for easier debugging
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If responseStatus is 200
    if (responseStatus === 200) {
      // Row to encapsulate user profile picture and user profile details
      const userProfileRow = document.createElement("div");
      userProfileRow.classList.add("row");

      // User Profile Picture Container
      const userProfilePicContainer = document.createElement("div");
      userProfilePicContainer.classList.add(
        "col-lg-5",
        "col-md-5",
        "col-sm-12",
        "my-4",
        "text-center",
        "text-md-end",
        "text-lg-end"
      );

      // Set user profile picture
      const userProfilePic = document.createElement("img");
      userProfilePic.classList.add("rounded-circle", "w-50", "img-fluid");

      // If user does not have profile picture, use default profile picture
      if (responseData.profile_pic === null) {
        userProfilePic.src = "http://localhost:3000/images/profile.PNG";
        userProfilePic.alt = `User ${responseData.user_id} Profile Picture`;
      } 
      
      // Set profile to user's profile picture
      else {
        userProfilePic.src = `http://localhost:3000/images/${responseData.profile_pic}`;
        userProfilePic.alt = `User ${responseData.user_id} Profile Picture`;
      }

      // Append user profile picture to user profile picture container
      userProfilePicContainer.appendChild(userProfilePic);

      // A container for user details such as username, email, count of tasks, total points and total pets owned
      const userDetailsContainer = document.createElement("div");
      userDetailsContainer.classList.add(
        "col-lg-5",
        "col-md-5",
        "col-sm-12",
        "mx-auto",
        "my-auto"
      );

      // Set username to user's username
      const username = document.createElement("h5");
      username.classList.add("text-light", "text-center");
      username.innerText = responseData.username;

      // Set email to user's email
      const userEmail = document.createElement("p");
      userEmail.classList.add("text-info", "text-center");
      userEmail.innerText = responseData.email;

      // Append username and email to the user details container
      userDetailsContainer.appendChild(username);
      userDetailsContainer.appendChild(userEmail);

      // A container for user's task count, total points and total pets owned
      const userStatsContainer = document.createElement("div");
      userStatsContainer.classList.add(
        "row",
        "gx-5",
        "p-lg-3",
        "p-md-0",
        "p-sm-3"
      );

      // Set user's task count
      const totalTasks = document.createElement("div");
      totalTasks.classList.add(
        "col-lg-4",
        "col-md-4",
        "col-sm-4",
        "text-center"
      );
      totalTasks.innerHTML = `
        <p class="text-light text-center fs-5 mb-0">${responseData.task_count}</p>
        <p class="text-light text-center">
          Task(s)
          <i class="bi bi-clipboard-check green_theme"></i>
        </p>
      `;

      // Set user's total points
      const totalPoints = document.createElement("div");
      totalPoints.classList.add(
        "col-lg-4",
        "col-md-4",
        "col-sm-4",
        "text-center"
      );
      totalPoints.innerHTML = `
        <p class="text-light text-center fs-5 mb-0">${responseData.total_points}</p>
        <p class="text-light text-center">
          Point(s)
          <i class="bi bi-coin text-warning"></i>
        </p>
      `;

      // Set user's total pets owned
      const totalPets = document.createElement("div");
      totalPets.classList.add(
        "col-lg-4",
        "col-md-4",
        "col-sm-4",
        "text-center"
      );
      totalPets.innerHTML = `
        <p class="text-light text-center fs-5 mb-0">${responseData.total_pets_owned}</p>
        <p class="text-light text-center">
          Beast(s)
          <i class="fa-solid fa-shield-dog text-info"></i>
        </p>
      `;

      // Append user's task count, total points and total pets owned to the user stats container
      userStatsContainer.appendChild(totalTasks);
      userStatsContainer.appendChild(totalPoints);
      userStatsContainer.appendChild(totalPets);
      userDetailsContainer.appendChild(userStatsContainer);

      // Append user details and user stats container to user profile row
      userProfileRow.appendChild(userProfilePicContainer);
      userProfileRow.appendChild(userDetailsContainer);

      // Append user profile row to user profile container
      userProfileContainer.appendChild(userProfileRow);

      // Create the container div to start navTab
      const navTabContainer = document.createElement("div");
      navTabContainer.classList.add("container", "text-center", "mt-3");
      navTabContainer.id = "navTab";

      // Create the row div
      const rowDiv = document.createElement("div");
      rowDiv.classList.add("row");

      // Create the navigation element
      const navElement = document.createElement("nav");
      navElement.classList.add("p-3");

      // Create the navigation tab menu div
      const navTabDiv = document.createElement("div");
      navTabDiv.classList.add("nav", "nav-tabs", "profile-nav");
      navTabDiv.id = "nav-tab";
      navTabDiv.role = "tablist";

      // Create the Completed Tasks button
      const completedTasksButton = document.createElement("button");
      completedTasksButton.classList.add("nav-link", "active");
      completedTasksButton.id = "nav-tasks-tab";
      completedTasksButton.setAttribute("data-bs-toggle", "tab");
      completedTasksButton.setAttribute("data-bs-target", "#nav-tasks");
      completedTasksButton.type = "button";
      completedTasksButton.role = "tab";
      completedTasksButton.setAttribute("aria-controls", "nav-tasks");
      completedTasksButton.setAttribute("aria-selected", "true");
      completedTasksButton.textContent = "Completed Tasks";

      // Create the Pets Owned button
      const petsOwnedButton = document.createElement("button");
      petsOwnedButton.classList.add("nav-link");
      petsOwnedButton.id = "nav-pets-tab";
      petsOwnedButton.setAttribute("data-bs-toggle", "tab");
      petsOwnedButton.setAttribute("data-bs-target", "#nav-pets");
      petsOwnedButton.type = "button";
      petsOwnedButton.role = "tab";
      petsOwnedButton.setAttribute("aria-controls", "nav-pets");
      petsOwnedButton.setAttribute("aria-selected", "false");
      petsOwnedButton.textContent = "Pets Owned";

      // Append the buttons to the navigation tab menu div
      navTabDiv.appendChild(completedTasksButton);
      navTabDiv.appendChild(petsOwnedButton);

      // Append the navigation tab menu div to the navigation element
      navElement.appendChild(navTabDiv);

      // Append the navigation element to the row div
      rowDiv.appendChild(navElement);

      // Append the row div to the container div
      navTabContainer.appendChild(rowDiv);

      // Append the container div to the document body
      document.body.appendChild(navTabContainer);

      // Create the Tasks Completed tab content div
      const tasksCompletedTabDiv = document.createElement("div");
      tasksCompletedTabDiv.classList.add("tab-pane", "fade", "show", "active");
      tasksCompletedTabDiv.id = "nav-tasks";
      tasksCompletedTabDiv.role = "tabpanel";
      tasksCompletedTabDiv.setAttribute("aria-labelledby", "nav-tasks-tab");
      tasksCompletedTabDiv.tabIndex = 0;

      // Create the container div inside the Tasks Completed tab content div
      const tasksContainerDiv = document.createElement("div");
      tasksContainerDiv.classList.add("container");

      // Create the row div inside the container div
      const tasksRowDiv = document.createElement("div");
      tasksRowDiv.classList.add("row", "mt-2");
      tasksRowDiv.id = "tasksList";

      // Append the row div to the container div
      tasksContainerDiv.appendChild(tasksRowDiv);

      // Append the container div to the Tasks Completed tab content div
      tasksCompletedTabDiv.appendChild(tasksContainerDiv);

      // Create the Pets Owned tab content div
      const petsOwnedTabDiv = document.createElement("div");
      petsOwnedTabDiv.classList.add("tab-pane", "fade", "show");
      petsOwnedTabDiv.id = "nav-pets";
      petsOwnedTabDiv.role = "tabpanel";
      petsOwnedTabDiv.setAttribute("aria-labelledby", "nav-pets-tab");
      petsOwnedTabDiv.tabIndex = 0;

      // Create the container div inside the Pets Owned tab content div
      const petsContainerDiv = document.createElement("div");
      petsContainerDiv.classList.add("container");

      // Create the row div inside the container div
      const petsRowDiv = document.createElement("div");
      petsRowDiv.classList.add("row", "mt-2");
      petsRowDiv.id = "petsList";

      // Append the row div to the container div
      petsContainerDiv.appendChild(petsRowDiv);

      // Append the container div to the Pets Owned tab content div
      petsOwnedTabDiv.appendChild(petsContainerDiv);

      // Append the Tasks Completed tab content div and Pets Owned tab content div to the document
      const tabContentDiv = document.createElement("div");
      tabContentDiv.classList.add("tab-content");
      tabContentDiv.appendChild(tasksCompletedTabDiv);
      tabContentDiv.appendChild(petsOwnedTabDiv);

      // Append the tab content div to the document body
      document.body.appendChild(tabContentDiv);

      // New User Interface
      if(responseData.task_count === 0) {

        // Create the container for the new user interface
        const newUserInterface = document.createElement("div");
        newUserInterface.classList.add("container", "text-center", "mt-5");

        // Create the row for the new user interface
        const newUserInterfaceRow = document.createElement("div");
        newUserInterfaceRow.classList.add("row");

        // Create the column for the new user interface
        const newUserInterfaceCol = document.createElement("div");
        newUserInterfaceCol.classList.add("col-12");

        // Create the welcome message for the new user interface
        const welcomeMessage = document.createElement("h3");
        welcomeMessage.classList.add("text-light", "fw-bolder");
        welcomeMessage.innerText = "Welcome to Ecoventure!";

        // Create the message for the new user interface
        const starterPrompt = document.createElement("p");
        starterPrompt.classList.add("text-light");
        starterPrompt.innerText = "Start completing tasks to earn points and level up your pets!";

        // Create the button for the new user interface
        const goToTasksBtn = document.createElement("a");
        goToTasksBtn.classList.add("btn", "btn-success", "mt-3");
        goToTasksBtn.href = "ecoTasks.html";
        goToTasksBtn.innerText = "Go To Tasks";
        
        document.body.appendChild(newUserInterface);
        newUserInterface.appendChild(newUserInterfaceRow);
        newUserInterfaceRow.appendChild(newUserInterfaceCol);
        newUserInterfaceCol.appendChild(welcomeMessage);
        newUserInterfaceCol.appendChild(starterPrompt);
        newUserInterfaceCol.appendChild(goToTasksBtn);
      }

      // Create the container for the sign out button
      const signOutBtnContainer = document.createElement("div");
      signOutBtnContainer.classList.add(
        "container",
        "my-4",
        "d-flex",
        "justify-content-end"
      );

      // Create the sign out button
      const signOutButton = document.createElement("button");
      signOutButton.id = "signOutBtn";
      signOutButton.classList.add("btn", "btn-danger");
      signOutButton.type = "submit";
      signOutButton.textContent = "Sign Out";

      // Append the sign out button to the sign out button container
      signOutBtnContainer.appendChild(signOutButton);

      // Append the sign out button container to the document body
      document.body.appendChild(signOutBtnContainer);
    }

    // If responseStatus is not 200
    else {

      // Adjust padding for top of page for error
      const pageTitle = document.getElementById("pageTitle");
      pageTitle.classList.add("my-lg-5", "my-md-5", "my-sm-4");

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
      } 
      
      // Set to not found if no response message
      else {
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

    // Dispatch event to load user profile
    document.dispatchEvent(new Event("UserProfileLoaded"));
  };

  // Fetch data from the api
  axiosMethod(currentUrl + `/api/users/${user_id}`, callback);
});

// Load User's Tasks when DOM is loaded and user profile is loaded
document.addEventListener("UserProfileLoaded", () => {
  const tasksCompleted = document.getElementById("tasksList");

  // Get user_id from jwt-decode
  const user_id = jwt_decode(localStorage.getItem("token")).user_id;

  const callback = (responseStatus, responseData) => {
    // Log response status and response data for easier debugging
    console.log("responseData: ", responseData);
    console.log("responseStatus: ", responseStatus);

    if (responseStatus === 200) {
      responseData.forEach((task) => {
        // If notes is empty, set notes to "No Notes Taken"
        task.notes == "" ? (task.notes = "No Notes Taken") : task.notes;
        task.pet_name == null ? (task.pet_name = "Unassigned") : task.pet_name;

        // Create a div element for each task
        const tasks = document.createElement("div");
        // Set the class name of the div element
        tasks.className = "col-lg-4 col-md-6 col-sm-12 mb-3";
        // Set the innerHTML of the div element
        tasks.innerHTML = `
        <div class="card mx-auto h-100 card-color taskCompleted" style="width: 17rem;">
          <div class="card-body">
            <div class = "row">
              <div class = "col-6 text-start">
                <p class="text-light badge bg-success h-6">#${task.progress_id}</p>
              </div>
              <div class = "col-6 text-end">
                <p class="card-text text-light text-center">
                  ${task.pet_name}
                  <i class="fa-solid fa-shield-dog text-info"></i>
                </p>
              </div>
            </div>
            <h5 class="card-title text-light text-center pt-3">${task.title}</h5>
            <div class = "text-warning pt-3">
              <h6><u>Notes</u></h6>
              <p class="card-text text-light">${task.notes}</p>
            </div>
        </div>
        `;

        // Append the tasks div element to the tasksCompleted div element
        tasksCompleted.appendChild(tasks);
      });
    }
  };

  // Fetch data from the api
  axiosMethod(currentUrl + `/api/task_progress/${user_id}`, callback);
});

// Load User's Pets when DOM is loaded and user profile is loaded
document.addEventListener("UserProfileLoaded", () => {
  const petsOwned = document.getElementById("petsList");

  // Get user_id from jwt-decode
  const user_id = jwt_decode(localStorage.getItem("token")).user_id;

  const callback = (responseStatus, responseData) => {
    // Log response status and response data for easier debugging
    console.log("responseData: ", responseData);
    console.log("responseStatus: ", responseStatus);

    if (responseStatus === 200) {
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

        // Create a div element for each task
        const pets = document.createElement("div");
        // Set the class name of the div element
        pets.className = "col-lg-4 col-md-6 col-sm-12 mb-3";
        // Set the innerHTML of the div element
        pets.innerHTML = `
          <div class="card mx-auto h-100 card-color" style="width: 15rem;">
            <div class = "position-relative">
              <div class = "position-absolute ps-1 mt-2">
                <span class = "${rarityColor} badge">
                  ${pet.rarity}
                </span>
              </div>
              <img src="http://localhost:3000/images/${pet.picture}" class="card-img-top image-fluid" alt="Picture of ${pet.pet_name}">
            </div>
          <div class="card-body">
            
            <div class = "row">
              <div class = "col-8 text-start">
                <p class = "text-light fw-bold">${pet.pet_name}</p>
              </div>
              <div class = "col-4 text-end">
                <span class = "badge bg-danger">
                  <i class="bi bi-trophy-fill text-warning"></i>
                  LV ${pet.level}
                </span>
              </div>
            </div>

            <div class = "row">
              <p class = "text-light small col-6 text-center">
                <span class = "green_theme fw-bold text-start">
                  EXP
                </span> 
                <i class="bi bi-sourceforge green_theme"></i>
              </p>
              <p class = "text-light small col-6 text-center">
                <span class = "text-info text-end">${pet.exp}</span> / 100
              </p>
            </div>

            <div class="progress w-100 mx-auto" role="progressbar" aria-label="progressLabel"
              aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar progress-color fw-bolder" style="width: ${pet.exp}%">
                  ${pet.exp}
                </div>
            </div>
          </div>

          <div class = "row">
            <p class = "col-6 text-center">
              <a class="text-decoration-none text-danger" type = "button" 
                 onclick = "deletePet(this)" data-bs-pet_id = ${pet.pet_id} data-bs-pet_name = ${pet.pet_name}>
                 Release
              </a>
            </p>
            <p class = "col-6 text-center">
              <a class="text-decoration-none text-info" href="learnSkill.html?pet_id=${pet.pet_id}">Learn Skill</a>
            </p>
          </div>
        `;

        // Append the tasks div element to the tasksCompleted div element
        petsOwned.appendChild(pets);
      });
    }
  };

  // Fetch data from the api
  axiosMethod(currentUrl + `/api/pet_bonds/${user_id}`, callback);
});

// A modal to trigger once user pressed release
const deletePet = (button) => {

  // Get pet_id from button
  pet_id = button.getAttribute("data-bs-pet_id");

  // Get modal title by class name
  const modalTitle = document.querySelector(".modal-title");
  modalTitle.classList.add("text-warning");
  modalTitle.innerText = `Warning`;

  // Get modal body by class name
  const deleteModal = new bootstrap.Modal(
    document.getElementById("deleteModal")
  );

  // Show modal
  deleteModal.show();
};


// Trigger click event on deletePetBtn
document.getElementById("deletePetBtn").addEventListener("click", () => {
  // Get user_id from jwt-decode
  const user_id = jwt_decode(localStorage.getItem("token")).user_id;
  const callback = (responseStatus, responseData) => {
    // Log response status and response data for easier debugging
    console.log("responseStatus: ", responseStatus);
    console.log("responseData: ", responseData);

    // If response status is 204, reload the page
    if (responseStatus === 204) {
      window.location.reload();
    } 
    
    // If response status is not 204, alert the user with the response message
    else {
      window.alert(responseData.message);
    }
  };

  // Fetch data from the api
  axiosMethod(
    currentUrl + `/api/pet_bonds/${user_id}/${pet_id}`,
    callback,
    "DELETE"
  );
});

// User's Sign Out Button
document.addEventListener("UserProfileLoaded", () => {
  // Get Sign Out Button by id
  const signOutBtnSwitch = document.getElementById("signOutBtn");
  // Add event listener to sign out button
  signOutBtnSwitch.addEventListener("click", () => {
    // Remove token from local storage
    localStorage.clear();
    // Inform user that they have successfully signed out.
    window.alert("You have successfully signed out!");
    // Redirect user to login page
    window.location.href = "index.html";
  });
});
