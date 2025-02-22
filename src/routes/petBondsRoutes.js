/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: petBondsRoutes.js

    Last Modified: 22/01/2024
*/

// Advanced Feature Section B: PetBonds

const express = require("express");
const router = express.Router();

const petBondsController = require("../controllers/petBondsController");
const userController = require("../controllers/userController");
const petsController = require("../controllers/petsController");
const inventoryController = require("../controllers/inventoryController");
const skillsMasteredController = require("../controllers/skillsMasteredController");
const skillsController = require("../controllers/skillsController");
const taskProgressController = require("../controllers/taskProgressController");

// Endpoint: GET /pet_bonds/{user_id}
// Retrieve user info and all pet attributes by user_id
router.get(
  "/:user_id",
  userController.checkUserValidationParams,
  petBondsController.selectBondByUserId
);

// Endpoint: GET /pet_bonds
router.get("/", petBondsController.readAllPetBonds);

// Endpoint: POST /pet_bonds
router.post(
  "/",
  userController.checkUserValidationBody,
  petsController.checkPetValidationBody,
  petBondsController.uniquePetOwnership,
  userController.selectTotalPointsByUserBody,
  inventoryController.totalPointsPurchasedItemsBody,
  petBondsController.totalPointsPurchasedPetsBody,
  petBondsController.getPetReceipt,
  petBondsController.exchangePet
);

// Endpoint: PUT /pet_bonds
router.put(
  "/",
  userController.checkUserValidationBody,
  petsController.checkPetValidationBody,
  skillsController.checkSkillValidationBody,
  petBondsController.checkUserPetOwnershipBody,
  skillsController.uniqueSkillOwnership,
  skillsMasteredController.checkAllLearntSkills,
  petBondsController.updateEquippedSkillOfPet
);

// Endpoint: DELETE /pet_bonds/{bond_id}
router.delete(
  "/:user_id/:pet_id",
  userController.checkUserValidationParams,
  petsController.checkPetValidationParams,
  petBondsController.checkUserPetOwnershipParams,
  petBondsController.deleteBondsById,
  skillsMasteredController.deleteSkillMasteredByUserPetId,
  taskProgressController.deletePetActivityByUserPetId
);

module.exports = router;
