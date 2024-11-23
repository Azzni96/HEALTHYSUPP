const express = require('express');
const path = require('path');
const multer = require('multer');
const router = express.Router();
const Product = require('../models/Product');

// Määritetään multer kuvatiedostojen tallennusta varten
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads')); // Tallennuskansio
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname); // Uniikki tiedostonimi
  },
});

const upload = multer({ storage });

// Reitti tuotteen lisäämiseen
router.post('/products', upload.array('images', 10), async (req, res) => {
  try {
    const { name, price, discount, description, category } = req.body;

    // Tallennetaan kuvien tiedostonimet pilkulla erotettuna
    const images = req.files ? req.files.map(file => file.filename).join(',') : '';

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required' });
    }

    const newProduct = await Product.create({
      name,
      price,
      discount: discount || 0,
      description,
      image: images,
      category,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reitti kaikkien tuotteiden hakemiseen
router.get('/products', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reitti tuotteiden hakemiseen kategorian mukaan
router.get('/products/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.findAll({ where: { category } });
    res.json(products);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Reitti yksittäisen tuotteen hakemiseen ID:n perusteella
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
