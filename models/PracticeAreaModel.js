const { Schema, model } = require("mongoose");

const practiceAreaSchema = Schema(
  {
    service_type: {
      type: String,
      required: [true, "Please add service type first!!!"],
      unique: true,
    },

    service_description: {
      type: String,
      required: [true, "Please add service description!!!"],
      unique: true,
    },
  },
  { timestamps: true }
);

const practiceAreaModel = model("Practice_Area", practiceAreaSchema);

module.exports = practiceAreaModel;
