const mongoose = require('mongoose')

const testSchema = mongoose.Schema({
    title:{ type: String},
    description: {type: String},
    version: {type: String},
    duration:{
        type: Number,
        default: 60
    },
    sections:[
        {
            type: mongoose.Schema.Types.ObjectId,
            refPath:"sectionsModel"
        }
    ],
    sectionsModel:{
        type: String,
        enum: ['Listening', 'Reading', 'Writing', 'Speaking']
    }
},
{
    timestamps: true
})
const Test = mongoose.model('Test', testSchema)
module.exports = Test