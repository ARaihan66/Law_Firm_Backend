const FAQsModel = require("../models/FAQsModel");

// Create FAQ's
const addFAQs = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the field",
      });
    }

    const FAQ = await FAQsModel.create({
      question,
      answer,
    });

    res.status(200).json({
      success: true,
      message: "Add FAQ successfully.",
      data: FAQ,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

//Get all FAQ
const getAllFAQs = async (req, res) => {
  try {
    const getData = await FAQsModel.find();

    if (!getData) {
      res.status(401).json({
        success: false,
        message: "No FAQ's added yet.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Get all FAQ data successfully.",
      data: getData,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Update FAQ's
const updateFAQs = async (req, res) => {
  try {
    const id = req.params.id;
    const { question, answer } = req.body;

    const updatedFAQ = await FAQsModel.findByIdAndUpdate(
      id,
      {
        $set: {
          question: question,
          answer: answer,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Update FAQ's successfully",
      data: updatedFAQ,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete FAQs
const deleteFAQs = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFAQ = await FAQsModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Delete FAQ's successfully.",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addFAQs, getAllFAQs, updateFAQs, deleteFAQs };
