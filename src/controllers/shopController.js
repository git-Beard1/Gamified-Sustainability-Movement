/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: shopController.js

    Last Modified: 21/01/2023
*/

// Advanced Feature Section B: Shop

const shopModel = require("../models/shopModel");

// Universal item_id Validation Controller (for params)
module.exports.checkItemValidationParams = (req, res, next) => {
  const { item_id } = req.params;
  const data = {
    item_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkItemValidationParams",
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
    // Checks item_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid item_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.item_id = results[0]; // store item_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkItemValidationParams", res.locals.item_id);
      next();
    }
  };
  shopModel.checkItem(data, callback);
};

// Universal item_id Validation Controller (for body)
module.exports.checkItemValidationBody = (req, res, next) => {
  const { item_id } = req.body;
  const data = {
    item_id: parseInt(item_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkItemValidationBody",
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

    // Status 400
    else if (!item_id) {
      res.status(400).json({
        message: "Missing Required Data",
      });
      return;
    }

    // Status 404
    // Checks item_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid item_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.item_id = results[0]; // store item_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkItemValidationBody", res.locals.item_id);
      next();
    }
  };
  shopModel.checkItem(data, callback);
};

// Endpoint: GET /shop/items/{category}
// Retrieve items by category in shop
module.exports.selectCategorisedItem = (req, res, next) => {
  const { category } = req.params;
  const data = {
    category,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectCategorisedItem",
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
    // Checks for existence of categorised items
    else if (results.length === 0) {
      // Sends an error message if categorised item does not exist in shop
      res.status(404).json({
        message: `Items of ${category} Not Found`,
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
  shopModel.selectCategorisedItem(data, callback);
};

// Endpoint: GET /shop/items
module.exports.getAllItems = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getAllItems",
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
  shopModel.readItem(callback);
};
