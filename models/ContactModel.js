const { Schema, model } = require("mongoose");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, "Please provide name!!!"],
  },

  email: {
    type: String,
    required: [true, "Please provide email!!!"],
  },
  subject: {
    type: String,
  },

  message: {
    type: String,
    required: [true, "Please provide message!!!"],
  },
});

const contactModel = model("contact", contactSchema);

module.exports = contactModel;
