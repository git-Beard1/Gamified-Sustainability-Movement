/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: bcryptMiddleWare.js

    Last Modified: 22/01/2024
*/

const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports.hashPassword = (req, res, next) => {
  const callback = (error, hash) => {
    // Error log message during hash password
    if (error) {
      console.error(`Bcrypt Error: ${error}`);
      res.status(500).json(error);
    }
    // Store the hash pw and move on to the next middleware
    else {
      res.locals.hashedPassword = hash;
      next();
    }
  };
  bcrypt.hash(req.body.password, saltRounds, callback);
};

module.exports.comparePassword = (req, res, next) => {
  const callback = (error, isMatch) => {
    // Error log message during compare password
    if (error) {
      console.error(`Bcrypt Error: ${error}`);
      res.status(500).json(error);
    }
    // Check password
    else {
      isMatch
        ? next()
        : res.status(401).json({
            message: "Wrong password",
          });
    }
  };
  bcrypt.compare(req.body.password, res.locals.password, callback);
};
