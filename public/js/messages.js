/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: messages.js

    Last Modified: 03/02/2024
*/

document.addEventListener("UserInfoRetrieved", () => {
  // Get user_id from jwt-decode
  const user_id = jwt_decode(localStorage.getItem("token")).user_id;
  // Get message lists from all users
  const messageList = document.getElementById("messageList");

  const callback = (responseStatus, responseData) => {
    // Log responseStatus and responseData for easier debugging
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If responseStatus is 200
    if (responseStatus === 200) {
      responseData.forEach((message) => {
        // Create message box for profile and the message
        const messageBox = document.createElement("div");
        messageBox.classList.add(
          "row",
          "my-auto",
          "mb-3",
          "d-flex",
          "justify-content-center",
          "ms-5"
        );

        // Create image container for user profile picture
        const imageContainer = document.createElement("div");
        imageContainer.classList.add(
          "col-lg-4",
          "col-md-4",
          "col-sm-4",
          "text-end"
        );

        // Create image element for user profile picture
        const image = document.createElement("img");
        message.profile_pic == null
          ? (image.src = `http://localhost:3000/images/profile.PNG`)
          : (image.src = `http://localhost:3000/images/${message.profile_pic}`);

        image.classList.add("rounded-circle", "small-image");
        image.alt = "User Profile Picture";

        // Append image to image container
        imageContainer.appendChild(image);

        // Create text container for message meta head and message details
        const textContainer = document.createElement("div");
        textContainer.classList.add(
          "col-lg-8",
          "col-md-8",
          "col-sm-8",
          "text-light",
          "text-start"
        );

        // Create text meta head for message meta details
        const headerTexts = [
          { text: message.username, classNames: ["fw-bold", "fs-6"] },
          {
            text: message.sent_time,
            classNames: ["ps-2", "small", "text-secondary"],
          },
        ];

        // Change color for current user
        user_id == message.user_id
          ? headerTexts[0].classNames.push("text-info")
          : headerTexts[0].classNames.push("text-light");

        // Append text meta head to text container
        headerTexts.forEach((item) => {
          const textMetaHead = document.createElement("span");
          textMetaHead.classList.add(...item.classNames);
          textMetaHead.textContent = item.text;
          textContainer.appendChild(textMetaHead);
        });

        // Create edit and delete buttons for current user
        if (user_id == message.user_id) {
          // Create edit button
          const editButton = document.createElement("span");
          editButton.classList.add(
            "bg-info",
            "badge",
            "rounded-pill",
            "ms-2",
            "message-text"
          );
          editButton.setAttribute("type", "button");
          editButton.setAttribute("onclick", "editModal(this)");
          editButton.setAttribute(
            "data-bs-message_id",
            `${message.message_id}`
          );
          editButton.textContent = "Edit";

          // Append edit button to text container
          textContainer.appendChild(editButton);

          // Create delete button
          const deleteButton = document.createElement("span");
          deleteButton.classList.add(
            "bg-danger",
            "badge",
            "rounded-pill",
            "ms-2"
          );
          deleteButton.setAttribute("type", "button");
          deleteButton.setAttribute("onclick", "deleteMessage(this)");
          deleteButton.setAttribute(
            "data-bs-message_id",
            `${message.message_id}`
          );
          deleteButton.textContent = "Delete";

          // Append delete button to text container
          textContainer.appendChild(deleteButton);
        }

        // Create text for message details
        const text = document.createElement("p");
        text.textContent = message.message;

        // Append text to text container
        textContainer.appendChild(text);

        // Append image container and text container to message box
        messageBox.appendChild(imageContainer);
        messageBox.appendChild(textContainer);

        // Append message box to message list
        messageList.appendChild(messageBox);
      });

      // Get send message button element by id
      const sendButton = document.getElementById("sendButton");

      // Set to sticky bottom so user can send message from anywhere
      sendButton.classList.add("text-end", "sticky-bottom");

      // Create send message button
      const button = document.createElement("button");
      button.classList.add("btn", "btn-primary", "mt-3");
      button.textContent = "Send Message";
      sendButton.appendChild(button);

      // Add event listener to send message button
      button.addEventListener("click", buttonModal);
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
  };

  // Fetch messages from all users
  axiosMethod(currentUrl + `/api/messages`, callback);
});

// Send message modal
const buttonModal = () => {
  const messageModal = new bootstrap.Modal(
    document.getElementById("sendMessageModal")
  );

  const modalTitle = document.getElementById("sendMessageModalLabel");

  modalTitle.innerText = "Send Message";

  messageModal.show();
};

// Edit message modal
const editModal = (button) => {
  const messageModal = new bootstrap.Modal(
    document.getElementById("editMessageModal")
  );

  const modalTitle = document.getElementById("editMessageModalLabel");

  modalTitle.innerText = "Edit Message";

  messageModal.show();
  message_id = button.getAttribute("data-bs-message_id");
  console.log("message_id: ", message_id);
};

// Delete message
const deleteMessage = (button) => {
  message_id = button.getAttribute("data-bs-message_id");
  console.log("message_id: ", message_id);

  // callback for axios method
  const callback = (responseStatus, responseData) => {
    // Log responseStatus and responseData for easier debugging
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    // If responseStatus is 204, reload the page
    if (responseStatus === 204) {
      window.location.reload();
    }

    // If responseStatus is not 204, display error message
    else {
      window.alert(responseData.message);
    }
  };

  // Fetch delete message by message_id
  axiosMethod(currentUrl + `/api/messages/${message_id}`, callback, "DELETE");
};

// Send message event listener
document.addEventListener("UserInfoRetrieved", () => {
  // Get send message element by id
  const sendMessage = document.getElementById("sendMessage");
  // Add event listener to send message element
  sendMessage.addEventListener("click", () => {
    // Get user_id from jwt-decode
    const user_id = jwt_decode(localStorage.getItem("token")).user_id;
    const message = document.getElementById("sendMessageTextArea").value;
    console.log("Message: ", message);

    // Data to be sent to the server
    const data = {
      user_id,
      message,
    };

    // callback for axios method
    const callback = (responseStatus, responseData) => {
      // Log responseStatus and responseData for easier debugging
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      // If responseStatus is 201, reload the page
      if (responseStatus === 201) {
        window.location.reload();
      }

      // If responseStatus is not 201, display error message
      else {
        window.alert(responseData.message);
      }
    };

    // Fetch send message by user_id and message
    axiosMethod(currentUrl + `/api/messages`, callback, "POST", data);
  });
});

// Edit message event listener
document.addEventListener("UserInfoRetrieved", () => {
  // Get send message element by id
  const editMessage = document.getElementById("editMessage");
  // Add event listener to send message element
  editMessage.addEventListener("click", () => {
    const message = document.getElementById("editMessageTextArea").value;

    // Data to be sent to the server
    const data = {
      message,
    };

    // callback for axios method
    const callback = (responseStatus, responseData) => {
      // Log responseStatus and responseData for easier debugging
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      // If responseStatus is 201, reload the page
      if (responseStatus === 201) {
        window.location.reload();
      }

      // If responseStatus is not 201, display error message
      else {
        window.alert(responseData.message);
      }
    };

    // Fetch edit message by message_id and message
    axiosMethod(
      currentUrl + `/api/messages/${message_id}`,
      callback,
      "PUT",
      data
    );
  });
});
