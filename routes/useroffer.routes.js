const userofferController = require("../controllers/useroffer.controller");
const express = require("express");
const router = express.Router();

router.post("/register", userofferController.register);
router.delete("/delete",userofferController.delete);
router.post("/getbyuser",userofferController.getByuser);
router.patch('/update',userofferController.update);
router.post("/getacceptedoffersbyuser",userofferController.getacceptedoffersbyuser);
router.patch('/useraccepteoffer',userofferController.useraccepteoffer);



module.exports = router;