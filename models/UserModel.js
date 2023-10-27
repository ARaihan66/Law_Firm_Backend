const {Schema, model} = require("mongoose");

const userSchema = Schema({
    name:{
        type:String,
        required:[true, "Please provide your name!!!"]
    },

    phoneNumber :{
        type: String,
        required:[true, "Please provide phone number"]
    },

    whatsAppNumber:{
        type: String,
        required:[true, "Please provide phone number"]
    },
    email:{
        type: String,
        required:[true, "Please provide email"]
    },

})

const userModel = model("User", userSchema);
module.exports = userModel;