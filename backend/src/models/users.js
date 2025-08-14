const { timeStamp } = require("console");
const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        min:[1, 'Age must be positive']
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minlength: [7, 'Password must be at least 8 character']
    },
    score:{
        type: Number,
        default: 0
    }
},
{
    timestamps:true
})

const User = mongoose.model('User', userSchema)
module.exports = User