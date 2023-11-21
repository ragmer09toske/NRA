const Post = require('../Models/PostModel');

// Create a new Post
exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a Post by ID
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Post by ID
exports.updatePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndUpdate(id, req.body);
    if (!post) {
      return res.status(400).json({ message: `Could not find the Post with ID ${id}` });
    }
    const updatedPost = await Post.findById(id);
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Post by ID
exports.deletePostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(400).json({ message: `Could not find the Post with ID ${id}` });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search Posts by companyName, jobPosition, location, description, skills, requirements, guidelines or by link

// Search Posts by various fields
exports.searchPosts = async (req, res) => {
  try {
    const { companyName, jobPosition, location, description, skills, requirements, guidelines, link, tags } = req.query;
    const queryFields = [];

    if (companyName) queryFields.push({ companyName: new RegExp(companyName, 'i') });
    if (jobPosition) queryFields.push({ jobPosition: new RegExp(jobPosition, 'i') });
    if (location) queryFields.push({ location: new RegExp(location, 'i') });
    if (description) queryFields.push({ description: new RegExp(description, 'i') });
    if (skills) queryFields.push({ skills: new RegExp(skills, 'i') });
    if (requirements) queryFields.push({ requirements: new RegExp(requirements, 'i') });
    if (guidelines) queryFields.push({ guidelines: new RegExp(guidelines, 'i') });
    if (link) queryFields.push({ link: new RegExp(link, 'i') });
    if (tags) queryFields.push({ tags: { $all: tags.split(',') } });

    if (queryFields.length === 0) {
      // No search parameters provided, return an empty array or handle it as needed
      return res.status(200).json([]);
    }

    const searchResults = await Post.find({ $or: queryFields });
    res.status(200).json(searchResults);
  } catch (error) {
    res.status(500).json({ message: "Error: " + error.message });
  }
};