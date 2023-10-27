const {Schema,model} = require("mongoose");


const FAQsSchema = Schema({
question :{
    type:String,
    required:[true, "Please add question first!!!"],
    unique:true
},

answer:{
    type:String,
    required:[true, "Please add answer of the above question"],
    unique:true
}

},{ timestamps: true })

const FAQsModel = model("FAQs", FAQsSchema);

module.exports = FAQsModel;