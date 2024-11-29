const express = require('express');
const Purchase = require('../models/Purchase');
const router = express.Router();

// POST route to save purchase details
router.post('/api/purchase', async (req, res) => {
  try {
    const { customerDetails, paymentDetails, cart, total } = req.body;

    // Save the purchase to the database
    const newPurchase = await Purchase.create({
      ...customerDetails,
      ...paymentDetails,
      cart,
      total,
    });

    res.status(201).json({ message: 'Purchase saved successfully!', data: newPurchase });
  } catch (error) {
    console.error('Error saving purchase:', error);
    res.status(500).json({ error: 'Failed to save purchase.' });
  }
});

// GET route to fetch all purchases
router.get('/api/purchase', async (req, res) => {
  try {
    const purchases = await Purchase.findAll();
    res.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Failed to fetch purchases.' });
  }
});

module.exports = router;
