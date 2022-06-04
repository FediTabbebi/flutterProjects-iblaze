const usersController = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.patch('/update',usersController.update);
router.post('/status',usersController.status);

module.exports = router;