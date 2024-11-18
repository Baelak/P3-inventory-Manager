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
  // Add user reference
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema);

console.log("InventoryItem model initialized");

module.exports = InventoryItem;