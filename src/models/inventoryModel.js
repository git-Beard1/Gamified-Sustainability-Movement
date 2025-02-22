/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: inventoryModel.js

    Last Modified: 21/01/2024
*/

// Advanced Feature Section B: Inventory
const pool = require("../services/db");

// Universal inventory_id Validation Model
module.exports.checkInventory = (data, callback) => {
  const MYSQLSTATEMENT = `
  SELECT inventory_id FROM Inventory
  WHERE inventory_id = ?
  `;

  const VALUES = [data.inventory_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint: GET /inventory/{user_id}/{category}
// Retrieve items by category in inventory by user
module.exports.selectCategorisedItem = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT Inventory.inventory_id, User.user_id, Inventory.item_id, 
      Shop.item_name, Shop.category, 
      DATE(Inventory.bought_date) AS bought_date

      FROM Inventory

      INNER JOIN Shop
      ON Shop.item_id = Inventory.item_id
      INNER JOIN User
      ON User.user_id = Inventory.user_id

      WHERE User.user_id = ? AND Shop.category = ?;
  `;

  const VALUES = [data.user_id, data.category];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};

// Endpoint: GET /inventory/{user_id}
// Retrieve all items in inventory by user
module.exports.selectInventoryByUser = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT Inventory.inventory_id, User.user_id, Inventory.item_id, 
      Shop.item_name, Shop.category, 
      DATE(Inventory.bought_date) AS bought_date

      FROM Inventory

      INNER JOIN Shop
      ON Shop.item_id = Inventory.item_id
      INNER JOIN User
      ON User.user_id = Inventory.user_id

      WHERE User.user_id = ?;
  `;

  const VALUES = [data.user_id];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};

// Endpoint: POST /inventory/
// Check User and Item Existence in table. Retrieve all Related info of the Item from Shop
module.exports.getItemInfo = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT  
      item_id, item_name, category, 
      required_points AS item_cost
      FROM Shop
      WHERE item_id = ?;
      `;

  const VALUES = [data.item_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Check total items bought by user and sum up all the purchased points.
module.exports.totalPurchasedPoints = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT SUM(required_points) AS total_points_purchased

      FROM Shop

      INNER Join Inventory
      ON Inventory.item_id = Shop.item_id
      Inner Join User
      ON User.user_id = Inventory.user_id

      WHERE User.user_id = ?;
      `;

  const VALUES = [data.user_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Post item into inventory table with user_id, item_id and bought_date
module.exports.insertItem = (data, callback) => {
  const MYSQLSTATEMENT = `
      INSERT INTO Inventory (user_id, item_id, bought_date)
      Values(?, ?, NOW());
      `;

  const VALUES = [data.user_id, data.item_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint: DELETE /inventory/{inventory_id}
// Delete item in inventory by inventory_id
module.exports.deleteInventory = (data, callback) => {
  const MYSQLSTATEMENT = `
      DELETE FROM Inventory
      WHERE inventory_id = ?;
      ALTER TABLE Inventory AUTO_INCREMENT = 1;
  `;

  const VALUES = [data.inventory_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};
