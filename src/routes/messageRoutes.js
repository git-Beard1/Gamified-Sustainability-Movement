const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");
const userController = require("../controllers/userController");

// GET /messages
router.get("/", messageController.readAllMessages);

// POST /messages
router.post(
  "/",
  userController.checkUserValidationBody,
  messageController.createMessage
);

// PUT /messages
router.put("/:message_id", messageController.updateMessage);

router.delete("/:message_id", messageController.deleteMessage);

module.exports = router;
