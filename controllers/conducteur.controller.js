const bcrypt = require("bcryptjs");
const conducteurServices = require("../services/conducteur.services");
const Conducteur = require("../models/conducteur.model");
const truckController = require('../controllers/truck.controller')
const User = require("../models/user.model");

//Login
exports.login = (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  conducteurServices.login({
    email,
    password
  }, (error, results) => {
    if (error) {
      return next(error);
    }
    if (results["status"] == "active") {
      return res.status(200).send({
        message: "Success",
        data: results,
      });
    } else if (results["status"] == "waiting")
      return res.status(403).json("wait admin for answer")

    else if (results["status"] == "deleted")
      return res.status(403).json("your compte was deleted")
    else
      return res.status(500).json("server error")
  });
};

// Creating one
exports.register = ((req, res, next) => {
 
   const register = truckController.register({
     "truckModel": req.body.truckModel,
     "truckLicense": req.body.truckLicense,
     "truckImage":req.body.truckImage,
     "truckPaper":req.body.truckPaper
   })
   if (register != null) {
     const {
       password
     } = req.body;
 
     const salt = bcrypt.genSaltSync(10);
 
     req.body.password = bcrypt.hashSync(password, salt);
     const params = {
       "username": req.body.username,
       "email": req.body.email,
       "password": req.body.password,
       "truck": register["id"],
       "usernamelist": [req.body.username],
       "cin":req.body.cin,
       "drivingLicense":req.body.drivingLicense
     }
     conducteurServices.register(params, async (error, results) => {
       if (error) {
         const deletetruck= truckController.deletetrucknotregister(register["id"]);
         if (deletetruck!=null)
         return next(error);
         else
         return res.status(500).json("error wrong truck in database need fix")
       }
     const user=  await User.findOneAndUpdate({email:req.body.email},{isdriver:"pending"})
       return res.status(200).send({
         message: "Success",
         data: results,
       });
     });
   } else
   {
     return res.status(500).json({
       message: "error truck fields"
     })
   }
 });

