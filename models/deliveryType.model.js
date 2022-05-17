const mongoose = require("mongoose");
const {
  Schema
} = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const DeliveryTypeSchema = new Schema({
  deliveryType: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: "active",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});


DeliveryTypeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //do not reveal passwordHash
    delete returnedObject.password;
  },
});


DeliveryTypeSchema.plugin(uniqueValidator, {
  message: "Email already in use."
});

const DeliveryType = mongoose.model("deliveryType", DeliveryTypeSchema);
module.exports = DeliveryType;