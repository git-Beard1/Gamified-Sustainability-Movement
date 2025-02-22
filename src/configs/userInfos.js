// Require bcrypt package
const bcrypt = require("bcrypt");

// Set salt rounds
const saltRounds = 10;

// User information
const userInfos = [
  {
    username: "AdminUser",
    email: "systemAdmin@ecoquest.org",
    password: "$admin$User123#",
    profile_pic: "WindSpiritAvatar.JPEG",
  },
  {
    username: "T'Challa",
    email: "tchalla@ecoquest.org",
    password: "*black^&Panther#?"
  },
  {
    username: "Tony Stark",
    email: "tony@ecoquest.org",
    password: "i@mIronMan!"
  },
  {
    username: "Peter Parker",
    email: "peter@ecoquest.org",
    password: "%ne!ghborhood$Spiderman$"
  },
  {
    username: "Steve Rogers",
    email: "steve@ecoquest.org",
    password: "@mErica's^HieLd!!"
  },
];

// Loop through the userInfos array and hash each respective password
for (const user of userInfos) {
  bcrypt.hash(user.password, saltRounds, (error, hash) => {
    // Error log message during hash password
    if (error) {
      console.error(`Bcrypt Error: ${error}`);
    }
    // Log the hash password and store inside hashedPasswords array
    else {
      user.password = hash;
    }
  });
};

module.exports = {
    userInfos
}