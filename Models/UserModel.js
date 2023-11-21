const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Define the schema for the "User" collection
  name: { type: String, required: true },
  number: { type: Number, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  account_type: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
