
const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image.controller");

router.post("/upload", imageController.upload);


module.exports = router;