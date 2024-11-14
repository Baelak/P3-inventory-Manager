// File: models/InventoryItem.js

const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

// Add model initialization log
console.log("InventoryItem model initialized");

module.exports = InventoryItem;
