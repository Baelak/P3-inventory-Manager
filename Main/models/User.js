const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Add debug namespace for easier log filtering
const debug = require('debug')('app:user-model');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true,
    minlength: [3, 'Username must be at least 3 characters']
  },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret.password;  // Remove password from JSON responses
      return ret;
    }
  }
});

// Add detailed logging to password hashing
userSchema.pre('save', async function(next) {
  console.log('\n=== Password Hashing Process ===');
  
  if (this.isNew || this.isModified('password')) {
    console.log('Password needs hashing (new user or modified password)');
    
    try {
      // Generate salt and hash password
      const salt = await bcrypt.genSalt(10);
      console.log('Salt generated successfully');
      
      this.password = await bcrypt.hash(this.password, salt);
      console.log('Password hashed successfully');
      
    } catch (err) {
      console.error('⚠️ Password hashing error:', err);
      return next(err);
    }
  } else {
    console.log('Password unchanged - skipping hash');
  }
  
  next();
});

// Enhanced password comparison method
userSchema.methods.isCorrectPassword = async function(password) {
  console.log('\n=== Password Comparison ===');
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    console.log('Password comparison result:', isMatch ? 'Match' : 'No match');
    return isMatch;
  } catch (err) {
    console.error('⚠️ Password comparison error:', err);
    throw new Error('Password comparison failed');
  }
};

const User = mongoose.model('User', userSchema);

// Add model initialization log
console.log('User model initialized');

module.exports = User;