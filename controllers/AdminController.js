const adminModel = require("../models/AdminModel");
const bcrypt = require("bcrypt");

// Admin register
//const adminRegister = async (req, res) => {
//  try {
//    const email = "rasmul@gmail.com";
//    const password = "12345678";

//    const saltRounds = 10;
//    const hashedPassword = await bcrypt.hash(password, saltRounds);

//    const admin = await adminModel.create({
//      email,
//      password: hashedPassword,
//    });

//    res.status(200).json({
//      success: true,
//      message: "Admin registration done.",
//      data: admin,
//    });
//  } catch (error) {
//    res.status(200).json({
//      success: false,
//      message: error.message,
//    });
//  }
//};


// Register controller for the single admin
const adminRegister = async (req, res) => {
  try {
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne();

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'An admin already exists. Registration not allowed.',
      });
    }

    // If no admin exists, create a new admin
    const { email, password } = req.body;

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create the admin
    const admin = new Admin({
      email,
      password: hashedPassword,
    });

    // Save the admin to the database
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Admin registration done.',
      data: admin,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = adminRegister;


// Admin login
const adminLogin = async (req, res) => {
   try {
     const { email, password } = req.body;
 
     const validAdmin = await adminModel.findOne({ email: email });
 
     if (!validAdmin) {
       return res.status(402).json({
         success: false,
         message: "Admin not found with this email.",
       });
     }
 
     const matchPassword = await bcrypt.compare(password, validAdmin.password);
 
     if (!matchPassword) {
       return res.status(401).json({
         success: false,
         message: "Password doesn't match.",
       });
     }
 
     // Password matches - respond with successful login
     res.status(200).json({
       success: true,
       message: "Login successful.",
       data: validAdmin, // Respond with admin data (omit password here for security)
     });
   } catch (error) {
     res.status(500).json({
       success: false,
       message: error.message,
     });
   }
 };
 

module.exports = { adminLogin, adminRegister };
