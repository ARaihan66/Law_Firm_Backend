const FAQsModel = require("../models/FAQsModel");

// Create FAQ
const addFAQs = async (req, res) => {
  try {
    const { question, answer } = req.body;
    
    console.log(question, answer)

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
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
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all FAQs
const getAllFAQs = async (req, res) => {
  try {
    const getData = await FAQsModel.find();

    if (!getData || getData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No FAQs added yet.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Get all FAQ data successfully.",
      data: getData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update FAQ
const updateFAQs = async (req, res) => {
  try {
    const id = req.params.id;
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const updatedFAQ = await FAQsModel.findByIdAndUpdate(
      id,
      {
        $set: {
          question,
          answer,
        },
      },
      { new: true }
    );

    if (!updatedFAQ) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Update FAQ successfully",
      data: updatedFAQ,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete FAQ
const deleteFAQs = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFAQ = await FAQsModel.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return res.status(404).json({
        success: false,
        message: "FAQ not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Delete FAQ successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { addFAQs, getAllFAQs, updateFAQs, deleteFAQs };
