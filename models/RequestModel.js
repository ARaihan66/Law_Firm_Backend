const { Timestamp } = require("mongodb");
const { Schema, model } = require("mongoose");

const requestSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },

    phoneNo: {
      type: String,
    },

    email: {
      type: String,
      required: [true, "Please provide your email"],
    },

    subject: {
      type: String,
    },

    expectedDate: {
      type: Date,
      required: [true, "Please select a date"],
    },

    selectedLawer: {
      type: String,
      required: [true, "Please select a lawer"],
    },

    requestMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

const requestModel = model("request", requestSchema);

module.exports = requestModel;
