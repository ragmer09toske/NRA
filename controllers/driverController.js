const Driver = require('../Models/DriverModel');

// Create a new driver
exports.createDriver = async (req, res) => {
  try {
    const driver = await Driver.create(req.body);
    res.status(200).json(driver);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all drivers
exports.getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find({});
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a driver by ID
exports.getDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findById(id);
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a driver by ID
exports.updateDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByIdAndUpdate(id, req.body);
    if (!driver) {
      return res.status(400).json({ message: `Could not find the driver with ID ${id}` });
    }
    const updatedDriver = await Driver.findById(id);
    res.status(200).json(updatedDriver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a driver by ID
exports.deleteDriverById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await Driver.findByIdAndDelete(id);
    if (!driver) {
      return res.status(400).json({ message: `Could not find the driver with ID ${id}` });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
