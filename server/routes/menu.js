const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { auth, adminAuth } = require('../middleware/auth');

// Public routes
router.get('/', menuController.getAllMenuItems);
router.get('/:id', menuController.getMenuItemById);
router.get('/cuisine/:cuisineType', menuController.getMenuItemsByCuisine);

// Admin routes (protected)
router.post('/', adminAuth, menuController.createMenuItem);
router.put('/:id', adminAuth, menuController.updateMenuItem);
router.delete('/:id', adminAuth, menuController.deleteMenuItem);

module.exports = router; 