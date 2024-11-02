const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const productRoutes = require('./routes/productRoutes');
const connectDB = require('./config/db'); // Varmista, että tämä tiedosto yhdistää MongoDB:hen

// Stripe
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51QGlItRvF2XeuAxvQBL7PkT1FuB1kiUURXPMcISAff369TgiSOtqu5KFg7iS5UgOupI911dmX9nRzrT3Kd0W9naI00X4GPkwK9'); // Korvaa omalla testiavain

const app = express();

// Yhdistä MongoDB:hen
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Reitit
app.use('/api/auth', authRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/', productRoutes);

// Maksureitti Stripe Checkout -istunnon luomiseen
app.post('/create-checkout-session', async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // Voit vaihtaa tarvittaessa valuutan
            product_data: { name: 'Test Product' },
            unit_amount: amount, // Summa senteissä
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success.html', // Linkki onnistuneen maksun jälkeen
      cancel_url: 'http://localhost:3000/cancel.html',  // Linkki, jos maksu peruutetaan

    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Palvelee frontendin juuriosoitteessa
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Käynnistä palvelin
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
