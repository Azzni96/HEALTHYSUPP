const express = require('express');
const router = express.Router();
const { Op } = require('sequelize'); // Import Op from Sequelize
const User = require('../models/User');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// Forgot password route
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.expireToken = Date.now() + 3600000; // 1 hour expiration
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Password reset',
      html: `
        <p>You requested a password reset</p>
        <h5>Click this <a href="${process.env.CLIENT_URL}/reset-password.html?token=${token}">link</a> to reset your password</h5>
      `
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json({ message: 'Error sending email' });
      res.status(200).json({ message: 'Check your email' });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

// Reset password route
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body; // Extract token and new password from the request body

    const user = await User.findOne({
      where: {
        resetToken: token,
        expireToken: { [Op.gt]: Date.now() } // Token should still be valid
      }
    });

    if (!user) return res.status(400).json({ message: 'Token expired or invalid' });

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetToken = null; // Clear the token
    user.expireToken = null; // Clear the expiration

    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: 'Error resetting password' });
  }
});

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
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    res.status(200).json({ userId: user.id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
