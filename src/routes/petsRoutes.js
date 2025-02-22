/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: petsRoutes.js

    Last Modified: 22/01/2024
*/

// Advanced Feature Section B: Pets

const express = require("express");
const router = express.Router();

const petsController = require("../controllers/petsController");

// Endpoint: GET /pets/{pet_id}
router.get(
  "/:pet_id",
  petsController.checkPetValidationParams,
  petsController.selectPetById
);

// Endpoint: GET /pets
router.get("/", petsController.getAllPets);

module.exports = router;
