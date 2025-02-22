/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: userController.js

    Last Modified: 21/01/2023
*/

// Section A: User

const userModel = require("../models/userModel");
const inventoryModel = require("../models/inventoryModel");

// Universal user_id Validation Controller (for params)
module.exports.checkUserValidationParams = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserValidationParams",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    // Checks user_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid user_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.user_id = results[0]; // store user_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkUserValidationParams", res.locals.user_id);
      next();
    }
  };
  userModel.checkUser(data, callback);
};

// Universal user_id Validation Controller (for body)
module.exports.checkUserValidationBody = (req, res, next) => {
  const { user_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
  };

  // Status 400
  if (!user_id) {
    res.status(400).json({
      message: "Missing Required Data",
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserValidationBody",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    // Checks user_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid user_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.user_id = results[0]; // store user_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkUserValidationBody", res.locals.user_id);
      next();
    }
  };
  userModel.checkUser(data, callback);
};

// Endpoint Register POST /login Controller
// Get user_id and password for login by username
module.exports.getUserIDPassword = (req, res, next) => {
  const { username, password } = req.body;
  const data = {
    username,
    password,
  };

  // Callback function for getUserIDPassword
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserValidationBody",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }

    // Status 404
    else if (results.length === 0) {
      res.status(404).json({
        message: "User Not Found",
      });
      return;
    }

    // Store user_id, password, and message into res.locals and move on to the next middleware
    else {
      // If user is found, store user_id, password, message into res.locals
      res.locals.user_id = results[0].user_id;
      res.locals.password = results[0].password;
      res.locals.message = "User Logged In Successfully";

      next();
    }
  };
  userModel.checkUserIDPassword(data, callback);
};

// Update last login time
module.exports.updateLastLoginByUser = (req, res, next) => {
  const { user_id } = res.locals;
  const data = {
    user_id,
  };

  // Status 400
  if (!user_id) {
    res.status(400).send();
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserValidationBody",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    else {
      next();
    }
  };
  userModel.updateLastLogin(data, callback);
};

// Endpoint Register POST /register Controller
// Check username, email overlap with other users
module.exports.checkUserNameEmailAssociation = (req, res, next) => {
  const { username, email, password } = req.body;
  const data = {
    username,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserNameEmailAssociation",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }

    // Status 409
    else if (results.length !== 0) {
      res.status(409).json({
        message: "Username or Email Already Exists.",
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to the terminal for easier debugging in-between functions
      console.log("checkUserNameEmailAssociation", results);
      next();
    }
  };
  userModel.getUserNameEmail(data, callback);
};

// Insert new user info to user table
module.exports.createNewUser = (req, res, next) => {
  const { username, email } = req.body;
  const data = {
    username,
    email,
    password: res.locals.hashedPassword,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "createNewUser",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Store message into res.locals
    else {
      res.locals.message = "User Registered Successfully";
      res.locals.user_id = results.insertId;
      next();
    }
  };
  userModel.insertUser(data, callback);
};

// Endpoint 3 GET /users/{user_id} Controller

// Read all user info by user_id from user table
module.exports.selectTotalPointsByUserParams = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectTotalPointsByUserParams",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Pass on the total points of user to the next
    else {
      results[0].total_points === null
        ? (results[0].total_points = 0)
        : (results[0].total_points = parseInt(results[0].total_points));

      // Store total points into res.locals
      res.locals.totalTaskPoints = results[0].total_points;

      // Log out results to determine errors in-between middlewares
      console.log("selectTotalPointsByUser", results[0]);
      next();
    }
  };
  userModel.getUserTotalPoints(data, callback);
};

module.exports.selectTotalPointsByUserBody = (req, res, next) => {
  const { user_id } = req.body;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectTotalPointsByUserBody",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Pass on the total points of user to the next
    else {
      results[0].total_points === null
        ? (results[0].total_points = 0)
        : (results[0].total_points = parseInt(results[0].total_points));

      // Store total points into res.locals
      res.locals.totalTaskPoints = results[0].total_points;

      // Log out results to determine errors in-between middlewares
      console.log("selectTotalPointsByUser", results[0]);
      next();
    }
  };
  userModel.getUserTotalPoints(data, callback);
};

// Get All User Info together with total points from task
module.exports.selectUserById = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const totalTaskPoints = res.locals.totalTaskPoints;
  const totalCost = res.locals.totalPetPoints + res.locals.totalItemPoints;
  // Find the new total amount by subtracting total cost (item + pet) from total points (task)
  const totalPoints = totalTaskPoints - totalCost;

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectUserById",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    else if (results.length === 0) {
      res.status(404).json({
        message: "No Records Found",
      });
      return;
    }

    // Status 200
    else {
      // Message if request is successful
      const message = {
        total_pets_owned: res.locals.total_pets_owned,
        task_count: res.locals.task_count,
        total_points: totalPoints,
      };

      // User info with points left after purchase
      const userInfo = { ...results[0], ...message };
      res.status(200).json(userInfo);
    }
  };
  userModel.getUser(data, callback);
};

// Endpoint 2 GET /users Controller
// Read all user info from user table
module.exports.readAllUsers = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "readAllUsers",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    else if (results.length === 0) {
      res.status(404).json({
        message: "No Records Found",
      });
      return;
    }

    // Status 200
    else {
      res.status(200).json(results);
    }
  };
  userModel.readUser(callback);
};

// Update new user info
module.exports.updateUserById = (req, res, next) => {
  const { user_id } = req.params;
  const { username, email } = req.body;
  const data = {
    user_id,
    username,
    email,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "updateUserByID",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 200
    else {
      res.status(200).json(data);
    }
  };
  userModel.updateUser(data, callback);
};

// Endpoint 5 DELETE /users/{user_id} Controller
module.exports.deleteUserById = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deleteUserByID",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).send({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 204
    else {
      res.status(204).send();
    }
  };
  userModel.deleteUser(data, callback);
};
