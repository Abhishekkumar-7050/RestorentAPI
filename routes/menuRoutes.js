const express = require("express");
const MenuItem = require('../models/MenuItem');
const Person = require("../models/Person");
const router = express.Router();


router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      const respons = await newMenu.save();
      console.log("New menu save sucsessfully");
      res.status(200).json(respons);
    } catch (error) {
      console.log(err);
      res.status(501).json(err, "internal server error");
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const respons = await MenuItem.find();
      console.log("menuItem fetched Successfully");
      res.status(200).json(respons);
    } catch (error) {
      console.log(err);
      res.status(501).json(err, "internal server error");
    }
  });










module.exports = router;