const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Assuming you have a Product model

// Route to fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add a new product
router.post('/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().lean(); // .lean() optimoi suorituskykyä ja mahdollistaa virtuaalikenttien käytön
    products.forEach(product => {
      product.discountedPrice = product.price - (product.price * (product.discount / 100));
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
