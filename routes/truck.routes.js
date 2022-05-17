const truckController = require("../controllers/truck.controller");
const express = require("express");
const router = express.Router();

router.post("/register", truckController.register);
router.post("/gettrucksbyconducteur", truckController.gettrucksbyconducteur);
router.patch('/addtruck',truckController.addtruck);
router.delete('/deletetruck',truckController.deletetruck);

module.exports = router;