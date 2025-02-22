/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: inventoryController.js

    Last Modified: 21/01/2023
*/

// Advanced Feature Section B: Inventory

const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

// Universal inventory_id Validation Controller (for params)
module.exports.checkInventoryValidationParams = (req, res, next) => {
  const { inventory_id } = req.params;
  const data = {
    inventory_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkInventoryValidationParams",
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
    // Checks inventory_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid inventory_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.inventory_id = results[0]; // store inventory_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkInventoryValidationParams", res.locals.inventory_id);
      next();
    }
  };
  inventoryModel.checkInventory(data, callback);
};

// Universal inventory_id Validation Controller (for body)
module.exports.checkInventoryValidationBody = (req, res, next) => {
  const { inventory_id } = req.body;
  const data = {
    inventory_id: parseInt(inventory_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkInventoryValidationBody",
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
    // Checks inventory_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid inventory_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.inventory_id = results[0]; // store inventory_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkInventoryValidationBody", res.locals.inventory_id);
      next();
    }
  };
  inventoryModel.checkInventory(data, callback);
};

// Endpoint: GET /inventory/{user_id}/{category}
// Retrieve items by category in inventory by user
module.exports.selectCategorisedItemByUser = (req, res, next) => {
  const { user_id, category } = req.params;
  const data = {
    user_id,
    category,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectCategorisedItemByUser",
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
      // Sends an error message if categorised item does not exist in user's inventory
      res.status(404).json({
        message: `Items of ${category} Bought by User ${data.user_id} Not Found`, // sends error message to inform user
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
  inventoryModel.selectCategorisedItem(data, callback);
};

// Endpoint: GET /inventory/{user_id}
// Retrieve all items in inventory by user
module.exports.selectInventoryByUser = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectInventoryByUser",
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
    // Checks for item's existence bought by user
    else if (results[0].item_id === null) {
      // Sends an error message for invalid item_id
      res.status(404).json({
        message: `Items Bought by User ${data.user_id} Not Found`,
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
  inventoryModel.selectInventoryByUser(data, callback);
};

// Endpoint: POST /inventory/
// Check total items bought by user and sum up all the purchased points.
module.exports.totalPointsPurchasedItemsParams = (req, res, next) => {
  const { user_id, item_id } = req.params;
  const data = {
    user_id: parseInt(user_id),
    item_id: parseInt(item_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "totalPointsPurchasedItemsParams",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Pass onto the next function
    else {
      results[0].total_points_purchased === null // if the user did not purchase any item, null,
        ? (results[0].total_points_purchased = 0) // change the purchased points to zero (0)
        : (results[0].total_points_purchased = parseInt(
            results[0].total_points_purchased
          )); // else, parse the total points to integer

      // Store the total points of purchased items in res.locals
      res.locals.totalItemPoints = results[0].total_points_purchased;

      console.log("Total Items Purchased Points", results[0]); // logs out to terminal to see updates (Total purchased_points)
      next();
    }
  };
  inventoryModel.totalPurchasedPoints(data, callback);
};

module.exports.totalPointsPurchasedItemsBody = (req, res, next) => {
  const { user_id, item_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    item_id: parseInt(item_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "totalPointsPurchasedItemsBody",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Pass onto the next function
    else {
      results[0].total_points_purchased === null // if the user did not purchase any item, null,
        ? (results[0].total_points_purchased = 0) // change the purchased points to zero (0)
        : (results[0].total_points_purchased = parseInt(
            results[0].total_points_purchased
          )); // else, parse the total points to integer

      // Store the total points of purchased items in res.locals
      res.locals.totalItemPoints = results[0].total_points_purchased;

      console.log("Total Items Purchased Points", results[0]); // logs out to terminal to see updates (Total purchased_points)
      next();
    }
  };
  inventoryModel.totalPurchasedPoints(data, callback);
};

// Retrieve all Related info of the Item from Shop
module.exports.getItemReceipt = (req, res, next) => {
  const { user_id, item_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    item_id: parseInt(item_id),
  };

  // Status 400
  if ((!user_id, !item_id)) {
    res.status(400).send();
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getItemReceipt",
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

    // Pass on to the next function
    else {
      // Store the cost of user's selected item (points) in res.locals
      res.locals.item_cost = parseInt(results[0].item_cost);
      // Store the user's selected item info in res.locals
      res.locals.item_receipt = results[0];

      console.log("Item Receipt: ", results[0]); // log out to terminal to confirm updates
      next();
    }
  };
  inventoryModel.getItemInfo(data, callback);
};

// Post item into inventory table with user_id, item_id and bought_date
module.exports.purchaseItem = (req, res, next) => {
  const { user_id, item_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    item_id: parseInt(item_id),
  };

  const totalTaskPoints = res.locals.totalTaskPoints;
  const totalCost = res.locals.totalPetPoints + res.locals.totalItemPoints;
  // Find the new total amount by subtracting total cost (item + pet) from total points (task)
  const totalPoints = totalTaskPoints - totalCost;

  console.log(`User's Total Points (After Purchase): ${totalPoints}`);

  // Status 406
  // Check player's points to purchase item
  if (totalPoints < res.locals.item_cost) {
    // if the total points less than the required points to purchase item,
    res.status(406).json({
      message: "Insufficient Points", // sends message to indicate insufficient points to buy
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "purchaseItem",
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

    // Status 201
    else {
      // Store user_id, and item info to let user know the item is purchased successfully.
      const receipt = { ...res.locals.user_id, ...res.locals.item_receipt };
      console.log(receipt);

      // Find the new total amount by subtracting the cost of selected item from total points
      const pointsLeft = totalPoints - res.locals.item_cost;

      // Message upon successful purchase
      const message = {
        Message: "Item Purchased Successfully",
        points_left: pointsLeft,
      };

      // Sends response back to user
      res.status(201).json({ ...message, ...receipt });
    }
  };
  inventoryModel.insertItem(data, callback);
};

// Endpoint: DELETE /inventory/{inventory_id}
// Delete item in inventory by inventory_id
module.exports.deleteItemByInvId = (req, res, next) => {
  const { user_id, inventory_id } = req.params;
  const data = {
    user_id: parseInt(user_id),
    inventory_id: parseInt(inventory_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deleteItemByInvId",
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
    else {
      // If no changes, if inventory_id is not found,
      if (results[0].affectedRows === 0) {
        // Sends an error message for invalid inventory_id
        res.status(404).json({
          message: `Provided Inventory ID: ${inventory_id} Not Found.`,
        });
        return;
      }

      // Status 204
      else {
        res.status(204).send();
      }
    }
  };
  inventoryModel.deleteInventory(data, callback);
};
