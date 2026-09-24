const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB se connect karo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB se connect ho gaya!'))
  .catch((err) => console.log('❌ MongoDB connection error:', err));

// --- Routes (Sabse pehle yahan aayenge) ---
const deviceRoutes = require('./routes/deviceRoutes');
app.use('/api/devices', deviceRoutes);

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

const retailerRoutes = require('./routes/retailerRoutes');
app.use('/api/retailers', retailerRoutes);

// Basic Test Route
app.get('/', (req, res) => {
  res.send('🚀 EMI Locker Backend is running!');
});

// --- Server Start (Sabse aakhir mein) ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server chal raha hai: http://localhost:${PORT}`);
});