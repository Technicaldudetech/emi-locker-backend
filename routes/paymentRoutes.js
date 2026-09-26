const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');

// 1. Saare payments (retailerId ke saath filter)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.retailerId) {
      filter.retailerId = req.query.retailerId;
    }
    const payments = await Payment.find(filter);
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Naya payment add
router.post('/', async (req, res) => {
  const payment = new Payment({
    customer: req.body.customer,
    device: req.body.device,
    amount: req.body.amount,
    date: req.body.date,
    status: req.body.status || 'Pending',
    retailerId: req.body.retailerId || null
  });

  try {
    const newPayment = await payment.save();
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. Payment update (Mark as Paid)
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