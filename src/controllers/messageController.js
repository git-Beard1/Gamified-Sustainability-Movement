/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: inventoryController.js

    Last Modified: 21/01/2023
*/

// Message Controller
const messageModel = require("../models/messageModel");

module.exports.readAllMessages = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "readAllMessages",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    else if (results.length === 0) {
      res.status(404).json({
        message: "No Records Found",
      });
      return;
    }

    // Status 200
    else {
      res.status(200).json(results);
    }
  };
  messageModel.getAllMessagesModel(callback);
};

module.exports.createMessage = (req, res, next) => {
  // Check if message_text is undefined
  const { message, user_id } = req.body;
  const data = {
    user_id,
    message,
  };

  if (!message || message === "" || !user_id) {
    res.status(400).json({
      message: "message is undefined",
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "createMessage",
      Error: error,
    };

    // Interval Server Error
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 201
    else {
      res.status(201).json(results);
    }
  };

  messageModel.insertMessageModel(data, callback);
};

module.exports.updateMessage = (req, res, next) => {
  const { message } = req.body;
  const { message_id } = req.params;
  const data = {
    message_id,
    message,
  };

  // Status 400
  if (!message_id || !message) {
    res.status(400).json({
      message: "Missing Message",
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "updateMessage",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 404
    else if (results.affectedRows == 0) {
      res.status(404).json({
        message: "Message not found",
      });
      return;
    }

    // Status 201
    else {
      res.status(201).json(data);
    }
  };
  messageModel.updateMessageModel(data, callback);
};

module.exports.deleteMessage = (req, res, next) => {
  const { message_id } = req.params;
  const data = {
    message_id,
  };

  console.log(message_id);

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deleteMessage",
      Error: error,
    };

    if (error) {
      // Status 500
      console.log(errMessage);
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    } else {
      // Status 404
      if (results[0].affectedRows == 0) {
        res.status(404).send();
        return;
      }
      // Status 204
      else {
        res.status(204).send();
      }
    }
  };
  messageModel.deleteMessageModel(data, callback);
};
