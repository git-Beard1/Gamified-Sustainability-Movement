/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: taskProgressModel.js

    Last Modified: 22/01/2024
*/

// Section A: TaskProgress

const pool = require("../services/db");

// Universal progress_id Validation Model
module.exports.checkProgress = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT progress_id FROM TaskProgress
      WHERE progress_id = ?
  `;

  const VALUES = [data.progress_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Count the number of tasks completed by a user
module.exports.getNumOfTasks = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT COUNT(user_id) AS task_count FROM TaskProgress
      WHERE user_id = ?;
  `;

  const VALUES = [data.user_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 11: POST /task_progress
module.exports.createTaskProgress = (data, callback) => {
  const MYSQLSTATEMENT = `
    INSERT INTO TaskProgress (user_id, pet_id, task_id, completion_date, notes)
    VALUES (?, ?, ?, ?, ?);
    `;

  const VALUES = [
    data.user_id,
    data.pet_id,
    data.task_id,
    data.completion_date,
    data.notes,
  ];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 12: GET /task_progress/{user_id}
module.exports.selectTaskProgress = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT 
      TaskProgress.progress_id, TaskProgress.user_id, Pets.pet_name, 
      TaskProgress.task_id, TaskProgress.completion_date,
      TaskProgress.notes,
      Task.title, Task.description, Task.picture,
      Task.points
      FROM TaskProgress

      LEFT JOIN TASK 
      ON TaskProgress.task_id = Task.task_id
      LEFT JOIN User
      ON User.user_id = TaskProgress.user_id
      LEFT JOIN Pets
      ON Pets.pet_id = TaskProgress.pet_id
      WHERE TaskProgress.user_id = ?;
      `;

  const VALUES = [data.user_id];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};

// Endpoint 13: PUT /task_progress/{progress_id}
module.exports.updateTaskProgress = (data, callback) => {
  const MYSQLSTATEMENT = `
      UPDATE TaskProgress
      SET notes = ?
      WHERE progress_id = ?;
      `;

  const VALUES = [data.notes, data.progress_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 14: DELETE/task_progress/{progress_id}
module.exports.deleteTaskProgress = (data, callback) => {
  const MYSQLSTATEMENT = `
      DELETE FROM TaskProgress
      WHERE progress_id = ?;
      ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
      `;

  const VALUES = [data.progress_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// DELETE pet activities row(s) based on user and pet id
module.exports.deletePetActivities = (data, callback) => {
  const MYSQLSTATEMENT = `
      DELETE FROM TaskProgress
      WHERE user_id = ? AND pet_id = ?;
      ALTER TABLE TaskProgress AUTO_INCREMENT = 1;
  `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};
