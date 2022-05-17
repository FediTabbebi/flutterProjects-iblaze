const Conducteuroffer = require("../models/conducteuroffer.model");

  // Creating One
async function register (params) {
  var result;
  try {
    const conducteuroffer = new Conducteuroffer(params);
    await conducteuroffer.save().then((response) => {
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
};

module.exports = {
  register,
};
