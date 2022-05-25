const mongoose = require('mongoose');
const newSchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    coverName: [
        {
            type: String,
            required: true,
        }
    ],
    title:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:String,
        required:[true,'Please select an event category'],
    },
    react: [
        {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true,
        }
    ],
    comment: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    share:{
        type:Number
    },
    member:[
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:'users',
            required:true,
        }
    ]
},{timestamps:true})

const EventsModel = mongoose.model('events', newSchema)

module.exports = EventsModel