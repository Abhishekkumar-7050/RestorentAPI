const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required: true
    },
    password:{
        required: true,
        type:String
    }

})
personSchema.pre('save', async function (name) {
    const person = this;
    // hash the password only when the password modified and new
  if(!person.isModified('password')) return next();  // password me modificatin nahi hai

  try {
    // hash password generation
    const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(person.password, salt);
     person.password = hashedPassword;
  } catch (error) {
    return next(error);
  }

})

personSchema.methods.comparePassword = async function (candidatePassword){
    try {
        const isMatched = await bcrypt.compare(candidatePassword, this.password);
        return isMatched;
    } catch (error) {
         throw error;
    }
}

// create a person model           // person nam model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;