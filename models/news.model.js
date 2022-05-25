const mongoose = require('mongoose');
const newsSchema = new mongoose.Schema({
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    coverName: [
        {
            type: String,
        }

    ],
    title: {
        type: String,
        maxLength: [40, 'Title cannot be more than 40 characters'],
    },
    description: {
        type: String,
        maxLength: [300, 'Description cannot be more than 300 characters']
    },
    category: {
        type: String,
        // required: [true, 'Please add a category'],
    },
    react: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            // required: true,
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
    share: {
        type: Number
    },
    
}, { timestamps: true })

const NewsModel = mongoose.model('news', newsSchema)

module.exports = NewsModel