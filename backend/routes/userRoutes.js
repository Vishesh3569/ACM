const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Register a new user
router.post('/register', registerUser);

// Authenticate user
router.post('/login', authUser);

module.exports = router;
