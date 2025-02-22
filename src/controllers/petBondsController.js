/*
    Name: Thiha Swan Htet
    Admin No: 2336671
    Class: DIT/FT/1B/08

    File Name: petBondsController.js

    Last Modified: 21/01/2023
*/

// Advanced Feature Section B: PetBonds

const petBondsModel = require("../models/petBondsModel");

// Universal bond_id Validation Controller (for params)
module.exports.checkBondValidationParams = (req, res, next) => {
  const { bond_id } = req.params;
  const data = {
    bond_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkBondValidationParams",
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
    // Checks bond_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid bond_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.bond_id = results[0]; // store bond_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkBondValidationParams", res.locals.bond_id);
      next();
    }
  };
  petBondsModel.checkBond(data, callback);
};

// Universal bond_id Validation Controller (for body)
module.exports.checkBondValidationBody = (req, res, next) => {
  const { bond_id } = req.body;
  const data = {
    bond_id: parseInt(bond_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkBondValidationBody",
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
    // Checks bond_id validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Invalid bond_id",
      });
      return;
    }

    // Pass on to the next function
    else {
      res.locals.bond_id = results[0]; // store bond_id into res.locals

      // Log out results to determine errors in-between functions
      console.log("checkBondValidationBody", res.locals.bond_id);
      next();
    }
  };
  petBondsModel.checkBond(data, callback);
};

// Universal User Pet Ownership Validation Controller (for params)
module.exports.checkUserPetOwnershipParams = (req, res, next) => {
  const { user_id, pet_id } = req.params;
  const data = {
    user_id,
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserPetOwnershipParams",
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
    // Checks User Pet Ownership validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Pet does not belong to user",
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to the terminal for easier debugging in-between functions
      console.log("checkUserPetOwnershipParams", results);
      next();
    }
  };
  petBondsModel.checkPetUserRS(data, callback);
};

// Universal User Pet Ownership Validation Controller (for body)
module.exports.checkUserPetOwnershipBody = (req, res, next) => {
  const { user_id, pet_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "checkUserPetOwnershipBody",
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
    // Checks User Pet Ownership validation
    else if (results.length === 0) {
      res.status(404).json({
        message: "Pet does not belong to user",
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to the terminal for easier debugging in-between functions
      console.log("checkUserPetOwnershipBody", results);
      next();
    }
  };
  petBondsModel.checkPetUserRS(data, callback);
};

// Check Unique Pet Ownership (User can only own one pet of same kind)
module.exports.uniquePetOwnership = (req, res, next) => {
  const { user_id, pet_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "uniquePetOwership",
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

    // Status 409
    // Checks User Pet Ownership validation
    else if (results.length !== 0) {
      res.status(409).json({
        message: "User can only exchange one pet of the same kind",
      });
      return;
    }

    // Pass on to the next function
    else {
      // Log out to the terminal for easier debugging in-between functions
      console.log("uniquePetOwnership", results);
      next();
    }
  };
  petBondsModel.checkPetUserRS(data, callback);
};

// Endpoint: GET /pet_bonds/{user_id}
// Retrieve user info and all pet attributes by user_id
module.exports.selectBondByUserId = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectBondByUserId",
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
        message: `User has not adopted any pets`,
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
          result.equipped_skill_id = "Unequipped";
          result.equipped_skill_name = "Unequipped";
        }
      });

      // Send results back to user
      res.status(200).json(results);
    }
  };
  petBondsModel.getPetBondById(data, callback);
};

// Retrieve total number of pets owned by user_id
module.exports.selectTotalPetsOwnedByUserId = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectTotalPetsOwnedByUserId",
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
        message: `User ${data.user_id} has not adopted any pets`,
      });
      return;
    }

    // Status 200
    else {
      // store total number of pets owned by user_id in res.locals
      res.locals.total_pets_owned = results[0].total_pets_owned;
      next();
    }
  };
  petBondsModel.getPetCountById(data, callback);
};

// Endpoint: GET /pet_bonds/
// Retrieve all info from PetBonds
module.exports.readAllPetBonds = (req, res, next) => {
  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "readAllPetBonds",
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
  petBondsModel.getAllPetBonds(callback);
};

// Endpoint: POST /pet_bonds/

// Retrieve total points of pets user have
module.exports.totalPointsPurchasedPetsParams = (req, res, next) => {
  const { user_id } = req.params;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "totalPointsPurchasedPetsParams",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Pass on the total points of user to the next
    else {
      results[0].total_points_exchanged === null
        ? (results[0].total_points_exchanged = 0)
        : (results[0].total_points_exchanged = parseInt(
            results[0].total_points_exchanged
          ));

      res.locals.totalPetPoints = results[0].total_points_exchanged;

      // Log out results to determine errors in-between middlewares
      console.log("Total Pets Exchanged Points", results[0]);
      next();
    }
  };
  petBondsModel.totalPurchasedPoints(data, callback);
};

module.exports.totalPointsPurchasedPetsBody = (req, res, next) => {
  const { user_id } = req.body;
  const data = {
    user_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "totalPointsPurchasedPetsBody",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Pass on the total points of user to the next
    else {
      results[0].total_points_exchanged === null
        ? (results[0].total_points_exchanged = 0)
        : (results[0].total_points_exchanged = parseInt(
            results[0].total_points_exchanged
          ));

      res.locals.totalPetPoints = results[0].total_points_exchanged;

      // Log out results to determine errors in-between middlewares
      console.log("Total Pets Exchanged Points", results[0]);
      next();
    }
  };
  petBondsModel.totalPurchasedPoints(data, callback);
};

// Retrieve required_points from Pets and the pet info
module.exports.getPetReceipt = (req, res, next) => {
  const { user_id, pet_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getPetReceipt",
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

    // Pass on to the next middleware
    else {
      // Store the cost of user's selected pet (points) in res.locals
      res.locals.pet_cost = parseInt(results[0].required_eco_points);
      // Store the user's selected item info in res.locals
      res.locals.pet_receipt = results[0];

      // Log out to terminal for easier debugging in-between functions
      console.log("Pet Receipt: ", results[0]);
      next();
    }
  };
  petBondsModel.getPetInfo(data, callback);
};

// Post pet into PetBonds table with user_id, pet_id
module.exports.exchangePet = (req, res, next) => {
  const { user_id, pet_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
  };

  const totalTaskPoints = res.locals.totalTaskPoints;
  const totalCost = res.locals.totalPetPoints + res.locals.totalItemPoints;
  // Find the new total amount by subtracting total cost (item + pet) from total points (task)
  const totalPoints = totalTaskPoints - totalCost;

  console.log(`User's Total Points (After Purchase): ${totalPoints}`);

  // Status 406
  // Check player's points to exchange pet
  if (totalPoints < res.locals.pet_cost) {
    // if the total points less than the required points to exchange pet,
    res.status(406).json({
      message: "Insufficient Points", // sends message to indicate insufficient points to exchange
    });
    return;
  }

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "exchangePet",
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
      // Store user_id, and pet info to let user know pet is exchanged successfully.
      const receipt = { ...res.locals.user_id, ...res.locals.pet_receipt };
      console.log(receipt);

      const pointsLeft = totalPoints - res.locals.pet_cost; // Store the points left after exchange

      // Message upon successful exchange
      const message = {
        message: "Pet Exchanged Successfully",
        points_left: pointsLeft,
      };

      // Sends response back to user
      res.status(201).json({ ...message, ...receipt }); // sends response to user back
    }
  };
  petBondsModel.insertPet(data, callback);
};

// Endpoint: PUT /pet_bonds/
// Update skill of pet
module.exports.updateEquippedSkillOfPet = (req, res, next) => {
  const { user_id, pet_id, skill_id } = req.body;
  const data = {
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
    skill_id: parseInt(skill_id),
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "updateEquippedSkillOfPet",
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
      const message = {
        message: "Skill Equipped Successfully",
      };
      res.status(200).json({ ...message, ...data });
    }
  };
  petBondsModel.updateSkill(data, callback);
};

// Endpoint: DELETE /pet_bonds/{bond_id}

// Acquire user and pet ids to be later deleted from SkillsMastered Table
module.exports.selectUserPetByBondId = (req, res, next) => {
  const { bond_id } = req.params;
  const data = {
    bond_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "selectUserPetByBondId",
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
      // Store in res.locals to be used in the next function
      res.locals.user_id = results[0].user_id;
      res.locals.pet_id = results[0].pet_id;

      // Log out to terminal for easier debugging in-between functions
      console.log("Select user_id from bond_id", res.locals.user_id);
      console.log("Select pet_id from bond_id", res.locals.pet_id);
      next();
    }
  };
  petBondsModel.selectUserPet(data, callback);
};

// Delete a row on PetBondsTable by bond_id
module.exports.deleteBondsById = (req, res, next) => {
  const { user_id, pet_id } = req.params;
  const data = {
    user_id,
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "deleteBondsById",
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

    // Status 404
    else {
      // If no changes, if bond_id is not found,
      if (results[0].affectedRows === 0) {
        // Sends an error message for invalid bond_id
        res.status(404).json({
          message: `User Does Not Own Selected Pet.`,
        });
        return;
      }

      // Pass on to the next function
      else {
        // Log out to the terminal to see updates
        console.log("deleteBondsById", results);
        next();
      }
    }
  };
  petBondsModel.deleteBonds(data, callback);
};

// Retrieve total exp obtained from tasks accomplished by pet
module.exports.getTotalExpOfPet = (req, res, next) => {
  const { pet_id } = req.body;
  const data = {
    pet_id,
  };

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "getTotalExpOfPet",
      Error: error,
    };

    // Status 500
    if (error) {
      console.log(errMessage);
      res.status(500).json({
        Error: "Internal Server Error",
      });
    }

    // Pass on the total exp of pet to the next function
    else {
      results[0].total_exp === null // if the total_exp doesn't exist, null,
        ? (results[0].total_exp = 0) // turn to zero
        : (results[0].total_exp = parseInt(results[0].total_exp)); // else, turn into integer.
      res.locals.total_exp = results[0].total_exp; // Pass on the total exp of pet to the next

      // Log out to terminal to ensure easier debuggin in-between functions
      console.log("Total_exp of pet", res.locals.total_exp);
      next();
    }
  };
  petBondsModel.getPetTotalExp(data, callback);
};

// Update Exp, Level, and Next Level Points in PetBonds Table After Completing Task in Pet Activities Table
module.exports.updatePetAttributes = (req, res, next) => {
  let level; // declare level as a variable
  const totalExp = res.locals.total_exp;
  const calLevel = Math.floor(totalExp / 100); // evaluate level. Pets level up after 100 exp.
  const exp = totalExp % 100; // leftover exp is the new exp
  const next_lv_points = 100 - exp; // exp needed to level up.

  calLevel === 0 ? (level = 1) : (level = calLevel + 1); // if calLevel is 0, change it to 1, else add 1

  const { user_id, pet_id } = req.body;
  const data = {
    exp,
    level,
    next_lv_points,
    user_id: parseInt(user_id),
    pet_id: parseInt(pet_id),
  };

  console.log(data);

  const callback = (error, results, fields) => {
    // Error Message to print out on terminal for debugging
    const errMessage = {
      function: "updatePetAttributes",
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

    // Pass on to the next middleware
    else {
      // Log out to terminal for easier debugging in-between functions
      res.status(200).json({
        message: "Pet Attributes Updated Successfully",
      });
    }
  };
  petBondsModel.updatePetExpLvNxtLvPts(data, callback);
};
