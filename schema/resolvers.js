const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const User = require("../models/User");
const InventoryItem = require("../models/InventoryItem");
const { signToken } = require("../utils/auth");

console.log("Loading resolvers module");

const resolvers = {
  Query: {
    // Keep your existing queries
    getInventoryItems: async () => {
      return InventoryItem.find();
    },
  },

  Mutation: {
    register: async (parent, args, context) => {
      console.log("\n=== Registration Started ===");
      console.log("Registration args:", args);

      try {
        const { username, email, password } = args;

        // Basic validation
        if (!username || !email || !password) {
          throw new UserInputError("All fields are required");
        }

        // Create user - with explicit error catching
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

        // Generate token - with explicit error catching
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

        // Construct and verify response
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
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    addInventoryItem: async (parent, { name, quantity, price }, context) => {
      console.log("\n=== Add Inventory Started ===");
      console.log("Add Inventory args:", name, quantity, price);

      try {
        // Basic validation
        if (!name || !quantity || !price) {
          throw new UserInputError("All fields are required");
        }

        // Create inventory - with explicit error catching
        let inventory;
        try {
          inventory = await InventoryItem.create({
            name: name.toLowerCase(),
            quantity: parseInt(quantity, 10),
            price,
          });
          console.log("Inventory created:", inventory._id);
        } catch (err) {
          console.error("Inventory creation error:", err);
          throw new Error(`Inventory creation failed: ${err.message}`);
        }

        // Construct and verify response
        const response = {
          _id: inventory._id,
          name: inventory.name,
          quantity: inventory.quantity,
          price: inventory.price,
        };

        console.log("Inventory Creation Successful, returning:", response);
        return response;
      } catch (error) {
        console.error("Inventory Creation error:", error);
        throw error;
      }
    },
  },
};

// Add immediate debugging
console.log("Resolvers loaded:", !!resolvers);

module.exports = resolvers; // Export directly without curly braces
