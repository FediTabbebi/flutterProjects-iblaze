const express = require("express");
const app = express();
const mongoose = require("mongoose");



//const multer =require("multer");
//const ImageModel=require('./models/image.model');

const dbConfig = require("./config/db.config");

const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/errors.js");
const unless = require("express-unless");
var id;
// connect to mongodb

mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );



//  authenticating token 
auth.authenticateToken.unless = unless;
app.use(
  auth.authenticateToken.unless({
    path: [{
        url: "/users/login",
        methods: ["POST"]
      },
      {
        url: "/users/register",
        methods: ["POST"]
      },
      {
        url: "/users/update",
        methods: ["PATCH"]
      },
      {
        url: "/conducteur/register",
        methods: ["POST"]
      },
      {
        url: "/conducteur/login",
        methods: ["POST"]
      },
      {
        url: "/conducteur/update",
        methods: ["PATCH"]
      },
      {
        url: "/users/offer/register",
        methods: ["POST"]
      },
      {
        url: "/conducteur/offer/getall",
        methods: ["POST"]
      },
      {
        url: "/conducteur/offer/register",
        methods: ["POST"]
      },
      {
        url: "/conducteur/offer/delete",
        methods: ["DELETE"]
      },
      {
        url: "/conducteur/offer/getacceptedoffersbyconducteur",
        methods: ["POST"]
      },
      {
        url: "/users/offer/delete",
        methods: ["DELETE"]
      },
      {
        url: "/users/offer/getbyuser",
        methods: ["POST"]
      },
      {
        url: "/users/offer/getacceptedoffersbyuser",
        methods: ["POST"]
      },
      {
        url: "/users/offer/useraccepteoffer",
        methods: ["PATCH"]
      },
      {
        url: "/users/offer/update",
        methods: ["PATCH"]
      },
      {
        url: "/users/deliveryType/getall",
        methods: ["GET"]
      },

      {
        url: "/users/deliveryType/register",
        methods: ["POST"]
      },
      {
        url: "/conducteur/truck/register",
        methods: ["POST"]
      },
      {
        url: "/conducteur/truck/gettrucksbyconducteur",
        methods: ["POST"]
      },
      {
        url: "/conducteur/truck/addtruck",
        methods: ["PATCH"]
      },
      {
        url: "/conducteur/truck/deletetruck",
        methods: ["DELETE"]
      },
      {
        url: "/upload",
        methods: ["POST"]
      },
      {
        url: "/users/test",
        methods: ["POST"]
      },
      
    ],
  })
);



app.use(express.json());

// initialize routes
app.use("/users", require("./routes/users.routes"));

app.use("/conducteur", require("./routes/conducteur.routes"));

app.use("/users/offer", require("./routes/useroffer.routes"));

app.use("/conducteur/offer", require("./routes/conducteuroffer.routes"));

app.use("/users/deliveryType", require("./routes/deliveryType.routes"));

app.use("/conducteur/truck", require("./routes/truck.routes"));


// middleware for error responses
app.use(errors.errorHandler);

// listen for requests
app.listen(4000, () => {
  console.log("Ready to Go!");
});