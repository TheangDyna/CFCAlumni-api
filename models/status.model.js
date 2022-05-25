const mongoose = require('mongoose');
const statusSchema = new mongoose.Schema({
    major :{
        type:String,
        required: [true, 'Please add a title'],
    },
    job :{
        type: String
    },
    address :{
        type: String
    },
    desciption :{
        type: String
    }
})

const StatussModel = mongoose.model('statuss', statusSchema)

module.exports = StatussModel