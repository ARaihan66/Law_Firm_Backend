const {Schema,model} = require("mongoose");


const FAQsSchema = Schema({
question :{
    type:String,
    required:[true, "Please add question first!!!"]
},


answer:{
    type:String,
    required:[true, "Please add answer of the above question"]
}

},{ timestamps: true })

const FAQsModel = model("FAQs", FAQsSchema);

module.exports = FAQsModel;