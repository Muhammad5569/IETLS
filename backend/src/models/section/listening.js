const mongoose = require('mongoose')

const listeningSchema = mongoose.Schema({
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        required: true,  
    },
    htmlContext:{
        type: String,
        required: true
    },
    inputs:[
        {
            id:{ type: String, required: true},
            type:{type: String, enum:['text', 'chechbox', 'radio'], required: true},
            correctAnswer:{type:mongoose.Schema.Types.Mixed},
            label:{type: String}
        }   
    ]
},
{
    timestams: true
})

const Listening = mongoose.model('Listening', listeningSchema)
module.exports = Listening