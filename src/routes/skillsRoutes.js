/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: skillsRoutes.js

    Last Modified: 22/01/2024
*/

// Advanced Feature Section B: Skills

const express = require("express");
const router = express.Router();

const skillsController = require("../controllers/skillsController");
const petsController = require("../controllers/petsController");

// Endpoint: GET /skills/:pet_id
router.get(
  "/:pet_id",
  petsController.checkPetValidationParams,
  skillsController.selectSkillByPetId
);

// Endpoint: GET /skills
router.get("/", skillsController.getAllSkills);

module.exports = router;
