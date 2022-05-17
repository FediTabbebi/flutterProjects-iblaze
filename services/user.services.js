const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth.js");

// Login
async function login({ email, password }, callback) {
  const user = await User.findOne({ email });

  if (user != null) {
    if(password==undefined){
      return callback({
        message: "Invalid Email/Password!",
      });
    }
     else if (bcrypt.compareSync(password, user.password)) {
      const token = auth.generateAccessToken(email);
      // call toJSON method applied during model instantiation
      return callback(null, { ...user.toJSON(), token });
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
async function register  (params) {
  var result = {};
  try {
    const {
      password
    } = params;

    const salt = bcrypt.genSaltSync(10);

    params["password"] = bcrypt.hashSync(password, salt);
    params["usernamelist"]=[params["username"]]
    const user = new User(params);
    await user.save().then((response) => {
        result = response
      })
      .catch((err) => {
        result = {
          "errtype": "1",
          "message": err["message"]
        }
      });
    return result
  } catch (err) {
    return {
      "errtype": "2",
      "message": err.message
    }
  }
}

module.exports = {
  login,
  register,
};
