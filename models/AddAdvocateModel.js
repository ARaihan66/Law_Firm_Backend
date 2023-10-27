const {Schema, model} = require("mongoose");


const advocateSchema = Schema({
    name:{
        type: String,
        required: [true, "Please provide advocate name"]
    },

    experience:{
        type: String,
        required: [true, "Please provide experience name"]
    },

    designation:{
        type: String,
        required: [true, "Please provide designation name"]
    },

    phoneNumber:{
        type:String
    }
})

const advocateModel = model ("Advocate", advocateSchema)

module.exports = advocateModel;