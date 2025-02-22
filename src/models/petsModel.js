/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: petsModel.js

    Last Modified: 21/01/2024
*/

// Advanced Feature Section B: Pets

const pool = require("../services/db");

// Universal pet_id Validation Model
module.exports.checkPet = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT pet_id FROM Pets
      WHERE pet_id = ?
      `;

  const VALUES = [data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint: GET pets/{pet_id}
module.exports.selectById = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT 
      Pets.pet_id, Pets.pet_name, Pets.description, Pets.required_eco_points, Pets.rarity, Pets.picture, 
      Skills.skill_id, Skills.skill_name, Skills.skill_type, Skills.required_level

      FROM Pets

      INNER JOIN Skills
      ON Pets.pet_id = Skills.pet_id
      WHERE Pets.pet_id = ?;
      `;

  const VALUES = [data.pet_id];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};

// Endpoint: GET pets/
module.exports.readPets = (callback) => {
  const MYSQLSTATEMENT = `
      SELECT * FROM Pets;
      `;

  pool.query(MYSQLSTATEMENT, callback);
};
