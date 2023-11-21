const SteamParticipantSchema = require('../../../Models/nala/steam/participantsModel');

// Create a new driver
exports.createSteamParticipant = async (req, res) => {
  try {
    const Participant = await SteamParticipantSchema.create(req.body);
    res.status(200).json(Participant);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all users
exports.getAllSteamParticipants = async (req, res) => {
  try {
    const Participants = await SteamParticipantSchema.find({});
    res.status(200).json(Participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
exports.getSteamParticipantsById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await SteamParticipantSchema.findById(id);
    res.status(200).json(Participants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a driver by ID
exports.updateSteamParticipantById = async (req, res) => {
  try {
    const { id } = req.params;
    const Participant = await SteamParticipantSchema.findByIdAndUpdate(id, req.body);
    if (!Participant) {
      return res.status(400).json({ message: `Could not find the driver with ID ${id}` });
    }
    const updatedParticipant = await SteamParticipantSchema.findById(id);
    res.status(200).json(updatedParticipant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a driver by ID
exports.deleteSteamParticipantById = async (req, res) => {
  try {
    const { id } = req.params;
    const Participant = await SteamParticipantSchema.findByIdAndDelete(id);
    if (!Participant) {
      return res.status(400).json({ message: `Could not find the driver with ID ${id}` });
    }
    res.status(200).json(Participant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search users by email, number, name, or account type
exports.searchSteamParticipant = async (req, res) => {
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
    const searchResults = await SteamParticipantSchema.find({
      $or: queryFields,
    });
    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({message: "yes its from me: " + error.message });
  }
};