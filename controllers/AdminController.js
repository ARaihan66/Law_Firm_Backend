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
        message: "An admin already exists",
      });
    }

    // If no admin exists, create a new admin
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill up all given field",
      });
    }

    // Create the admin
    const admin = new adminModel({
      username,
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
    const url = `http://localhost:3000/admin/${admin._id}/verify/${token.token}`;

    // Send email data
    await SendEmail(admin.email, "Verify Email", url);

    res.status(200).json({
      success: true,
      message: "An Email sent to your mail please verify",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin email verification
const adminEmailVerify = async (req, res) => {
  try {
    const id = req.params.id;
    const token = req.params.token;

    // Find admin from database
    const verifyAdmin = await adminModel.findOne({ _id: id });

    if (!verifyAdmin) {
      return res.status(400).json({
        success: false,
        message: "The link is not valid.",
      });
    }

    // Check token database is empty or not
    const existToken = await tokenModel.findOne();

    if (!existToken) {
      return res.status(200).json({
        success: true,
        message: "Your mail already verified.",
      });
    }

    // Check token exist or not
    const storeToken = await tokenModel.findOne({
      userId: verifyAdmin._id,
      token: token,
    });

    if (!storeToken) {
      return res.status(400).json({
        success: false,
        message: "The link is not valid",
      });
    }

    // Update admin's verify field
    const updatedAdmin = await adminModel.findByIdAndUpdate(
      verifyAdmin._id,
      { verify: true },
      { new: true } // This option returns the modified document
    );

    if (!updatedAdmin) {
      return res.status(400).json({
        success: false,
        message: "Failed to update admin verification status.",
      });
    }

    // Remove the used token from the database
    await tokenModel.findByIdAndDelete(storeToken._id);

    return res.status(200).json({
      success: true,
      verify: true,
      message: "Email verification done.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill up all given field",
      });
    }

    // Find the admin by email
    const admin = await adminModel.findOne({ email: email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Email or Password is incorrect",
      });
    }

    if (admin.verify !== false) {
      // Compare the provided password with the hashed password from the database
      const passwordMatch = await bcrypt.compare(
        password.trim(),
        admin.password
      );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Email or Password is Incorrect",
        });
      }

      // Create JWT token
      const jwtToken = await jwt.sign(
        { id: admin._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
      );

      res
        .status(200)
        .cookie("JWT", jwtToken, {
          expires: new Date(Date.now() + 2000 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        })
        .json({
          success: true,
          message: "Login successful.",
        });
    } else {
      return res.status(200).json({
        success: false,
        message: "Please Verify your mail first.",
      });
    }
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
    const id = res.id;
    console.log(id);

    // Find the admin by email
    const admin = await adminModel.findOne({ id });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Please login aganin",
      });
    }

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill up all given field",
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

// Forgot password
const adminForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email is provided
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Find admin by email
    const admin = await adminModel.findOne({ email });

    // Check if admin exists
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Please provide the correct email",
      });
    }

    // Check token database is empty or not
    const existToken = await tokenModel.findOne();

    if (existToken) {
      return res.status(200).json({
        success: true,
        message: "Aleady a link has been sent to your mail",
      });
    }

    // Create token
    const token = await new tokenModel({
      userId: admin._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    // Check if token creation fails
    if (!token) {
      return res.status(500).json({
        success: false,
        message: "Token creation failed",
      });
    }

    // Save token to the database
    await token.save();

    // Create verification URL
    const url = `http://localhost:3000/admin/${admin._id}/reset/${token.token}`;

    // Send email data
    try {
      await SendEmail(admin.email, "Verify Email", url);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      // Handle the email sending error
      return res.status(500).json({
        success: false,
        message: "Error in sending email",
      });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "An email has been sent to your account",
    });
  } catch (error) {
    console.error("Error in forget password:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Reset password
const adminResetPassword = async (req, res) => {
  try {
    const { id, token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill up all given field",
      });
    }

    // Check if newPassword and confirmPassword match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password does not match",
      });
    }

    // Find the token in the database
    const resetToken = await tokenModel.findOne({ userId: id, token: token });

    // Check if the token exists
    if (!resetToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired link",
      });
    }

    // Find the user by userId
    const admin = await adminModel.findById(id);

    // Check if the user exists
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Update the user's password
    admin.password = newPassword;

    // Save the updated user
    await admin.save();

    // Remove the used token from the database
    await tokenModel.findByIdAndDelete(resetToken._id);

    // Return success response
    res.status(200).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Admin Log out
const adminLogOut = async (req, res) => {
  try {
    // Clear the 'token' cookie to log out the admin
    res.clearCookie("JWT");

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

//Get admin info
const getAdminInfo = async (req, res) => {
  try {
    const getData = await adminModel.find();

    if (!getData) {
      res.status(401).json({
        success: false,
        message: "No advocate data has added yet.",
      });
    }

    res.status(200).json({
      success: true,
      data: getData,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Add admin info
const addAdmin = async (req, res) => {
  try {
    const id = req.id;
    let imageUrl;

    //console.log("ID:-------", id);

    // Check if a new file is provided in the request
    if (req.file) {
      imageUrl = req.file.filename;
    }

    console.log("File:-----", req.file);

    const { instituteName, about } = req.body;

    console.log(req.body);

    const updateFields = {
      instituteName,
      about,
    };

    //console.log("Institute: ", instituteName);
    //console.log("About ", about);

    // Add imageUrl to updateFields if it exists
    if (imageUrl) {
      updateFields.imageUrl = imageUrl;
    }

    console.log("Image Url:---", imageUrl);

    const updatedAdmin = await adminModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    const existAdmin = await adminModel.findOne();
    //console.log("Admin Info:", existAdmin);

    res.status(200).json({
      success: true,
      message: "Successfully added data",
      data: existAdmin,
    });
  } catch (error) {
    res.status(402).json({
      success: false,
      message: error.message,
    });
  }
};

// Update admin info
const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    let imageUrl;

    // Check if a new file is provided in the request
    if (req.file) {
      imageUrl = req.file.filename;
    }

    console.log("File:---", req.file);

    const { instituteName, about } = req.body;

    const updateFields = {
      instituteName,
      about,
    };

    // Add imageUrl to updateFields if it exists
    if (imageUrl) {
      updateFields.imageUrl = imageUrl;
    }

    console.log(updateFields);

    const updatedAdvocate = await adminModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Updated admin data",
      data: updatedAdvocate,
    });
  } catch (error) {
    res.status(402).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  adminRegister,
  adminEmailVerify,
  adminLogin,
  changePassword,
  adminForgotPassword,
  adminResetPassword,
  adminLogOut,
  getAdminInfo,
  addAdmin,
  updateAdmin,
};
