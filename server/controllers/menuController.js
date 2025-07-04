const MenuItem = require('../models/MenuItem');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
};

// Get menu item by ID
exports.getMenuItemById = async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu item', error: error.message });
  }
};

// Create new menu item
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, cuisineType, tags } = req.body;
    
    const newItem = new MenuItem({
      name,
      description,
      price,
      image,
      cuisineType,
      tags: tags || []
    });
    
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error: error.message });
  }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, cuisineType, tags, isAvailable } = req.body;
    
    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        image,
        cuisineType,
        tags: tags || [],
        isAvailable
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: 'Error updating menu item', error: error.message });
  }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
  try {
    const deletedItem = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting menu item', error: error.message });
  }
};

// Get menu items by cuisine type
exports.getMenuItemsByCuisine = async (req, res) => {
  try {
    const { cuisineType } = req.params;
    const menuItems = await MenuItem.find({ 
      cuisineType, 
      isAvailable: true 
    }).sort({ createdAt: -1 });
    
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error: error.message });
  }
}; 