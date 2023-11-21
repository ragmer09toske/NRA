const mongoose = require("mongoose");

const completeProfileSchema = new mongoose.Schema({
  f_k: { type: String, required: false },
  job: { type: String, required: false },
  experience: { type: String, required: false },
  portfolio: { type: String, required: false },
  transcript: { type: String, required: false },
  cv: { type: String, required: false },
  certificate: { type: String, required: false },
  bio: { type: String, required: false },
});

const CompleteProfile = mongoose.model("CompleteProfile", completeProfileSchema);

module.exports = CompleteProfile;
