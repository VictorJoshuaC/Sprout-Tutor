const jwt = require('jsonwebtoken');  // Import the jsonwebtoken library for JWT verification
const User = require('../models/User');  // Import the User model
const UnauthenticatedError = require('../errors/unauthenticated');  // Import the UnauthenticatedError

const auth = (req, res, next) => {
  // Middleware function for authentication
  const authHeader = req.headers.authorization;  // Get the value of the 'Authorization' header from the request

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    // Check if the 'Authorization' header is missing or does not start with 'Bearer'
    throw new UnauthenticatedError('Authentication invalid 1');  // Throw an error indicating invalid authentication
  }

  const token = authHeader.split(' ')[1];  // Extract the JWT from the 'Authorization' header

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);  // Verify the JWT using the secret key

    // attaching the user to the job routes
    req.user = { userId: payload.userId, name: payload.name };  // Extract the user ID and name from the JWT payload and attach it to the request object
    next();  // Call the next middleware or route handler
  } catch (error) {
    throw new UnauthenticatedError('Authentication invalid 2');  // Throw an error indicating invalid authentication
  }
};

module.exports = auth;  // Export the auth middleware function to be used in other files
