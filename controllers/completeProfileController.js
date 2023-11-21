const CompleteProfile = require('../Models/nala/CompleteProfileModel');

// Create a new driver
exports.createCompleteProfile = async (req, res) => {
  try {
    const completeProfile = await CompleteProfile.create(req.body);
    res.status(200).json(completeProfile);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all drivers
exports.getAllCompleteProfile = async (req, res) => {
  try {
    const completeProfile = await CompleteProfile.find({});
    res.status(200).json(completeProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a driver by ID
exports.getCompleteProfileById = async (req, res) => {
  try {
    const { f_k } = req.params;
    const completeProfile = await CompleteProfile.findOne({f_k: f_k});
    res.status(200).json(completeProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a driver by ID
exports.updateCompleteProfileById = async (req, res) => {
  try {
    const { id } = req.params;
    const completeProfile = await CompleteProfile.findByIdAndUpdate(id, req.body);
    if (!completeProfile) {
      return res.status(400).json({ message: `Could not find the profile with ID ${id}` });
    }
    const updatedCompleteProfile = await CompleteProfile.findById(id);
    res.status(200).json(updatedCompleteProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

