const { string } = require("joi");
const mongoose = require("mongoose");
const schema = mongoose.Schema;
const alienSchema = new schema(
    {
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    pwd:{
        type:String,
        required:true
    },
    cpwd:{
        type:String,
        required:true
    },
    token:{
        type:String,
        default:''
    }
})

module.exports = mongoose.model('Alien',alienSchema)