const {Schema, model} = require("mongoose");


const advocateSchema = Schema({
    name:{
        type: String,
        required: [true, "Please provide advocate name"]
    },

    experience:{
        type: String,
        required: [true, "Please provide experience"]
    },

    designation:{
        type: String,
        required: [true, "Please provide designation"]
    },

    description:{
        type:String,
        required:[true, "Please provide description"]
    },

    imageUrl:{
        type:String,
        require:true
    }
})

const advocateModel = model ("Advocate", advocateSchema)

module.exports = advocateModel;