require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔧 Testing MongoDB Connection...');
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/myfood';

mongoose.connect(MONGODB_URI)
.then(async () => {
  console.log('✅ Connected to MongoDB successfully!');
  console.log('📊 Database Name:', mongoose.connection.db.databaseName);
  console.log('🔗 Connection URL:', mongoose.connection.host + ':' + mongoose.connection.port);
  
  // Test creating a simple document
  const TestSchema = new mongoose.Schema({ name: String, timestamp: Date });
  const TestModel = mongoose.model('Test', TestSchema);
  
  const testDoc = new TestModel({ 
    name: 'Connection Test', 
    timestamp: new Date() 
  });
  
  await testDoc.save();
  console.log('✅ Test document saved successfully!');
  console.log('📄 Document saved to collection:', testDoc.collection.name);
  console.log('🏢 Database:', testDoc.collection.db.databaseName);
  
  // Clean up - delete the test document
  await TestModel.deleteOne({ _id: testDoc._id });
  console.log('🧹 Test document cleaned up');
  
  process.exit(0);
})
.catch(err => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
}); 