const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Debug environment variables
console.log('🔧 Environment Variables:');
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '✅ Set' : '❌ Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Not set');

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://myfood-app.vercel.app', 
        'https://your-actual-vercel-domain.vercel.app',
        'https://myfood-frontend.onrender.com'
      ]
    : ['http://localhost:5173'],
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myfood';
console.log('🔗 Connecting to MongoDB...');

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB successfully!');
  console.log('📊 Database:', mongoose.connection.db.databaseName);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});

// Routes
app.use('/api/menu', require('./routes/menu'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/food', require('./routes/food'));
app.use('/api/paypal', require('./routes/paypal'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'MyFood API is running!' });
});

// Health check route for Render
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
}); 