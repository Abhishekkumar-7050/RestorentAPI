const express = require("express");

const router = express.Router();
const Person = require("../models/Person");
const { generateToken, jwtAuthMiddleware } = require("../jwt.js");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const respons = await newPerson.save();
    console.log("save sucsessfully");
    const payload = {
      id: respons.id,
      username: respons.username,
    };
    const token = generateToken(payload);
    console.log(" token is", token);
    res.status(200).json({ Respons: respons, Token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "internal server error" });
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const respons = await Person.find();
    console.log("person data fetched sucsessfully");
    res.status(200).json(respons);
  } catch (error) {
    console.log(error);
    res.status(501).json(error, "internal server error");
  }
});
// to get the profile of authrized user withe help of jwt token

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userdata = req.user;
    const userId = userdata.id;
    console.log(userId);
    const user = await Person.findById(userId);
    if( !user){
      return res.status(401).send("user not found");
    }
     res.status(201).send(user);
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
    } else {
      res.status(404).json({ error: "invalid workType" });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json(error, "internal server error");
  }
});

// to updare the document
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const dataToupadate = req.body;

    const updatedPersonData = await Person.findByIdAndUpdate(
      personId,
      dataToupadate,
      {
        new: true, // return updated document
        runValidators: true, // run mongoose validations
      }
    );
    if (!updatedPersonData) {
      return res.status(404).json({ error: "Person Not Found" });
    }
    return res.status(200).json(updatedPersonData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

// to delete the document
router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const deletedPersonData = await Person.findByIdAndDelete(personId);

    if (!deletedPersonData) {
      return res.status(404).json({ error: "Person Not Found" });
    }
    return res.status(200).json(deletedPersonData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    // extract the username and password from the body
    const { username, password } = req.body;

    const user = await Person.findOne({ username: username });
    //  if(!user){
    //   res.status(401).json({error:" user is not present"})
    //  }
    if (!user || !(await user.comparePassword(password))) {
      console.log(" invlaid user name and password");
      return res.status(401).json({ error: "Invalid username and password" });
    }
    // generate token
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    res.json({ token });
  } catch (error) {
    console.log(error, "error");
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
