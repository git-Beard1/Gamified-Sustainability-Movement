/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: taskProgressRoutes.js

    Last Modified: 22/01/2024
*/

// Section A: TaskProgress

const express = require("express");
const router = express.Router();

const taskProgressController = require("../controllers/taskProgressController");
const userController = require("../controllers/userController");
const taskController = require("../controllers/taskController");
const petBondsController = require("../controllers/petBondsController");

// Endpoint 12: GET /task_progress/{user_id}
router.get(
  "/:user_id",
  userController.checkUserValidationParams,
  taskProgressController.selectTaskProgressByUserId
);

// Endpoint 11: POST /task_progress
router.post(
  "/",
  userController.checkUserValidationBody,
  taskController.checkTaskValidationBody,
  taskProgressController.createNewTaskProgress,
  petBondsController.getTotalExpOfPet,
  petBondsController.updatePetAttributes
);



// Endpoint 14: DELETE /task_progress/{progress_id}
router.delete(
  "/:progress_id",
  taskProgressController.checkProgressValidationParams,
  taskProgressController.deleteTaskProgressById
);

module.exports = router;
