const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Route to fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to add a new product
router.post('/products', async (req, res) => {
  try {
    const { name, price, discount, description, image_urls } = req.body;
    const newProduct = await Product.create({ name, price, discount, description, image_urls });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error); // Log detailed error
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Route to get a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
