const express = require('express');
const router = express.Router();
const participantsController = require('../../../controllers/nala/steam/participantsController');
const authMiddleware = require('../../../middlewares/authMiddleware.js');

//Search user by User model attribute
router.get('/search',authMiddleware.verifyToken,participantsController.searchSteamParticipant);

router.post('/create', authMiddleware.verifyToken,participantsController.createSteamParticipant )

// Get all users
router.get('/', authMiddleware.verifyToken, participantsController.getAllSteamParticipants);

// Get a user by ID
router.get('/:id', authMiddleware.verifyToken, participantsController.getSteamParticipantsById);

// Update a user by ID
router.put('/:id', authMiddleware.verifyToken, participantsController.updateSteamParticipantById);

// Delete a user by ID
router.delete('/:id', authMiddleware.verifyToken, participantsController.deleteSteamParticipantById);



module.exports = router;