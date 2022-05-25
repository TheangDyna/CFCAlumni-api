const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    profileName:{
        type:String,
        required:[true, 'Please add a profilename']
    },
    fristName:{
        type:String,
        required:[true, 'input your fristname ']
    },
    lastName:{
        type:String,
        required:[true, 'input your lastname ']
    },
    gender:{
        type:String,
        required:[true,'Please select gender']
    },
    birthdate:{
        type:String,
        required:[true, 'input your date of birth ']
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
    contact:{
        type:String,
        required:[true, 'Please add email or Phone ...']
    },
    grade:{
        type:String,
        required:[true,'Please select your class']
    },
    status:{
        type:Array,
    },
    bio:{
        type:String,
    },
    role:{
        type:String,
        enum: ['user','teacher','admin'],
        default:'user',
    },
},{timestamps:true})

const UsersModel = mongoose.model('users', userSchema)

module.exports = UsersModel