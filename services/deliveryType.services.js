const DeliveryType = require("../models/deliveryType.model");



// Creating one
async function register(params, callback) {
    const deliveryType = new DeliveryType(params);
    deliveryType
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
  };
  