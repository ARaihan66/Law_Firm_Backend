//const { Schema, model } = require("mongoose");

//const adminSchema = Schema({
//  email: {
//    type: String,
//    required: [true, "Please provide email."],
//  },
//  password: {
//    type: String,
//    required: [true, "Please provide password."],
//  },
//});

//const adminModel = model("admin", adminSchema);
//module.exports = adminModel;

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide email."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
  },
});

// Pre-hook before saving an admin, checks if an admin already exists
adminSchema.pre("save", async function (next) {
  // Check if there are any documents in the collection
  const adminModel = mongoose.model("admin", adminSchema);
  const count = await adminModel.countDocuments().exec();

  if (count > 0) {
    const err = new Error("Only one admin is allowed.");
    return next(err);
  }

  next();
});

// Pre-hook to hash the password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
