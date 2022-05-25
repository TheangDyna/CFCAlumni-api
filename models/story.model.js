const mongoose = require('mongoose');
const storySchema = new mongoose.Schema({
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
        type:String,
        required:[true, 'input your  title'],
        maxLength:[40, 'Title cannot be more than 40 characters']
    },
    description:{
        type:String,
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
        type:Number,
    },

},{timestamps:true})

const StorysModel = mongoose.model('storys', storySchema)

module.exports = StorysModel