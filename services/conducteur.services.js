const Conducteur = require("../models/conducteur.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");



// Login
async function login({ email, password }, callback) {
  const conducteur = await (await Conducteur.findOne({ email:email }).populate('truck'));
  if (conducteur != null) {
    if(password==undefined){
      return callback({
        message: "Invalid Email/Password!",
      });
    }
     else if (bcrypt.compareSync(password, conducteur.password)) {
      const token = auth.generateAccessToken(email);
      return callback(null, { ...conducteur.toJSON(), token });
    } else {
      return callback({
        message: "Invalid Email/Password!",
      });
    }
  } else {
    return callback({
      message: "Invalid Email/Password!",
    });
  }
}

// Creating one
async function register(params, callback) {
    if (params.username === undefined) {
      return callback(
        {
          message: "Username Required",
        },
        ""
      );
    }
    const truck =[];
    truck.push(params['truck']);
     params['truck']=truck;
    const conducteur = new Conducteur(params);
    conducteur
      .save()
      .then((response) => {
        return callback(null, response);
      })
      .catch((error) => {
        return callback(error);
      });
  }
  module.exports = {
    register,
    login,
  };
  
