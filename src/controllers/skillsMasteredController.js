/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: skillsMasteredController.js

    Last Modified: 21/01/2023
*/

// Advanced Feature Section B: skillsMastered

const skillsMasteredModel = require("../models/skillsMasteredModel");

// Endpoint: GET /skills_mastered/{user_id}/{pet_id}
// Retrieve activities(tasks completed) by User's Pet
module.exports.selectMasteredSkillsByUserPetId = (req, res, next) => {
  const { user_id, pet_id } = req.params;
  const data = {
    user_id,
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectMasteredSkillsByUserPetId",
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

    //Status 404
    else if (results.length === 0) {
      res.status(404).json({
        message: "Pet has not learnt skills yet",
      });
      return;
    }

    // Status 200
    else {
      res.status(200).json(results);
    }
  };
  skillsMasteredModel.selectMasteredSkillsOfUserPet(data, callback);
};

// Endpoint: GET /skills_mastered/
module.exports.readAllSkillsMastered = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "readAllSkillsMastered",
      Error: error,
    };

    console.log(results);

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
      // To print as one whole object instead of array if the array length is 1
      results.length !== 1
        ? res.status(200).json(results)
        : res.status(200).json(results[0]);
    }
  };
  skillsMasteredModel.getAllMasteredSkills(callback);
};

// Endpoint: POST /skills_mastered/

// Retrieve required_points from Skills
module.exports.getRequiredLevel = (req, res, next) => {
  const { user_id, pet_id, skill_id } = req.body;
  const data = {
    user_id,
    pet_id,
    skill_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getRequiredLevel",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.skillsObject = results[0]; // store all skill infos in res.locals to include in the receipt after exchange
      res.locals.required_level = results[0].required_level; // store required_level of skill for pet in res.locals

      // Log out to terminal for easier debugging in-between functions
      console.log("Skills Object:", res.locals.skillsObject);
      next();
    }
  };
  skillsMasteredModel.getLevel(data, callback);
};

// Check Current Level of Pet from PetBonds table
module.exports.checkPetCurrLevel = (req, res, next) => {
  const { user_id, pet_id, skill_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
    skill_id: parseInt(skill_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkPetCurrLevel",
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

    // Pass on to the next function
    else {
      res.locals.current_level = results[0].current_level; // store current_level of pet in res.locals

      // Log out to the terminal for easier debugging in-between functions
      console.log("checkPetCurrLevel", res.locals.current_level);
      next();
    }
  };
  skillsMasteredModel.checkPetLevel(data, callback);
};

// Check If Same Skill Has Been Learnt By Pet from SkillsMasterd Table
module.exports.uniqueLearntSkillByPet = (req, res, next) => {
  const { user_id, pet_id, skill_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
    skill_id: parseInt(skill_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "uniqueLearntSkillByPet",
      Error: error,
    };

    // Check if pet has already learnt the skill provided
    const findSkill = results.find(
      (skill) => skill.learnt_skill_id === data.skill_id
    );

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 406
    else if (findSkill !== undefined) {
      res.status(406).json({
        message: "Skill is already learnt by pet",
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to the terminal for easier debugging in-between functions
      console.log("uniqueLearntSkillByPet", results);
      next();
    }
  };
  skillsMasteredModel.uniqueLearntSkill(data, callback);
};

// Check All Skills Learnt By Pet
module.exports.checkAllLearntSkills = (req, res, next) => {
  const { user_id, pet_id, skill_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
    skill_id: parseInt(skill_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkAllLearntSkills",
      Error: error,
    };

    // Check if pet has already learnt the skill provided
    const findSkill = results.find(
      (skill) => skill.learnt_skill_id === data.skill_id
    );

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
      return;
    }

    // Status 400
    else if (!skill_id) {
      res.status(400).json({
        message: "Missing Required Data",
      });
      return;
    }

    // Status 406
    else if (findSkill === undefined) {
      res.status(406).json({
        message: "Provided skill has yet to be learnt by pet",
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to terminal for easier debuggin in-between functions
      console.log("checkAllLearntSkills", results);
      next();
    }
  };
  skillsMasteredModel.checkLearntSkill(data, callback);
};

// Post skill into SkillMastered table with user_id, pet_id and skill_id
module.exports.learnSkill = (req, res, next) => {
  const { user_id, pet_id, skill_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
    skill_id: parseInt(skill_id),
  };

  // Status 406
  // Check pet's level to learn skill
  if (res.locals.current_level < res.locals.skillsObject.required_level) {
    // if the current pet level's less than that of required_level
    res.status(406).json({
      // sends message to indicate pet is not ready to learn skill
      message: "Skill Locked",
      required_level: res.locals.skillsObject.required_level,
      current_level: res.locals.current_level,
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "learnSkill",
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

    // Status 201
    else {
      // Store user_id, and skill info to let user know skill is learnt successfully.
      const receipt = { ...res.locals.user_id, ...res.locals.skillsObject };
      console.log(receipt);

      const message = {
        // message upon successful exchange
        Message: "Skill Learnt Successfully",
      };
      res.status(201).json({ ...message, ...receipt }); // sends response to user back
    }
  };
  skillsMasteredModel.insertSkill(data, callback);
};

// DELETE mastered skills row(s) based on user and pet id
module.exports.deleteSkillMasteredByUserPetId = (req, res, next) => {
  const { user_id, pet_id } = req.params;
  const data = {
    user_id,
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deleteSkillMasteredByUserPetId",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        message: "Internal Server Error",
      });
      return;
    }

    // Status 204
    else {
      console.log("deleteSkillMasteredByUserPetId ", results);
      next();
    }
  };
  skillsMasteredModel.deleteMasteredSkill(data, callback);
};
