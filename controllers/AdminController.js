const adminModel = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const tokenModel = require("../models/TokenModel");
const SendEmail = require("../utils/SendEmail");

// Register controller for the single admin
const adminRegister = async (req, res) => {
  try {
    // Check if an admin already exists
    const existingAdmin = await adminModel.findOne();

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "An admin already exists. Registration not allowed.",
      });
    }

    // If no admin exists, create a new admin
    const { email, password } = req.body;

    // Create the admin
    const admin = new adminModel({
      email,
      password,
    });

    // Save the admin to the database
    await admin.save();

    // Create token
    const token = await new tokenModel({
      userId: admin._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    // Save token to the database
    await token.save();

    // Create verification url
    const url = `${process.env.BASE_URL}/api/admin/${admin._id}/verify/${token.token}`;

    // Send email data
    await SendEmail(admin.email, "Verify Email", url);

    res.status(200).json({
      success: true,
      message: "An Email sent to your account please verify.",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify email
const adminEmailVerify = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.params.token;

    // Find admin from database
    const verifyAdmin = await adminModel.findOne({ _id: id });

    if (!verifyAdmin) {
      res.status(400).json({
        success: false,
        message: "The link is not valid",
      });
    }

    const storeToken = await tokenModel.findOne({
      userId: verifyAdmin._id,
      token: token,
    });

    if (!storeToken) {
      res.status.json({
        success: false,
        message: "The link is not valid",
      });
    }

    await adminModel.updateOne({ _id: verifyAdmin._id, verify: true });

    await tokenModel.findByIdAndDelete({ _id: storeToken._id });

    res.status(200).json({
      success: true,
      message: "Email verification done",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login controller
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found.",
      });
    }

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password.trim(), admin.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password incorrect.",
      });
    }

    // Create JWT token
    const jwtToken = await jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Set the token as a cookie
    res.cookie("token", jwtToken, { maxAge: 86400000, httpOnly: true });

    // Password matches - respond with successful login
    res.status(200).json({
      success: true,
      message: "Login successful.",
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Password change controller
const changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    // Find the admin by email
    const admin = await adminModel.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found with this email.",
      });
    }

    // Compare the provided old password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(oldPassword, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect.",
      });
    }

    // Update the password for the admin
    admin.password = newPassword;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin Log out
const adminLogOut = async (req, res) => {
  try {
    // Clear the 'token' cookie to log out the admin
    res.clearCookie("token");

    // Send a response indicating successful logout
    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    // Handle any unexpected errors during logout
    console.error("Logout Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = adminLogOut;


module.exports = {
  adminRegister,
  adminEmailVerify,
  adminLogin,
  changePassword,
  adminLogOut,
};
