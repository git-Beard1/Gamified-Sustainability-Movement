/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: inventoryRoutes.js

    Last Modified: 22/01/2024
*/

// Advanced Feature Section B: Inventory

const express = require("express");
const router = express.Router();

const inventoryController = require("../controllers/inventoryController");
const userController = require("../controllers/userController");
const shopController = require("../controllers/shopController");
const petBondsController = require("../controllers/petBondsController");

// Endpoint: GET /inventory/:user_id/:category
router.get(
  "/:user_id/:category",
  userController.checkUserValidationParams,
  inventoryController.selectCategorisedItemByUser
);

// Endpoint: GET /inventory/:user_id
router.get(
  "/:user_id",
  userController.checkUserValidationParams,
  inventoryController.selectInventoryByUser
);

// Endpoint: POST /inventory/
router.post(
  "/",
  userController.checkUserValidationBody,
  shopController.checkItemValidationBody,
  userController.selectTotalPointsByUserBody,
  petBondsController.totalPointsPurchasedPetsBody,
  inventoryController.totalPointsPurchasedItemsBody,
  inventoryController.getItemReceipt,
  inventoryController.purchaseItem
);

// Endpoint: DELETE /inventory/:inventory_id
router.delete(
  "/:inventory_id",
  inventoryController.checkInventoryValidationParams,
  inventoryController.deleteItemByInvId
);

module.exports = router;
