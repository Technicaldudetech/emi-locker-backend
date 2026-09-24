const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// 1. Saare payments lene ke liye
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Naya payment add karne ke liye
router.post('/', async (req, res) => {
  const payment = new Payment({
    customer: req.body.customer,
    device: req.body.device,
    amount: req.body.amount,
    date: req.body.date,
    status: req.body.status || 'Pending'
  });

  try {
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. Payment update karne ke liye (Mark as Paid)
router.put('/:id', async (req, res) => {
  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!updatedPayment) return res.status(404).json({ message: 'Payment nahi mila' });
    res.json(updatedPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;