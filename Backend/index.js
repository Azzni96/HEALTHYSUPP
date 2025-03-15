const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet'); // Lisää turvamääräykset
const crypto = require('crypto'); // Add crypto for nonce generation
const sequelize = require('./config/db'); // MariaDB yhteys
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // Maksut
require('dotenv').config();

const app = express();

// Connect to MariaDB
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MariaDB');
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Unable to connect to MariaDB:', error);
  }
})();

// Middleware
app.use(cors());
app.use(helmet());
app.use((req, res, next) => {
  res.locals.nonce = crypto.randomBytes(16).toString('base64');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api', productRoutes);
app.use('/api/payment', paymentRoutes); // Lisää maksu

// Endpoint to serve the Stripe public key
app.get('/api/stripe-public-key', (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLIC_KEY });
});

// Serve frontend files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/Menu.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Menu.html'));
});
app.get('/addProduct.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'addProduct.html'));
});
app.get('/maksu.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'maksu.html'));
});


// Error handling
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

app.use('/docs', express.static('docs'));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
