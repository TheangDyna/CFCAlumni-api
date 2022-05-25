const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, ' input user name ']
    },
    email:{
        type :String,
        unique:true,
        required:[true, 'email is require']
    },
    password:{
        type :String,
        required:[true, 'password is require']
    },
    role:{
        type:String,
        enum: ['user','teacher','admin'],
        default:'user',

    },

},{timestamps:true})

const StudentsModel = mongoose.model('students', studentSchema)

module.exports = StudentsModel