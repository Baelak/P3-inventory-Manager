// File: Main/schema/resolvers.js

const { AuthenticationError } = require('apollo-server-express');
const User = require('../models/User');
const InventoryItem = require('../models/InventoryItem');
const jwt = require('jsonwebtoken');

const resolvers = {
  Query: {
    getInventoryItems: async () => {
      return await InventoryItem.find({});
    },
  },
  Mutation: {
    addInventoryItem: async (parent, args, context) => {
      if (context.user) {
        const item = await InventoryItem.create(args);
        return item;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    register: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, ...user._doc };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Invalid credentials');
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token, ...user._doc };
    },
  },
};

module.exports = resolvers;
