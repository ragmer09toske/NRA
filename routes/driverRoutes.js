const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Create a new driver
router.post('/',driverController.createDriver);

// Get all drivers
router.get('/', authMiddleware.verifyToken, driverController.getAllDrivers);

// Get a driver by ID
router.get('/:id', authMiddleware.verifyToken, driverController.getDriverById);

// Update a driver by ID
router.put('/:id', authMiddleware.verifyToken, driverController.updateDriverById);

// Delete a driver by ID
router.delete('/:id', authMiddleware.verifyToken, driverController.deleteDriverById);

module.exports = router;