const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');
require('dotenv').config();

// Configuration
const secret = process.env.JWT_SECRET || 'mysupersecretkey123!@';
const expiration = '2h';

// Token verification options
const tokenVerifyOptions = {
  maxAge: expiration,
  algorithms: ['HS256']
};

module.exports = {
  /**
   * Authentication middleware for GraphQL context
   * @param {Object} param0 - Contains the request object
   * @returns {Object} Modified request object with user data if authenticated
   */
  authMiddleware: function({ req }) {
    // Get token from various possible locations
    let token = req.headers.authorization || 
                req.headers['x-access-token'] || 
                req.query.token || 
                '';

    // Format token by removing 'Bearer' if present
    if (token) {
      if (token.toLowerCase().startsWith('bearer ')) {
        token = token.slice(7).trim();
      } else {
        token = token.trim();
      }
    }

    if (!token) {
      // No token present, return unmodified request
      return req;
    }

    try {
      // Verify token with specific options
      const { data } = jwt.verify(token, secret, tokenVerifyOptions);

      // Validate user data structure
      if (!data || !data.username || !data.email || !data._id) {
        console.error('Invalid token payload structure');
        throw new AuthenticationError('Invalid token structure');
      }

      // Add decoded user data to request
      req.user = data;
      req.token = token; // Store token for possible refresh logic
      
      console.log('Authentication successful for user:', data.username);

    } catch (error) {
      console.error('Authentication error:', {
        message: error.message,
        name: error.name,
        expiredAt: error.expiredAt,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });

      // Handle specific JWT errors
      if (error.name === 'TokenExpiredError') {
        req.authError = 'Token has expired';
      } else if (error.name === 'JsonWebTokenError') {
        req.authError = 'Invalid token';
      } else {
        req.authError = 'Authentication failed';
      }
    }

    return req;
  },

  /**
   * Generate a signed JWT token for a user
   * @param {Object} param0 - User data including username, email, and _id
   * @returns {String} Signed JWT token
   * @throws {Error} If token signing fails or if required fields are missing
   */
  signToken: function({ username, email, _id }) {
    console.log('\n=== TOKEN GENERATION STARTED ===');
    console.log('Received data for token generation:', { username, email, _id });

    // Validate input
    if (!username || typeof username !== 'string') {
      console.log('❌ Invalid username for token generation');
      throw new Error('Valid username is required for token generation');
    }
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      console.log('❌ Invalid email for token generation');
      throw new Error('Valid email is required for token generation');
    }
    if (!_id) {
      console.log('❌ Invalid _id for token generation');
      throw new Error('Valid user ID is required for token generation');
    }

    // Create payload with sanitized data
    const payload = {
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      _id: _id.toString()
    };
    console.log('Sanitized payload:', payload);

    try {
      console.log('Attempting to sign token with secret:', secret ? '✅ Secret exists' : '❌ No secret');
      
      // Sign token with specific options
      const token = jwt.sign(
        { data: payload },
        secret,
        { 
          expiresIn: expiration,
          algorithm: 'HS256'
        }
      );

      if (!token) {
        console.log('❌ Token generation returned empty result');
        throw new Error('Token generation returned empty result');
      }

      console.log('✅ Token generated successfully');
      console.log('=== TOKEN GENERATION COMPLETE ===\n');
      return token;

    } catch (error) {
      console.error('\n=== TOKEN GENERATION ERROR ===');
      console.error('Token signing error:', {
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      });
      
      throw new Error(
        process.env.NODE_ENV === 'development' 
          ? `Failed to generate authentication token: ${error.message}`
          : 'Failed to generate authentication token'
      );
    }
  },

  /**
   * Decode a token without verification
   * Useful for debugging or getting token information
   * @param {String} token - JWT token to decode
   * @returns {Object} Decoded token payload
   */
  decodeToken: function(token) {
    try {
      return jwt.decode(token, { complete: true });
    } catch (error) {
      console.error('Token decode error:', error);
      return null;
    }
  },

  /**
   * Verify a token and return decoded data
   * @param {String} token - JWT token to verify
   * @returns {Object} Decoded token data
   * @throws {Error} If token is invalid or expired
   */
  verifyToken: function(token) {
    try {
      return jwt.verify(token, secret, tokenVerifyOptions);
    } catch (error) {
      console.error('Token verification error:', error);
      throw new AuthenticationError(
        error.name === 'TokenExpiredError' 
          ? 'Token has expired' 
          : 'Invalid token'
      );
    }
  }
};