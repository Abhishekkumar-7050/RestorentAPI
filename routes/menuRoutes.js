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
      console.log(error);
      res.status(501).json(err, "internal server error");
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const respons = await MenuItem.find();
      console.log("menuItem fetched Successfully");
      res.status(200).json(respons);
    } catch (error) {
      console.log(error);
      res.status(501).json(err, "internal server error");
    }
  });

  router.put('/:id' , async (req, res) =>{
    try{
      const menuIdToUpdate =  req.params.id;
       const updateToBeData = req.body;
       const updatedMenu =  await MenuItem.findByIdAndUpdate(menuIdToUpdate,updateToBeData,{
        new: true , // return updated document
        runValidators: true // run mongoose validations
       });
         if( !updatedMenu){
            return res.status(500).json("Menu not Found");
         }
         else{
          return res.status(200).json({updateToBeData:"Update Sucessfully"})
         } 
    }
    catch(error){
      console.log("Inetnal Server Error");
      return res.status(501).send("Inetnal Server Error");
    }

  })

  router.delete('/:id', async(req, res) =>{
try {
  const idToBeDelete = req.params.id;

const deletedMenu = await Person.findByIdAndDelete(idToBeDelete);
   if( !deletedMenu){
      return res.status(500).send(" Mene not present ");
   }
   else{
    return res.status(200).send("Menu Deleted SucessFully");
   }
  
} catch (error) {
  console.log("Internal server error");
   return res.status( 501).send("Internal server error");
}    

  })








module.exports = router;