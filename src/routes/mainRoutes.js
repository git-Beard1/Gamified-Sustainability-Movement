/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: mainRoutes.js

    Last Modified: 22/01/2024
*/

const express = require("express");
const userController = require("../controllers/userController");
const bcryptMiddleWare = require("../middlewares/bcryptMiddleWare");
const jwtMiddleWare = require("../middlewares/jwtMiddleWare");

const router = express.Router();

router.post(
  "/login",
  userController.getUserIDPassword,
  userController.updateLastLoginByUser,
  bcryptMiddleWare.comparePassword,
  jwtMiddleWare.generateToken,
  jwtMiddleWare.sendToken
);

router.post(
  "/register",
  userController.checkUserNameEmailAssociation,
  bcryptMiddleWare.hashPassword,
  userController.createNewUser,
  jwtMiddleWare.generateToken,
  jwtMiddleWare.sendToken
);

router.get(
  "/jwt/verify/",
  jwtMiddleWare.verifyToken
);

// Section A:

// User
const userRoutes = require("./userRoutes");
router.use("/users", userRoutes);

// Task
const taskRoutes = require("./taskRoutes");
router.use("/tasks", taskRoutes);

// TaskProgress
const taskProgressRoutes = require("./taskProgressRoutes");
router.use("/task_progress", taskProgressRoutes);

// Message
const messageRoutes = require("./messageRoutes");
router.use("/messages", messageRoutes);

// Advanced Feature Section B:

// Shop
const shopRoutes = require("./shopRoutes");
router.use("/shop", shopRoutes);

// Inventory
const inventoryRoutes = require("./inventoryRoutes");
router.use("/inventory", inventoryRoutes);

// Pets
const petsRoutes = require("./petsRoutes");
router.use("/pets", petsRoutes);

// PetBonds
const petBondsRoutes = require("./petBondsRoutes");
router.use("/pet_bonds", petBondsRoutes);

// Skills
const skillsRoutes = require("./skillsRoutes");
router.use("/skills", skillsRoutes);

// SkillsMastered
const skillsMasteredRoutes = require("./skillsMasteredRoutes");
router.use("/skills_mastered", skillsMasteredRoutes);

module.exports = router;
