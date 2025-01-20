const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const path = require('path'); // Tarvitaan HTML-tiedoston palautukseen
const User = require('../models/User');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');

// Tokenien tilapäinen tallennus
const resetTokens = new Map();

// Nodemailer-sähköpostiasetukset
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nihadazzam96@gmail.com', // Gmail-osoitteesi
    pass: 'rklj siir phxv xtoh'    // Sovellussalasanasi
  }
});

/**
 * @api {post} /forgot-password Forgot Password
 */
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Tarkista, onko käyttäjä olemassa
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Luo token ja linkki
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetLink = `http://localhost:3000/api/auth/reset-password/${resetToken}`;

    // Tallenna token
    resetTokens.set(resetToken, { email, expires: Date.now() + 3600000 });

    console.log('Email:', email);
    console.log('Reset Token:', resetToken);
    console.log('Reset Link:', resetLink);

    // Lähetä sähköposti
    const mailOptions = {
      from: 'nihadazzam96@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h3>Password Reset</h3>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link will expire in 1 hour.</p>
      `
    };
    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Forgot Password Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @api {get} /reset-password/:token Load Reset Password Page
 */
router.get('/reset-password/:token', (req, res) => {
  const { token } = req.params;

  // Tarkista token
  const data = resetTokens.get(token);
  if (!data || data.expires < Date.now()) {
    return res.status(400).send('Invalid or expired token');
  }

  // Palauta reset-password.html
  res.sendFile(path.join(__dirname, '../public/resetpassword.html'));
});

/**
 * @api {post} /reset-password Reset Password
 */
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body;

    // Tarkista tokenin kelvollisuus
    const data = resetTokens.get(token);
    if (!data || data.expires < Date.now()) {
      return res.status(400).json({ message: 'Token is invalid or expired' });
    }

    // Päivitä salasana
    const user = await User.findOne({ where: { email: data.email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await user.update({ password: hashedPassword });

    // Poista token
    resetTokens.delete(token);

    res.json({ message: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @api {post} /signup User Signup
 * @apiName Signup
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 * @apiDescription Create a new user account.
 *
 * @apiBody {String} username Username for the user.
 * @apiBody {String} email Email of the user.
 * @apiBody {String} phone Phone number of the user.
 * @apiBody {String} password Password for the user.
 *
 * @apiSuccess {String} message Signup success message.
 * @apiSuccess {Object} user Created user details.
 */


// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, phone, password, role } = req.body;

    // Check if email is already in use
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ username, email, phone, password: hashedPassword, role: role || 'user' });

    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
/**
 * @api {post} /signin User Signin
 * @apiName Signin
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 * @apiDescription Authenticate a user.
 *
 * @apiBody {String} email Email of the user.
 * @apiBody {String} password Password of the user.
 *
 * @apiSuccess {String} message Signin success message.
 * @apiSuccess {Object} user Authenticated user details.
 */
// Signin Route
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.status(200).json({ message: 'Signin successful', user: { id: user.id, username: user.username, role: user.role, } });
  } catch (error) {
    console.error('Signin Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
/**
 * @api {get} /users Get All Users
 * @apiName GetAllUsers
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 * @apiDescription Retrieve all users from the database.
 *
 * @apiSuccess {Object[]} users List of users.
 */
// Get All Users Route
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'username', 'email', 'role']});
    res.status(200).json(users);
  } catch (error) {
    console.error('Get Users Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * @api {delete} /delete-user Delete User
 * @apiName DeleteUser
 * @apiGroup Authentication
 * @apiVersion 1.0.0
 * @apiDescription Delete a user from the database.
 *
 * @apiBody {String} [id] ID of the user to delete.
 * @apiBody {String} [email] Email of the user to delete.
 *
 * @apiSuccess {String} message Success message.
 */
// Delete User Route
router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Export router
module.exports = router;
