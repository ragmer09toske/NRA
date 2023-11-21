const express = require("express");
const router = express.Router();
const authMiddleware = require('../../middlewares/authMiddleware.js');
const { createCompleteProfile, getAllCompleteProfile, getCompleteProfileById, updateCompleteProfileById } = require("../../controllers/completeProfileController.js");

router.post("/completeProfile",authMiddleware.verifyToken, createCompleteProfile);
router.get("/completedProfiles",authMiddleware.verifyToken, getAllCompleteProfile);
router.get("/completedProfiles/:f_k",authMiddleware.verifyToken, getCompleteProfileById);
router.put("/completedProfile/:id",authMiddleware.verifyToken, updateCompleteProfileById);

module.exports = router;
