const pool = require("../services/db");

// Universal inventory_id Validation Model
module.exports.getAllMessagesModel = (callback) => {
  const MYSQLSTATEMENT = `
  SELECT Messages.message_id, Messages.message, Messages.sent_time, 
  User.username, User.profile_pic, User.user_id
  FROM Messages
  LEFT JOIN User ON Messages.user_id = User.user_id;
  `;
  pool.query(MYSQLSTATEMENT, callback);
};

// Insert a new message
module.exports.insertMessageModel = (data, callback) => {
  const MYSQLSTATEMENT = `
  INSERT INTO Messages (user_id, message, sent_time)
  VALUES (?, ?, NOW());
  `;

  const VALUES = [data.user_id, data.message];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Update a message
module.exports.updateMessageModel = (data, callback) => {
  const MYSQLSTATEMENT = `
  UPDATE Messages
  SET message = ?
  WHERE message_id = ?;
  `;

  const VALUES = [data.message, data.message_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
};

// Delete a message
module.exports.deleteMessageModel = (data, callback) => {
  const MYSQLSTATEMENT = `
  DELETE FROM Messages
  WHERE message_id = ?;
  ALTER TABLE Messages AUTO_INCREMENT = 1;
  `;

  const VALUES = [data.message_id];
  pool.query(MYSQLSTATEMENT, VALUES, callback);
}
