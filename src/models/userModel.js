/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: userModel.js

    Last Modified: 22/01/2024
*/

// Section A: User

const pool = require("../services/db");

// Universal user_id Validation Model
module.exports.checkUser = (data, callback) => {
  const MYSQLSTATEMENT = `
        SELECT user_id FROM User
        WHERE user_id = ?;
        `;

  const VALUES = [data.user_id];
  console.log(VALUES);
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Retrieve user_id and password for login by username
module.exports.checkUserIDPassword = (data, callback) => {
  const MYSQLSTATEMENT = `
        SELECT user_id, password FROM User
        WHERE username = ?;
        `;

  const VALUES = [data.username];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Update Last login time
module.exports.updateLastLogin = (data, callback) => {
  const MYSQLSTATEMENT = `
        UPDATE User
        SET last_login_on = NOW()
        WHERE user_id = ?;
        `;
  const VALUES = [data.user_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 1 POST /users Model
// Check if username and email are already associated with another user
module.exports.getUserNameEmail = (data, callback) => {
  const MYSQLSTATEMENT = `
    SELECT username, email 
    FROM User
    WHERE username = ? OR email = ?;
    `;

  const VALUES = [data.username, data.email];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Register User Into Database
module.exports.insertUser = (data, callback) => {
  const MYSQLSTATEMENT = `
        INSERT INTO User (username, email, password)
        VALUES(?, ?, ?);
        `;

  const VALUES = [data.username, data.email, data.password];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 2 GET /users Model
module.exports.readUser = (callback) => {
  const MYSQLSTATEMENT = `
        SELECT * FROM User;
        `;

  pool.query(MYSQLSTATEMENT, callback);
};

// Endpoint 3 GET /users/{user_id} Model
module.exports.getUserTotalPoints = (data, callback) => {
  const MYSQLSTATEMENT = `
        SELECT 
        SUM(Task.points) AS 'total_points'

        FROM User

        LEFT JOIN TaskProgress
        ON User.user_id = TaskProgress.user_id
        LEFT JOIN Task
        ON Task.task_id = TaskProgress.task_id

        WHERE User.user_id = ?;
    `;

  const VALUES = [data.user_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 3 GET /users/{user_id} Model
module.exports.getUser = (data, callback) => {
  const MYSQLSTATEMENT = `
            SELECT *
            FROM User
            WHERE user_id = ?;
            `;

  const VALUES = [data.user_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 4 PUT /users/{user_id} Model
module.exports.updateUser = (data, callback) => {
  const MYSQLSTATEMENT = `
        UPDATE User 
        SET username = ?, email = ?
        WHERE user_id = ?;
        `;

  const VALUES = [data.username, data.email, data.user_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint 5 DELETE /users/{user_id} Model
module.exports.deleteUser = (data, callback) => {
  const MYSQLSTATEMENT = `
        DELETE FROM User
        WHERE user_id = ?;
        ALTER TABLE User AUTO_INCREMENT = 1;
        `;

  const VALUES = [data.user_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};
