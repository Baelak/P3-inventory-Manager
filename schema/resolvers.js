const { AuthenticationError, UserInputError } = require("apollo-server-express");
const User = require("../models/User");
const InventoryItem = require("../models/InventoryItem");
const { signToken } = require("../utils/auth");

console.log("Loading resolvers module");

const resolvers = {
  Query: {
    getInventoryItems: async (parent, args, context) => {
      // Check if user is logged in
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }
      // Only return items for logged-in user
      return InventoryItem.find({ userId: context.user._id });
    },
  },

  Mutation: {
    register: async (parent, args, context) => {
      console.log("\n=== Registration Started ===");
      console.log("Registration args:", args);

      try {
        const { username, email, password } = args;

        if (!username || !email || !password) {
          throw new UserInputError("All fields are required");
        }

        let user;
        try {
          user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password,
          });
          console.log("User created:", user._id);
        } catch (err) {
          console.error("User creation error:", err);
          throw new Error(`User creation failed: ${err.message}`);
        }

        let token;
        try {
          token = signToken({
            _id: user._id,
            username: user.username,
            email: user.email,
          });
          console.log("Token generated:", !!token);
        } catch (err) {
          console.error("Token generation error:", err);
          throw new Error(`Token generation failed: ${err.message}`);
        }

        const response = {
          token,
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
          },
        };

        console.log("Registration successful, returning:", response);
        return response;
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addInventoryItem: async (parent, { name, quantity, price }, context) => {
      // Check if user is logged in
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      console.log("\n=== Add Inventory Started ===");
      console.log("Add Inventory args:", name, quantity, price);

      try {
        if (!name || !quantity || !price) {
          throw new UserInputError("All fields are required");
        }

        let inventory;
        try {
          inventory = await InventoryItem.create({
            name: name.toLowerCase(),
            quantity: parseInt(quantity, 10),
            price,
            userId: context.user._id // Add user reference
          });
          console.log("Inventory created:", inventory._id);
        } catch (err) {
          console.error("Inventory creation error:", err);
          throw new Error(`Inventory creation failed: ${err.message}`);
        }

        const response = {
          _id: inventory._id,
          name: inventory.name,
          quantity: inventory.quantity,
          price: inventory.price,
          userId: inventory.userId
        };

        console.log("Inventory Creation Successful, returning:", response);
        return response;
      } catch (error) {
        console.error("Inventory Creation error:", error);
        throw error;
      }
    },

    deleteInventoryItem: async (parent, { id }, context) => {
      // Check if user is logged in
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in!');
      }

      console.log('Attempting to delete inventory item:', id);
      try {
        // Only delete if item belongs to user
        const deletedItem = await InventoryItem.findOneAndDelete({
          _id: id,
          userId: context.user._id
        });

        if (!deletedItem) {
          throw new Error('Item not found or you are not authorized to delete it');
        }

        console.log('Item deleted successfully:', id);
        return true;
      } catch (error) {
        console.error('Delete error:', error);
        throw new Error(error.message);
      }
    },
  },
};

console.log("Resolvers loaded:", !!resolvers);

module.exports = resolvers;