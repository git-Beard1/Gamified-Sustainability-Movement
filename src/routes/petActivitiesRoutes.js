/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: petActivitiesRoutes.js

    Last Modified: 22/01/2024
*/

// Advanced Feature Section B: PetActivities

const express = require("express");
const router = express.Router();

const petActivitiesController = require("../controllers/petActivitiesController");
const userController = require("../controllers/userController");
const petsController = require("../controllers/petsController");
const taskController = require("../controllers/taskController");
const petBondsController = require("../controllers/petBondsController");

// Endpoint: GET /pet_activities/{user_id}/{pet_id}
router.get(
  "/:user_id/:pet_id",
  userController.checkUserValidationParams,
  petsController.checkPetValidationParams,
  petBondsController.checkUserPetOwnershipParams,
  petActivitiesController.selectPetActivitiesByUserPetId
);

// Endpoint: GET /pet_activities
router.get("/", petActivitiesController.readAllPetActivities);

// Endpoint: POST /pet_activities
router.post(
  "/",
  userController.checkUserValidationBody,
  petsController.checkPetValidationBody,
  taskController.checkTaskValidationBody,
  petBondsController.checkUserPetOwnershipBody,
  petActivitiesController.getTaskExp,
  petActivitiesController.getTotalExpOfPet,
  petBondsController.updatePetAttributes,
  petActivitiesController.createPetActivities
);

module.exports = router;
