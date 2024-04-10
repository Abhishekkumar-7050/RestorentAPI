const mongoose  = require('mongoose');

const menuItemSchema = mongoose.Schema({
name:{
    type:String,
    required:true
},
price:{
    type: Number,
    required:true,
    default:300
},
taste:{
    type:String,
    enum:['sweet', 'syicy', 'sour'],
    required:true
},
is_drink:{
    type:Boolean,
    default:false
},
ingredients:{
    type:[String],
    default:[]
},
num_sales:{
    type:Number,
    default: 0
}


})
const MenuItem = mongoose.model('MenuItem',menuItemSchema);
module.exports = MenuItem