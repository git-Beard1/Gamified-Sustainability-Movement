/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: shopRoutes.js

    Last Modified: 22/01/2024
*/

// Advanced Feature Section B: Shop

const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shopController");

// Endpoint: GET /shop/items/:category
router.get("/items/:category", shopController.selectCategorisedItem);

// Endpoint: GET /shop/items
router.get("/items", shopController.getAllItems);

module.exports = router;
