const Offer =require("../models/offer.model")

// Creating One
async function  register (params) {
    var result;
    try {
      const offer = new Offer(params);
      await offer.save().then((response) => {
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


  // delete offer not register
async function deleteoffernotregister  (req)  {
  try {
    const offer = await Offer.findByIdAndDelete(req)
    if (offer != null)
      return offer;
    else
      return null

  } catch (err) {
    return null;
  }
};


  module.exports = {
    register,
    deleteoffernotregister
  };