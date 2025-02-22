/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: petActivitiesModel.js

    Last Modified: 22/01/2024
*/

// Advanced Feature Section B: PetActivities
const pool = require("../services/db");

// Endpoint: GET /pet_activities/{user_id}/{pet_id}
// Retrieve activities(tasks completed) by User's Pet
module.exports.selectActivityOfUserPet = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT activity_id,
      user_id, pet_id, 
      Task.task_id, Task.title,
      DATE(completion_date) AS completion_date

      FROM PetActivities

      INNER JOIN Task
      ON Task.task_id = PetActivities.task_id

      WHERE user_id = ? AND pet_id = ?;
  `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};

// Endpoint: GET /pet_activities/
// Retrieve all pet activities
module.exports.getAllPetActivities = (callback) => {
  const MYSQLSTATEMENT = `    
          SELECT 
          activity_id, user_id,
          pet_id, task_id, 
          DATE(completion_date) AS completion_date
          FROM PetActivities
          `;

  pool.query(MYSQLSTATEMENT, callback);
};

// Post user_id, pet_id, task_id, completion_date into PetActivities Table
module.exports.createActivity = (data, callback) => {
  const MYSQLSTATEMENT = `
      INSERT INTO PetActivities (user_id, pet_id, task_id, completion_date)
      VALUES (?, ?, ?, NOW());
      `;

  const VALUES = [data.user_id, data.pet_id, data.task_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};
