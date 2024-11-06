const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import your Product model

// Route to fetch all products
router.get('/products', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to get a product by ID
router.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Route to add a new product
router.post('/products', async (req, res) => {
    try {
        const { name, price, discount, description, image_urls } = req.body;
        const newProduct = await Product.create({ name, price, discount, description, image_urls });
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
