const userServices = require("../services/user.services");
const User = require("../models/user.model");
const Conducteur = require("../models/conducteur.model");
const Conducteuroffer = require("../models/conducteuroffer.model");



// Creating one 
exports.register = (async (req, res) => {
  var register = await userServices.register(req.body)
  if (register["errtype"] == "1")
    res.status(400).json({
      "message": register["message"]
    })
  else if (register["errtype"] == "2")
    res.status(500).json({
      "message": register["message"]
    })
  else
    res.status(200).json({
      "message": "Success",
      "data": register
    });
});


//Login
exports.login = (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  userServices.login({
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
    } else if (results["status"] == "deleted")
      return res.status(403).json("your compte was deleted")
    else
      return res.status(500).json("server error")
  });
};

// Updating One
exports.update = (async (req, res) => {
  try {

    if (req.body.username != "" && req.body.username != null) {
      const user = await User.findById(req.body.user)
      const updateuser = await User.updateOne({
        _id: req.body.user
      }, {
        $addToSet: {
          usernamelist: req.body.username
        },
        username: req.body.username
      })
      if (updateuser.modifiedCount == 1) {
        await Conducteur.updateOne({
          email: user.email
        }, {
          $addToSet: {
            usernamelist: req.body.username
          },
          username: req.body.username
        })
        res.status(200).json({"message":"username updated","data":req.body.username});
      } else
        res.status(300).json("there is no modification")

    } else
      res.status(400).json({
        "message": "username can't be empty"
      })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
});
exports.status = async (req, res) => {

  try {
    const user = await User.findById(req.body.user)
    res.status(200).json({
      isdriver: user.isdriver
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

}