const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customer: { type: String, required: true },
  device: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: String, required: true },
  status: { type: String, default: 'Pending' } // Paid, Pending, Overdue
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);