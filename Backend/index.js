const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet'); // Lisää turvamääräykset
const sequelize = require('./config/db'); // MariaDB yhteys
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const productRoutes = require('./routes/productRoutes');

const paymentRoutes = require('./routes/paymentRoutes'); // Maksut

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
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com", "'unsafe-inline'"],
      frameSrc: ["'self'", "https://js.stripe.com"],
      connectSrc: ["'self'", "https://api.stripe.com"],
      imgSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "https://cdnjs.cloudflare.com", "'unsafe-inline'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
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
app.get('/reset-password/:token', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'resetpassword.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

app.use('/docs', express.static('docs'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
