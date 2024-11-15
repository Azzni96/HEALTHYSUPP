const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already exists' });

    const newUser = await User.create({ username, email, phone, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Your authentication logic here
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // If successful, return user data or token
    res.status(200).json({ message: 'Sign-in successful', user });
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
