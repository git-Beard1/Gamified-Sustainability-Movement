/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: userRoutes.js

    Last Modified: 22/01/2024
*/

// Section A: User

const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const petBondsController = require("../controllers/petBondsController");
const inventoryController = require("../controllers/inventoryController");
const taskProgressController = require("../controllers/taskProgressController");

// Endpoint 3: GET /users/{user_id}
router.get(
  "/:user_id",
  userController.checkUserValidationParams,
  userController.selectTotalPointsByUserParams,
  petBondsController.totalPointsPurchasedPetsParams,
  inventoryController.totalPointsPurchasedItemsParams,
  taskProgressController.countTasksByUser,
  petBondsController.selectTotalPetsOwnedByUserId,
  userController.selectUserById
);

// Endpoint 2: GET /users
router.get("/", userController.readAllUsers);

// Endpoint 5: DELETE /users/{user_id}
router.delete(
  "/:user_id",
  userController.checkUserValidationParams,
  userController.deleteUserById
);

module.exports = router;
