/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: retrieveUserInfo.js

    Last Modified: 03/02/2024
*/

const token = localStorage.getItem("token");

// Callback function for axiosMethod
const callback = (responseStatus, responseData) => {
  // Log responseStatus and responseData for easier debugging
  console.log("responseStatus:", responseStatus);
  // console.log("responseData:", responseData);


  // If responseStatus is 200
  if (responseStatus === 200) {
    console.log("Token is valid");
  }
  // If responseStatus is not 200, token invalid
  else {
    window.alert(responseData.error);
    localStorage.clear();
    window.location.href = "index.html";
  }
  document.dispatchEvent(new Event("UserInfoRetrieved"));
};

// Perform verify token progress
axiosMethod(currentUrl + "/api/jwt/verify", callback, "GET", null, token);
