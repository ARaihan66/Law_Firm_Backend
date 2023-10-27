const {Schema,model} = require("mongoose");


const caseSchema = Schema({
    caseWon:{
        type:String,
        required:true
    },

    numberOfLawers:{
        type:String,
        required:true 
    },

    freeConsultation:{
        type:String,
        required:true
    },

    caseDismissed:{
        type:String,
        required:true
    }
})


const caseModel = model("Case", caseSchema);
module.exports = caseModel;


