/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: skillsMasteredModel.js

    Last Modified: 22/01/2024
*/

// Advanced Feature Section B: SkillsMastered
const pool = require("../services/db");

// Endpoint: GET /pet_activities/{user_id}/{pet_id}
// Retrieve mastered skills by User's Pet
module.exports.selectMasteredSkillsOfUserPet = (data, callback) => {
  const MYSQLSTATMENT = `
      SELECT mastered_skill_id,
      user_id, SkillsMastered.pet_id, 
      Skills.skill_id, Skills.skill_name

      FROM SkillsMastered

      INNER JOIN Skills
      ON Skills.skill_id = SkillsMastered.skill_id

      WHERE user_id = ? AND SkillsMastered.pet_id = ?;
  `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATMENT, VALUES, callback);
};

// Endpoint: GET /skills_mastered/{user_id}/{pet_id}
// Retrieve all learnt skills by user and pet ids
module.exports.getAllMasteredSkills = (callback) => {
  const MYSQLSTATEMENT = `    
      SELECT mastered_skill_id, 
      User.user_id, Pets.pet_id,
      Skills.skill_id, Skills.skill_name
          
      FROM SkillsMastered
          
      LEFT JOIN User
      ON User.user_id = SkillsMastered.user_id
          
      LEFT JOIN Pets
      ON Pets.pet_id = SkillsMastered.pet_id
          
      LEFT JOIN Skills
      ON Skills.skill_id = SkillsMastered.skill_id;
      `;

  pool.query(MYSQLSTATEMENT, callback);
};

// Endpoint: POST /skills_mastered/
// Retrieve required_level and all infos from Skills
module.exports.getLevel = (data, callback) => {
  const MYSQLSTATEMENT = `      
      SELECT *
      FROM Skills
      WHERE pet_id = ? AND skill_id = ?;
      `;

  const VALUES = [data.pet_id, data.skill_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Check Current Level of Pet from PetBonds table
module.exports.checkPetLevel = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT level AS current_level
      FROM PetBonds
      WHERE user_id = ? AND pet_id = ?;
      `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Check If Same Skill Has Been Learnt By Pet from SkillsMasterd Table
module.exports.uniqueLearntSkill = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT skill_id as learnt_skill_id
      FROM SkillsMastered
      WHERE user_id = ? AND pet_id = ?;
      `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Check all learnt skill ids of pet
module.exports.checkLearntSkill = (data, callback) => {
  const MYSQLSTATEMENT = `
      SELECT skill_id as learnt_skill_id
      FROM SkillsMastered
      WHERE user_id = ? AND pet_id = ?;
      `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Post skill into SkillsMastered table with user_id, pet_id, skill_id
module.exports.insertSkill = (data, callback) => {
  const MYSQLSTATEMENT = `
      INSERT INTO SkillsMastered (user_id, pet_id, skill_id)
      Values(?, ?, ?);
      `;

  const VALUES = [data.user_id, data.pet_id, data.skill_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// DELETE mastered skills row(s) based on user and pet id
module.exports.deleteMasteredSkill = (data, callback) => {
  const MYSQLSTATEMENT = `
      DELETE FROM SkillsMastered
      WHERE user_id = ? AND pet_id = ?;
      ALTER TABLE SkillsMastered AUTO_INCREMENT = 1;
  `;

  const VALUES = [data.user_id, data.pet_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

