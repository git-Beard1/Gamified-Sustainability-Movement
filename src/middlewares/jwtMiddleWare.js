/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: jwtMiddleWare.js

    Last Modified: 22/01/2024
*/

require("dotenv").config();

// Require jwt package
const jwt = require("jsonwebtoken");

// Retrieve secretKey, algorithm and duration from .env
const secretKey = process.env.JWT_SECRET_KEY;
const algorithm = process.env.JWT_ALGORITHM;
const expiresIn = process.env.JWT_EXPIRES_IN;

// Generate JWT token
module.exports.generateToken = (req, res, next) => {
  // Payload
  const payload = {
    user_id: res.locals.user_id,
    timeStamp: new Date(),
  };
  // Header
  const options = {
    algorithm,
    expiresIn,
  };

  // Callback function to generate token
  const callback = (error, token) => {
    // Error log message for token generation
    if (error) {
      console.error(`Error jwt: ${error}`);
      res.status(500).json(error);
    }
    // Store token and move on to the next middleware
    else {
      res.locals.token = token;
      next();
    }
  };
  jwt.sign(payload, secretKey, options, callback);
};

// Send Token
module.exports.sendToken = (req, res, next) => {
  res.status(200).json({
    message: res.locals.message,
    token: res.locals.token,
  });
};

// Verify JWT Token
module.exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Error log message for token not found
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Token Has Expired")
    return res.status(401).json({ error: "No token provided" });
  }

  // Extract token from header
  const token = authHeader.replace("Bearer ", "");

  // Error log message for token not found
  if (!token) {
    console.log("No Token Provided")
    return res.status(401).json({ error: "No token provided" });
  }

  // Callback function to verify token
  const callback = (err, decoded) => {
    // Error log message for invalid token
    if (err) {
      console.log("Token Has Expired");
      return res.status(401).json({ error: "Your session has timed out. Please log in again." });
    }
    // Store userId and tokenTimestamp and move on to the next middleware
    else {
      res.status(200).json({
        user_id: decoded.user_id,
        tokenTimestamp: decoded.timeStamp,
      });
    }
  };
  jwt.verify(token, secretKey, callback);
};
