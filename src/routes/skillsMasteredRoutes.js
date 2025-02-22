/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: skillsMasteredRoutes.js

    Last Modified: 22/01/2024
*/

// Advanced Feature Section B: SkillsMastered

const express = require("express");
const router = express.Router();

const skillsMasteredController = require("../controllers/skillsMasteredController");
const userController = require("../controllers/userController");
const petsController = require("../controllers/petsController");
const petBondsController = require("../controllers/petBondsController");
const skillsController = require("../controllers/skillsController");

// Endpoint: GET /skills_mastered/{user_id}/{pet_id}
router.get(
  "/:user_id/:pet_id",
  userController.checkUserValidationParams,
  petsController.checkPetValidationParams,
  petBondsController.checkUserPetOwnershipParams,
  skillsMasteredController.selectMasteredSkillsByUserPetId
);

// Endpoint: GET /skills_mastered/
router.get("/", skillsMasteredController.readAllSkillsMastered);

// Endpoint: POST /skills_mastered/
router.post(
  "/",
  userController.checkUserValidationBody,
  petsController.checkPetValidationBody,
  skillsController.checkSkillValidationBody,
  petBondsController.checkUserPetOwnershipBody,
  skillsController.uniqueSkillOwnership,
  skillsMasteredController.getRequiredLevel,
  skillsMasteredController.checkPetCurrLevel,
  skillsMasteredController.uniqueLearntSkillByPet,
  skillsMasteredController.learnSkill
);

module.exports = router;
