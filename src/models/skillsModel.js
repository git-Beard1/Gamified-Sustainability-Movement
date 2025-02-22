/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: skillsModel.js

    Last Modified: 22/01/2024
*/

// Advanced Feature Section B: Skills

const pool = require("../services/db");

// Universal skill_id Validation Model
module.exports.checkSkill = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT skill_id FROM Skills
      WHERE skill_id = ?
      `;

  const VALUES = [data.skill_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Universal Model to Check Skill Belongs to Pet validation
module.exports.checkPetSkillRS = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT skill_id, pet_id 
      FROM Skills
      WHERE skill_id = ? AND pet_id = ?;
      `;

  const VALUES = [data.skill_id, data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Endpoint: GET /skills
module.exports.readSkill = (callback) => {
  const MYSQLSTATEMENT = `
      SELECT * FROM Skills;
      `;

  pool.query(MYSQLSTATEMENT, callback);
};

// Endpoint: GET /skills/{pet_id}
// Retrieve skills by pet_id in skills
module.exports.selectSkillPetId = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT * FROM Skills
      WHERE pet_id = ?;
      `;

  const VALUES = [data.pet_id];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};
