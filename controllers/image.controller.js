const multer = require("multer");
const ImageModel=require("../models/image.model");


exports.upload= (req, res) => {
    const Storage = multer.diskStorage({
      destination: "../first web/public/images",
      filename: (req, file, cb) => {
        cb(null, req.body.name);
      },
    })
    const upload = multer({
      storage: Storage
    }).single("testImage")
  
    upload(req, res, (err) => {
      if (err) {
        res.status(400).json(err)
      } else {
       if(req.file==undefined || req.body.name==undefined)
       {
         res.status(400).json({
           "message":"name and file required"
         })
       }else{

        const newImage = new ImageModel({
          name: req.body.name,
          image: {
            data: req.file.filename,
            contentType: "image/png"
          }
        })
        newImage.save()
          .then((response) => res.status(200).json(response))
          .catch((err) => res.status(400).json(err));
      }
      }
    })
  }


