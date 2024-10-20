const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Protect routes
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token

      

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      req.user = await User.findById(decoded.id).select('-password'); // Attach user to req

      

      next();
    } catch (error) {
      console.error('Error during authentication:', error); // Log the error
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    console.log('No token found'); // Log if no token is found
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Only allow admin users
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin };
