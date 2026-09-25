const express = require('express');
const router = express.Router();
const Device = require('../models/Device');

// 1. Saare devices (retailerId ke saath filter)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.retailerId) {
      filter.retailerId = req.query.retailerId;
    }
    const devices = await Device.find(filter);
    res.json(devices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. Naya device add karne ke liye (retailerId ke saath)
router.post('/', async (req, res) => {
  const device = new Device({
    name: req.body.name,
    customer: req.body.customer,
    imei: req.body.imei,
    status: req.body.status || 'ACTIVE',
    retailerId: req.body.retailerId || null
  });

  try {
    const newDevice = await device.save();
    res.status(201).json(newDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 3. Single device
router.get('/:id', async (req, res) => {
  try {
    const device = await Device.findById(req.params.id);
    if (!device) return res.status(404).json({ message: 'Device nahi mila' });
    res.json(device);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. Update
router.put('/:id', async (req, res) => {
  try {
    const updatedDevice = await Device.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: 'after' }
    );
    if (!updatedDevice) return res.status(404).json({ message: 'Device nahi mila' });
    res.json(updatedDevice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 5. Delete
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