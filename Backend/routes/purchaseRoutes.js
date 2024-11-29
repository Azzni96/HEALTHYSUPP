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

module.exports = router;
