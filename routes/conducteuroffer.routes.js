
const conducteurofferController = require("../controllers/conducteuroffer.controller");
const express = require("express");
const router = express.Router();


router.post("/getall",conducteurofferController.getAll);
router.post("/register", conducteurofferController.register);
router.post("/getacceptedoffersbyconducteur", conducteurofferController.getacceptedoffersbyconducteur);
router.delete('/delete',conducteurofferController.delete)

module.exports = router;