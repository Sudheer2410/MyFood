const mongoose = require('mongoose');

const MenuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: {
    type: String,
    required: true
  },
  cuisineType: {
    type: String,
    required: true,
    enum: ['Italian', 'Chinese', 'Indian', 'Mexican', 'American', 'Japanese', 'Thai', 'Mediterranean', 'Other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  // restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: false }
}, {
  timestamps: true
});

module.exports = mongoose.model('MenuItem', MenuItemSchema); 