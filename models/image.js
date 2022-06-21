const mongoose = require('mongoose');
const schema = mongoose.Schema;
const imageSchema = new schema(
    {
    name:{
        type:String,
    },
    image:{
        data:Buffer,
        contentType:String,
    }
})

module.exports = mongoose.model('Image',imageSchema)