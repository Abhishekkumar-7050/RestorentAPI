const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
require('dotenv').config();
app.use(bodyParser.json()); // req.body // need to install bodyparser npm i bodyparser

app.get("/", (req, res) => {
  console.log("yes working");
  res.send("yes working");
});


const menuRoutes = require('./routes/menuRoutes');
app.use('/menuitem',menuRoutes);

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes); 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("lestening on port", PORT);
});
