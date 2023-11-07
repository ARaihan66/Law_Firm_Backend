const FAQsModel = require("../models/FAQsModel");

// Create post
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
      message: "Add successfully.",
    });
  } catch (error) {
    res.status(401).json({
      message: "failed",
      data: error.message,
    });
  }
};

//Get all FAQ
const getAllFAQ = async (req, res) => {
  try {
    const getData = await FAQsModel.find();

    if (!getData) {
      res.status(401).json({
        message: "failed",
        data: "No one comments yet",
      });
    }

    res.status(200).json({
      message: "successful",
      data: getData,
    });
  } catch (error) {
    res.status(401).json({
      message: "failed",
      data: error.message,
    });
  }
};

// Update post
const updateFAQ = async (req, res) => {
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
      message: "successful",
      data: updatedFAQ,
    });
  } catch (error) {
    res.status(401).json({
      message: "failed",
      data: error.message,
    });
  }
};

// Delete FAQs
const deleteFAQs = async (req, res) => {
  try {
    const { id } = req.params.id;
    const deletedFAQ = await FAQsModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "successful",
    });
  } catch (error) {
    res.status(200).json({
      message: "falied",
      data: error.message,
    });
  }
};

module.exports = { addFAQs, getAllFAQ, updateFAQ, deleteFAQs };
