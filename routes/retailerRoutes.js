const express = require('express');
const router = express.Router();
const Retailer = require('../models/Retailer');

// GET all
router.get('/', async (req, res) => {
  try {
    const retailers = await Retailer.find();
    res.json(retailers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST new
router.post('/', async (req, res) => {
  const retailer = new Retailer({
    shop: req.body.shop,
    owner: req.body.owner,
    location: req.body.location,
    phone: req.body.phone
  });
  try {
    const newRetailer = await retailer.save();
    res.status(201).json(newRetailer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Retailer.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Retailer.findByIdAndDelete(req.params.id);
    res.json({ message: '✅ Retailer delete ho gaya!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Retailer Login
router.post('/login', async (req, res) => {
  const { phone, password } = req.body;
  try {
    const retailer = await Retailer.findOne({ phone: phone });
    if (!retailer) {
      return res.status(404).json({ message: '❌ Retailer nahi mila!' });
    }
    if (retailer.password !== password) {
      return res.status(401).json({ message: '❌ Galat password!' });
    }
    res.json({
      message: '✅ Login successful!',
      retailer: {
        id: retailer._id,
        shop: retailer.shop,
        owner: retailer.owner,
        phone: retailer.phone
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;