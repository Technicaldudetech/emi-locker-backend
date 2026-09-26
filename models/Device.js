const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  customer: { type: String, required: true },
  imei: { type: String, required: true },
  customerPhone: { type: String, default: null }, // NAYA FIELD
  status: { type: String, default: 'ACTIVE' },
  retailerId: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);

