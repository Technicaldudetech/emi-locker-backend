const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
  shop: { type: String, required: true },
  owner: { type: String, required: true },
  location: { type: String },
  phone: { type: String, required: true, unique: true },
  password: { type: String, default: "1234" }, // Default password
  total: { type: Number, default: 0 },
  active: { type: Number, default: 0 },
  locked: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Retailer', retailerSchema);