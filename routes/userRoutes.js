const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const authMiddleware = require('../middlewares/authMiddleware.js');

//Search user by User model attribute
// This route will be accessible at something like /users/search?searchParam=query.
router.get('/search',authMiddleware.verifyToken,userController.searchUsers);

// Get all users
router.get('/', authMiddleware.verifyToken, userController.getAllUsers);

// Get a user by ID
router.get('/:id', authMiddleware.verifyToken, userController.getUserById);

// Update a user by ID
router.put('/:id', authMiddleware.verifyToken, userController.updateUserById);

// Delete a user by ID
router.delete('/:id', authMiddleware.verifyToken, userController.deleteUserById);



module.exports = router;