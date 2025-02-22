/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: petActivitiesController.js

    Last Modified: 21/01/2023
*/

// Advanced Feature Section B: PetActivities

const petActivitiesModel = require("../models/petActivitiesModel");

// Endpoint: GET /pet_activities/{user_id}/{pet_id}
// Retrieve activities(tasks completed) by User's Pet
module.exports.selectPetActivitiesByUserPetId = (req, res, next) => {
  const { user_id, pet_id } = req.params;
  const data = {
    user_id,
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectPetActivitiesByUserPetId",
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
  petActivitiesModel.selectActivityOfUserPet(data, callback);
};

// Endpoint: GET /pet_activities/
module.exports.readAllPetActivities = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "readAllPetActivities",
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
      // Change "null" to "Skill Unequipped" for better readability
      results.forEach((result) => {
        if (
          result.equipped_skill_id === null &&
          result.equipped_skill_name === null
        ) {
          result.equipped_skill_id = "Skill Unequipped";
          result.equipped_skill_name = "Skill Unequipped";
        }
      });

      // To print as one whole object instead of array if the array length is 1
      results.length !== 1
        ? res.status(200).json(results)
        : res.status(200).json(results[0]);
    }
  };
  petActivitiesModel.getAllPetActivities(callback);
};

// Post user_id, pet_id, task_id, completion_date into PetActivities Table
module.exports.createPetActivities = (req, res, next) => {
  const { user_id, pet_id, task_id } = req.body;
  const data = {
    activity_id: null,
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
    task_id: parseInt(task_id),
  };

  // Status 400
  if ((!user_id, !pet_id, !task_id)) {
    res.status(400).json({
      message: "Missing Required Data",
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "createPetActivities",
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
      data.activity_id = results.insertId;
      const message = {
        exp_obtained: res.locals.exp_obtained,
      };
      res.status(201).json({ ...data, ...message }); // sends a response back to user
    }
  };
  petActivitiesModel.createActivity(data, callback);
};

