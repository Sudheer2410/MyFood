require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

console.log('🔧 Testing User Creation...');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myfood';

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log('✅ Connected to MongoDB successfully!');
  console.log('📊 Database Name:', mongoose.connection.db.databaseName);
  
  // Create a test user
  const testUser = new User({
    name: 'Test User - ' + new Date().toISOString(),
    email: 'test' + Date.now() + '@example.com',
    password: 'testpassword123',
    role: 'user'
  });
  
  await testUser.save();
  console.log('✅ Test user created successfully!');
  console.log('👤 User ID:', testUser._id);
  console.log('📧 User Email:', testUser.email);
  console.log('🏢 Database:', testUser.collection.db.databaseName);
  
  // Clean up - delete the test user
  await User.deleteOne({ _id: testUser._id });
  console.log('🧹 Test user cleaned up');
  
  process.exit(0);
})
.catch(err => {
  console.error('❌ Error:', err);
  process.exit(1);
}); 