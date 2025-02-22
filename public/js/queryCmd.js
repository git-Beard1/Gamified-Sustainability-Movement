/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: queryCmd.js

    Last Modified: 03/02/2024
*/

// Fetch API
function axiosMethod(url, callback, method = "GET", data = null, token = null) {
  console.log("axiosMethod ", url, method, data, token);

  // Set headers
  const headers = {};

  // Set content type
  if (data) {
    headers["Content-Type"] = "application/json";
  }

  // Set token
  if (token) {
    headers["Authorization"] = "Bearer " + token;
  }

  const axiosConfig = {
    method: method.toUpperCase(),
    url: url,
    headers: headers,
    data: data,
  };

  axios(axiosConfig)
    .then((response) => callback(response.status, response.data))
    .catch((error) => {
      if (error.response) {
        callback(error.response.status, error.response.data);
      } else {
        console.error(`Error from ${method} ${url}:`, error.message);
      }
    });
}
