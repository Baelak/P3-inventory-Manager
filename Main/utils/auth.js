// File: utils/auth.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

module.exports.authMiddleware = function ({ req }) {
  let token = req.headers.authorization || '';

  if (token) {
    token = token.split(' ').pop().trim();
    try {
      const { data } = jwt.verify(token, secret);
      req.user = data;
    } catch {
      console.log('Invalid token');
    }
  }

  return req;
};
