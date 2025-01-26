const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe-avaimen lataus
const Order = require('../models/Order'); // Tilausmalli
require('dotenv').config();

router.post('/create-payment-intent', async (req, res) => {
  const { amount, cart, name, phone, email } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Summa senteissä
      currency: 'eur',
      payment_method_types: ['card'],
      metadata: { name, phone, email },
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Tallenna tilaus tietokantaan
    const order = await Order.create({
      name,
      phone,
      email,
      totalAmount: amount / 100, // Muutetaan euroiksi
      product: JSON.stringify(cart),
      items: JSON.stringify(cart),
      total: total,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      order: { // Lähetä tilauksen tiedot frontendille
        name: order.name,
        phone: order.phone,
        email: order.email,
        total: order.total,
        products: cart,
      },
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
