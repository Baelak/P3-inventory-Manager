const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false); // Add this line to handle the deprecation warning

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/kiminventoryDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('🌿 MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

// Call the connect function
connectDB();

// Export the mongoose connection
module.exports = mongoose.connection;