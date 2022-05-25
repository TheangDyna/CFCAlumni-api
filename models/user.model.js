const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique : true,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'teacher', 'admin'],
        default: 'user'
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps: true});

const UserModel = mongoose.model('users', UserSchema);

module.exports = UserModel;