const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Define the schema for the "Nala User" collection
  name: { type: String, required: true },
  number: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  district: { type: String, required: true },
  account_type: { type: String, required: true },
  avatar: { type: String },
});

const NalaUser = mongoose.model("NalaUser", userSchema);

module.exports = NalaUser;
