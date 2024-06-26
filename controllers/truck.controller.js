const Conducteur = require("../models/conducteur.model");
const Truck = require("../models/truck.model");
const ConducteurOffer=require('../models/conducteuroffer.model')

exports.register = ((req) => {
  try {
    if (req["truckModel"] == undefined || req["truckLicense"] == undefined || req["truckImage"] == undefined || req["truckPaper"] == undefined ||req["truckModel"] == "" || req["truckLicense"] == "")
      return null;
    const truck = new Truck(req);
    truck.save();
    return truck;
  } catch {
    return null
  }
});

// add new truck
exports.addtruck = (async (req, res) => {
  try {
    const truck = this.register({
     "truckModel": req.body.truckModel,
     "truckLicense": req.body.truckLicense,
     "truckImage":req.body.truckImage,
     "truckPaper":req.body.truckPaper
    })
    const upconducteur = await Conducteur.updateOne({
      _id: req.body.conducteur
    }, {
      $addToSet: {
        truck: truck._id
      }
    })
    if (upconducteur.modifiedCount == 1)
      res.status(200).json("truck updated");
    else{
      const deletetruck= this.deletetrucknotregister(truck["id"]);
      if (deletetruck!=null)
      return res.status(300).json("can't update") ;
      else
      return res.status(500).json("error wrong truck in database need fix")
    }
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
});

// delete truck 
exports.deletetruck = (async (req, res) => {
  try {
    const conducteuroffer=await ConducteurOffer.findOne({truck:req.body.truck,status:"active"})
    if(conducteuroffer==null)
     {
    await Truck.findByIdAndUpdate(req.body.truck, {
       status: "deleted"
     })
     res.status(200).json({"message":"truck deleted"});
  }else
   res.status(400).json({"message":"this truck has offer"})
   } catch (err) {
     res.status(500).json({
       message: err.message
     })
  }
});

// delete truck not register
exports.deletetrucknotregister = (async (req, res) => {
  try {
    const truck=await Truck.findByIdAndDelete(req)
    if(truck!=null)
    return truck;
    else 
    return null 

  } catch (err) {
    return null;
  }
});

// get trucks by conducteur
exports.gettrucksbyconducteur = (async (req, res) => {
  try {
    const conducteur = await Conducteur.findById(req.body.conducteur).populate('truck')
    var listtruck = [];
    for (var i = 0; i < conducteur["truck"].length; i++)
      if (conducteur["truck"][i]["status"] == "active")
        listtruck.push(conducteur["truck"][i])
    res.json(listtruck)
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})