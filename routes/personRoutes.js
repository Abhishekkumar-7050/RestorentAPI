const express = require ('express');

const router = express.Router();
const Person = require("../models/Person");



router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      const respons = await newPerson.save();
      console.log("save sucsessfully");
      res.status(200).json(respons);
    } catch (error) {
      console.log(error);
      res.status(501).json(err, "internal server error");
    }
  });
  
  router.get("/", async (req, res) => {
    try {
      const respons = await Person.find();
      console.log("person data fetched sucsessfully");
      res.status(200).json(respons);
    } catch (error) {
      console.log(error);
      res.status(501).json(error, "internal server error");
    }
  });
  // req api with parameter
  router.get("/:worktype", async (req, res) => {
    try {
      const worktype = req.params.worktype;
      if (
        worktype === "chef" ||
        worktype === "manager" ||
        worktype === "waiter"
        ) {
        const respons = await Person.find({ work: worktype });
        console.log(" Person with parameter fetched");
        res.status(200).json(respons);
       }
      else{
      res.status(404).json({error: "invalid workType"});
      }
    } catch (error) {
      console.log(error);
      res.status(501).json(error, "internal server error");
    }
  });

  // to updare the document
  router.put('/:id', async(req, res)=>{
    try {
        const personId = req.params.id;
        const dataToupadate = req.body;
        
        const updatedPersonData = await Person.findByIdAndUpdate(personId,dataToupadate,{
            new: true , // return updated document
            runValidators: true // run mongoose validations
        });
       if(!updatedPersonData){
        return res.status(404).json({error: "Person Not Found"});
       }
       return res.status(200).json(updatedPersonData);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }


  })

  // to delete the document
  router.delete('/:id', async(req, res)=>{
    try {
        const personId = req.params.id;
        
       
        const deletedPersonData = await Person.findByIdAndDelete(personId);
       
       if(!deletedPersonData){
        return res.status(404).json({error: "Person Not Found"});
       }
       return res.status(200).json(deletedPersonData);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "internal server error"});
    }


  })



module.exports = router;