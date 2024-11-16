const express = require('express');
const multer = require('multer');
const router = express.Router();
const Product = require('../models/Product');

// Määritä multer kuvatiedostojen tallennusta varten
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/products', upload.array('images'), async (req, res) => {
  try {
    const { name, price, discount, description, category } = req.body;
    const images = req.files ? req.files.map(file => file.originalname).join(',') : '';

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    const newProduct = await Product.create({
      name,
      price,
      discount: discount || 0,
      description,
      image: images,
      category
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);  // Lisätään virheilmoitus palvelinpäähän
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Route to fetch all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch products by category
router.get('/products/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.findAll({ where: { category } });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Route to fetch a single product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
