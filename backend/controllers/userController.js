const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Function to register a new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if all fields are provided
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide all fields' });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,  // Password saved as plain text for simplicity (not recommended in production)
    });

    // Save the user in the database
    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with user data and token
    res.status(201).json({
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Function to authenticate (login) a user
const authUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if all fields are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });

    // Check if password matches (no hashing used here)
    if (user && user.password === password) {
      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send user data and token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  registerUser,
  authUser
};
