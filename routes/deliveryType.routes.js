const deliveryTypeController = require("../controllers/deliveryType.controller");
const express = require("express");
const router = express.Router();

router.post("/register", deliveryTypeController.register);
router.get("/getall", deliveryTypeController.getAll);


module.exports = router;