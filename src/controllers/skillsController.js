/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: skillsController.js

    Last Modified: 21/01/2023
*/

// Advanced Feature Section B: Skills

const skillsModel = require("../models/skillsModel");

// Universal skill_id Validation Controller (for params)
module.exports.checkSkillValidationParams = (req, res, next) => {
  const { skill_id } = req.params;
  const data = {
    skill_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkSkillValidationParams",
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
    // Checks skill_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid skill_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.skill_id = results[0]; // store skill_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkSkillValidationParams", res.locals.skill_id);
      next();
    }
  };
  skillsModel.checkSkill(data, callback);
};

// Universal skill_id Validation Controller (for body)
module.exports.checkSkillValidationBody = (req, res, next) => {
  const { skill_id } = req.body;
  const data = {
    skill_id: parseInt(skill_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkSkillValidationBody",
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
    // Checks skill_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid skill_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.skill_id = results[0]; // store skill_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkSkillValidationBody", res.locals.skill_id);
      next();
    }
  };
  skillsModel.checkSkill(data, callback);
};

// Check Unique Skill Ownership (Each pet has its own unique skills)
module.exports.uniqueSkillOwnership = (req, res, next) => {
  const { skill_id, pet_id } = req.body;
  const data = {
    skill_id,
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "uniqueSkillOwership",
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
    // Checks Skill Pet Ownership validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Skill does not belong to pet",
      });
      return;
    }

    // Pass on to the next function
    else {
      console.log("Skill Ownership:", results[0]);
      next();
    }
  };
  skillsModel.checkPetSkillRS(data, callback);
};

// Endpoint: GET /skills/{pet_id}
// Retrieve skill by pet_id in skills
module.exports.selectSkillByPetId = (req, res, next) => {
  const { pet_id } = req.params;
  const data = {
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectSkillByPetId",
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

    // Status 200
    else {
      // To print as one whole object instead of array if the array length is 1
      results.length !== 1
        ? res.status(200).json(results)
        : res.status(200).json(results[0]);
    }
  };
  skillsModel.selectSkillPetId(data, callback);
};

// Endpoint: GET /skills/
module.exports.getAllSkills = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getAllSkills",
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
  skillsModel.readSkill(callback);
};
