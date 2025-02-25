const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Stripe-avaimen lataus
const Order = require('../models/Order'); // Tilausmalli
require('dotenv').config();

router.post('/create-payment-intent', async (req, res) => {
  const { cart, name, phone, email } = req.body;

  try {
    // Laske summa backendissä, jotta frontend ei voi manipuloida sitä
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const amountInCents = total * 100;

    console.log('Total:', total, 'Amount in Cents:', amountInCents);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'eur',
      payment_method_types: ['card'],
      metadata: { name, phone, email },
    });

    const order = await Order.create({
      name,
      phone,
      email,
      totalAmount: total,
      product: JSON.stringify(cart),
      items: JSON.stringify(cart),
      total: total,
    });

    console.log('Payment Intent:', paymentIntent);
    console.log('Order Created:', order);

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      order: {
        name: order.name,
        phone: order.phone,
        email: order.email,
        total: order.total,
        products: cart,
      },
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
