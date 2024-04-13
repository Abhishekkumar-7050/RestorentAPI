const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
const Person = require("./models/Person");
require("dotenv").config();
app.use(bodyParser.json()); // req.body // need to install bodyparser npm i bodyparser
 const passport = require('./auth')

// app.get("/", (req, res) => {
//   console.log("yes working");
//   res.send("yes working");
// });


// middleware function for logging
// const logRequest = (req, res, next) => {
//   console.log(
//     `[${new Date().toLocaleString()}] Request Made to : ${req.url}`
//   );
//   next(); // imp
// };
// // app.use(logRequest);


app.use(passport.initialize());
const localAuthMiddleare =  passport.authenticate('local',{session:false});
app.get('/', (req, res)=>{
  res.send('WelCome to our Hotel');
})



const menuRoutes = require("./routes/menuRoutes");
app.use("/menuitem",localAuthMiddleare, menuRoutes);

const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
  console.log("lestening on port", PORT);
});
