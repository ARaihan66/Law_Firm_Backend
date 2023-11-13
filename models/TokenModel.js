const { Schema, model } = require("mongoose");

const tokenSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "admin",
      unique: true,
    },

    token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const tokenModel = model("token", tokenSchema);
module.exports = tokenModel;
