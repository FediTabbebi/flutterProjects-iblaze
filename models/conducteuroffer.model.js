const mongoose = require("mongoose");
const { Schema } = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const ConducteurofferSchema = new Schema({
  offer: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'offer',
  },
  conducteur: {
    type: Schema.Types.ObjectId,
    required: true,
    ref:'conductor',
  },
  truck:{
    type:Schema.Types.ObjectId,
    required:true,
    ref:'truck',
  },
  price:{
    type: Number,
    required:true,
  },
  description:{
    type: String,
  },
  completeoffer:{
    type: Boolean,
    default:false,
  },
  status: {
    type: String,
    default: "active",
  },
  date: {
    type: Date,
    default: Date.now(),
  }
});


ConducteurofferSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //do not reveal passwordHash
    delete returnedObject.password;
  },
});


ConducteurofferSchema.plugin(uniqueValidator, { message: "Email already in use." });

const Conducteuroffer = mongoose.model("conducteuroffer", ConducteurofferSchema);
module.exports = Conducteuroffer;