const User = require("../models/user");

const userData = [
  {
    username: "John",
    email: "john@email.com",
    password: "password",
  },
  {
    username: "Mark",
    email: "mark@email.com",
    password: "password1",
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
