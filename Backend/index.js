const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/db'); // Connect to MariaDB using Sequelize
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const productRoutes = require('./routes/productRoutes');
const stripe = require('stripe')('sk_test_51QGlItRvF2XeuAxvQBL7PkT1FuB1kiUURXPMcISAff369TgiSOtqu5KFg7iS5UgOupI911dmX9nRzrT3Kd0W9naI00X4GPkwK9'); // Replace with your own secret key

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Connect to MariaDB
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MariaDB');
    return sequelize.sync();
  })
  .catch(error => {
    console.error('Unable to connect to MariaDB:', error);
  });

app.post('/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.productName,
        },
        unit_amount: item.amount * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html',
      cancel_url: 'http://localhost:3000/cancel.html',
    });
    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api', productRoutes);

// Serve frontend (index.html) for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'addProduct.html'));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Server error', error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
