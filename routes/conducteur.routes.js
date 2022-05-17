const conducteurController = require("../controllers/conducteur.controller");

const express = require("express");
const router = express.Router();

router.post("/register", conducteurController.register);
router.post("/login", conducteurController.login);
router.patch('/update',conducteurController.update);


module.exports = router;