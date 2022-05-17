const mongoose = require("mongoose");
const {
  Schema
} = mongoose;
const uniqueValidator = require("mongoose-unique-validator");

const TruckSchema = new Schema({
  truckModel: {
    type: String,
    required: true,
  },
  truckLicense: {
    type: String,
    required: true,
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


TruckSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    //do not reveal passwordHash
    delete returnedObject.password;
  },
});


TruckSchema.plugin(uniqueValidator, {
  message: "Email already in use."
});

const Truck = mongoose.model("truck", TruckSchema);
module.exports = Truck;