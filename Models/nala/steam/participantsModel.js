// SteamParticipantModel.js
const mongoose = require('mongoose');

// Define the schema for the "SteamParticipant" collection
const SteamParticipantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numbers: { type: Number},
  numbersTwo: { type: Number},
  district: { type: String},
  email: {type: String},
  business: {type: String},
  discription : {type: String},
  gender: {type: String}
  // Other fields for the SteamParticipant
});

// Create the SteamParticipant model based on the schema
const SteamParticipant = mongoose.model('SteamParticipant', SteamParticipantSchema);

// Export the SteamParticipant model so that it can be used in other files
module.exports = SteamParticipant;