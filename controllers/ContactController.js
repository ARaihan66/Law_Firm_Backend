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
      success:true,
      message: "Contact add successfully",
      data: contactData,
    });
  } catch (error) {
    res.status(401).json({
      success:false,
      message:error.message
    });
  }
};

// Get all contact data
const getContactData = async (req, res) => {
  try {
    const getData = await contactModel.find();

    res.status(200).json({
      success:true,
      message: "Get all contact data successfully",
      data: getData,
    });
  } catch (error) {
    res.status(401).json({
      success:false,
      message: error.message,
    });
  }
};

// Delete contact
const deleteContactData = async(req,res)=>{
  try {
    const id = req.params.id;

    const deletedContact = await contactModel.findByIdAndDelete(id);

    res.status(200).json({
      success:true,
      message:'Delete contact data successfully.',
    })
  } catch (error) {
    res.status(401).json({
      message:'failed',
    })
  }
}

module.exports = { addContactData, getContactData,deleteContactData };
