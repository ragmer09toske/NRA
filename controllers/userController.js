const User = require('../Models/UserModel');

// Create a new driver
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a driver by ID
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(400).json({ message: `Could not find the driver with ID ${id}` });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a driver by ID
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json({ message: `Could not find the driver with ID ${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search users by email, number, name, or account type
exports.searchUsers = async (req, res) => {
  try {
    const { searchParam } = req.query;
    let queryFields = []
    if(!isNaN(searchParam)){
      queryFields = [
        { number: searchParam },
      ]
    }
    else{
      queryFields = [
        { email: searchParam },
        { name: { $regex: searchParam, $options: 'i' } }, // Case-insensitive search
        { account_type: { $regex: searchParam, $options: 'i' } }, // Case-insensitive search
      ]
    }
    const searchResults = await User.find({
      $or: queryFields,
    });
    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({message: "yes its from me: " + error.message });
  }
};