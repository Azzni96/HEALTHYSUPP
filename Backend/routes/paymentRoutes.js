const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/payment', async (req, res) => {
  const { name, cardNumber, email, phone, product, amount, token } = req.body;

  try {
    // Stripe payment processing
    const charge = await stripe.charges.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: 'eur',
      source: token.id,
      description: `Payment for ${product}`
    });

    // Save order to database
    const order = await Order.create({
      name,
      cardNumber,
      email,
      phone,
      product,
      totalAmount: amount
    });

    // Generate PDF receipt
    const pdfDoc = new PDFDocument();
    let buffers = [];
    pdfDoc.on('data', buffers.push.bind(buffers));
    pdfDoc.on('end', async () => {
      const pdfData = Buffer.concat(buffers);

      // Send email with PDF
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Payment Receipt',
        text: 'Thank you for your payment. Attached is your receipt.',
        attachments: [{ filename: 'receipt.pdf', content: pdfData }]
      };

      await transporter.sendMail(mailOptions);
      res.json({ message: 'Payment successful and receipt sent!' });
    });

    pdfDoc.text(`Receipt for ${name}`);
    pdfDoc.text(`Product: ${product}`);
    pdfDoc.text(`Total Amount: €${amount}`);
    pdfDoc.text(`Email: ${email}`);
    pdfDoc.text(`Phone: ${phone}`);
    pdfDoc.text('Thank you for your purchase!');
    pdfDoc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Payment failed' });
  }
});

module.exports = router;
