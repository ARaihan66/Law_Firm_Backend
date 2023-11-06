const contactModel = require("../models/ContactModel");

// Get all contact data
const getContactData = async (res, req) => {
  try {
    const getData = await contactModel.find();

    res.status(200).json({
      message: "successful",
      data: getData,
    });
  } catch (error) {
    res.status(200).json({
      message: "successful",
      data: error.message,
    });
  }
};
