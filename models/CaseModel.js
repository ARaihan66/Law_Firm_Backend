const { Schema, model } = require("mongoose");

const caseSchema = Schema({
  achievement: {
    type: String,
    required: true,
  },
  numeric: {
    type: Number,
    required: true,
  },

  operator:{
    type:String,
    required:true
  }
});

const caseModel = model("Case", caseSchema);
module.exports = caseModel;
