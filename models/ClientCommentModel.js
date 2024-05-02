const { Schema, model } = require("mongoose");

const clientCommentSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Provide your name"],
    },
    phone: {
      type: String,
      required: [true, "Provide your phone number"],
    },
    email: {
      type: String,
      required: [true, "Provide your email"],
    },
    comment: {
      type: String,
      required: [true, "Provide your comment"],
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const clientComentModel = model("Client_Comment", clientCommentSchema);

module.exports = clientComentModel;
