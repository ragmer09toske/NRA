const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  postedBy: { type: String, required: true },
  deadline: { type: String, required: true },
  jobPosition: { type: String, required: true },
  timeStemp: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: false },
  skills: { type: String, required: false },
  requirements: { type: String, required: false },
  guidelines: { type: String, required: false },
  link: { type: String, required: false },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
