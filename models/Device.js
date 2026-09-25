const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  customer: { type: String, required: true },
  imei: { type: String, required: true },
  status: { type: String, default: 'ACTIVE' },
  retailerId: { type: String, default: null } // Naya field
}, { timestamps: true });

module.exports = mongoose.model('Device', deviceSchema);