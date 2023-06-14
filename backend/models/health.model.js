const mongoose = require('mongoose')
const Schema = mongoose.Schema

const healthSchema = new Schema({

    firstname:{
        type: String,
        required: true,
        trim: true
    },
    lastname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    temperature:{
        type: Number,
        required: true,
        trim: true
    },
    phonenumber:{
        type: Number,
        required: true,
        trim: true
    }

}, {
    timestamps:true
});


const Health = mongoose.model('health', healthSchema);

module.exports = Health;