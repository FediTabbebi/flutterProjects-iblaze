const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");


const ConducteurSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  truck:{
    type: [Schema.Types.ObjectId],
    ref:"truck",
  },
  status:{
    type:String,
    default:"pending",
  },
  usernamelist: {
    type: [String] 
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

ConducteurSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //do not reveal passwordHash
    delete returnedObject.password;
  },
});


ConducteurSchema.plugin(uniqueValidator, { message: "Email already in use." });

const Conducteur = mongoose.model("conductor", ConducteurSchema);
module.exports = Conducteur;