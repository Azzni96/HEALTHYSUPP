const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

router.post('/', async (req, res) => {
  console.log('Received feedback:', req.body);
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }
    const feedback = new Feedback({ name, email, message });
    await feedback.save();
    res.status(201).json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: 'Error sending feedback' });
  }
});



module.exports = router;
