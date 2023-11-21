const express = require("express");
const router = express.Router();
const { uploadImage } = require("../../firebase");
const { listFiles } = require("../../firebase");
const { getFile } = require("../../firebase");
const authMiddleware = require('../../middlewares/authMiddleware.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/upload",authMiddleware.verifyToken, uploadImage);
router.get("/fileList",authMiddleware.verifyToken, listFiles);
router.post("/file",authMiddleware.verifyToken, getFile);

module.exports = router;
