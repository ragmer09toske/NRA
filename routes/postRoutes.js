const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware.js');

// Create a new post
router.post('/',postController.createPost);

// Get all posts
router.get('/search', authMiddleware.verifyToken, postController.searchPosts);

router.get('/', authMiddleware.verifyToken, postController.getAllPosts);

// Get a post by ID
router.get('/:id', authMiddleware.verifyToken, postController.getPostById);

// Update a post by ID
router.put('/:id', authMiddleware.verifyToken, postController.updatePostById);

// Delete a post by ID
router.delete('/:id', authMiddleware.verifyToken, postController.deletePostById);

module.exports = router;