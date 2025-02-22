/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: petsController.js

    Last Modified: 21/01/2023
*/

// Advanced Feature Section B: Pets

const petsModel = require("../models/petsModel");

// Universal pet_id Validation Controller (for params)
module.exports.checkPetValidationParams = (req, res, next) => {
  const { pet_id } = req.params;
  const data = {
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkPetValidationParams",
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
    // Checks pet_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Pet Does Not Exist",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.pet_id = results[0]; // store pet_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkPetValidationParams", res.locals.pet_id);
      next();
    }
  };
  petsModel.checkPet(data, callback);
};

// Universal pet_id Validation Controller (for body)
module.exports.checkPetValidationBody = (req, res, next) => {
  const { pet_id } = req.body;
  const data = {
    pet_id: parseInt(pet_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkPetValidationBody",
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
    // Checks pet_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid pet_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.pet_id = results[0]; // store pet_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkPetValidationParams", res.locals.pet_id);
      next();
    }
  };
  petsModel.checkPet(data, callback);
};

// Endpoint: GET pets/{pet_id}
module.exports.selectPetById = (req, res, next) => {
  const { pet_id } = req.params;
  const data = {
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectPetById",
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
    // Checks for existence of pets by rarity
    else if (results.length === 0) {
      // Sends an error message if Pets by rarity does not exist in pets
      res.status(404).json({
        message: `Pet Not Found`, // sends error message to inform user
      });
      return;
    }

    // Status 200
    else {
      // To print as one whole object instead of array if the array length is 1
      results.length !== 1
        ? res.status(200).json(results)
        : res.status(200).json(results[0]);
    }
  };
  petsModel.selectById(data, callback);
};

// Endpoint: GET /pets
module.exports.getAllPets = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getAllPets",
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
  petsModel.readPets(callback);
};
