const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// 1. Saare devices lene ke liye (GET)
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Naya device add karne ke liye (POST)
router.post('/', async (req, res) => {
  const device = new Device({
    name: req.body.name,
    customer: req.body.customer,
    imei: req.body.imei,
    status: req.body.status || 'ACTIVE'
  });

  try {
    const newDevice = await device.save();
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. Ek single device lene ke liye (GET by ID)
router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ message: 'Device nahi mila' });
    res.json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Device ko update karne ke liye (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' } // Yahan change kiya hai
    );
    if (!updatedDevice) return res.status(404).json({ message: 'Device nahi mila' });
    res.json(updatedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5. Device ko delete karne ke liye (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const deletedDevice = await Device.findByIdAndDelete(req.params.id);
    if (!deletedDevice) return res.status(404).json({ message: 'Device nahi mila' });
    res.json({ message: '✅ Device delete ho gaya!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;