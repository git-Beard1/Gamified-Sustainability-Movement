// Require the database configuration from db.js
const pool = require("../services/db");

// Retrieve database name from .env
const database = pool.config.connectionConfig.database;

// Set database to null to create the database
pool.config.connectionConfig.database = null;

const CHECK_DB_SQL = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '${database}'`;
const CREATE_DB_SQL = `CREATE DATABASE IF NOT EXISTS ${database}`;

// Check if database exists
pool.query(CHECK_DB_SQL, (error, results) => {
  // Error log message during database check
  if (error) {
    console.error("Error checking database:", error);
    connection.release();
    return;
  }

  // Log results message for database check
  console.log("Results:", results);

  // If database does not exist, create it
  if (results.length === 0) {
    // Inform user that database does not exist
    console.log(`Database "${database}" does not exists`);
    // Execute the SQL query to create the database
    pool.query(CREATE_DB_SQL, (error, results) => {
      // Error log message during database creation
      if (error) {
        console.error("Error creating database:", error);
      }
      // Log results message for database creation
      else {
        console.log(`Database "${database}" has been created successfully`);
      }
      // Exits the process
      process.exit();
    });
  }

  // If database exists, inform user
  else {
    // Logs message for database already exists
    console.log(`Database "${database}" already exists`);
    // Exits the process
    process.exit();
  }
});
