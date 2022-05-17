const mongoose = require("mongoose");
const {
  Schema
} = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: false,
  },
  password: {
    type: String,
    required: true,
  },
  isdriver: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "active",
  },
  usernamelist: {
    type: [String] 
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});


UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //do not reveal passwordHash
    delete returnedObject.password;
  },
});


UserSchema.plugin(uniqueValidator, {
  message: "Email already in use."
});

const User = mongoose.model("user", UserSchema);
module.exports = User;