// DriverModel.js

const mongoose = require('mongoose');

// Define the schema for the "Driver" collection
const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  carModel: { type: Number, required: true },
  image: { type: String, required: true },
  // Other fields for the driver
});

// Create the Driver model based on the schema
const Driver = mongoose.model('Driver', driverSchema);

// Export the Driver model so that it can be used in other files
module.exports = Driver;