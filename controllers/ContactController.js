const contactModel = require("../models/ContactModel");

// Create contact data
const addContactData = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      res.status(402).json({
        message: "Fill the name, email and message field!!!",
      });
    }

    const contactData = await contactModel.create({
      name,
      email,
      subject,
      message,
    });

    res.status(200).json({
      message: "successful",
      data: contactData,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

// Get all contact data
const getContactData = async (req, res) => {
  try {
    const getData = await contactModel.find();

    res.status(200).json({
      message: "successful",
      data: getData,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = { addContactData, getContactData };
