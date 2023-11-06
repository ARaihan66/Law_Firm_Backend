const practiceAreaModel = require("../models/PracticeAreaModel");

// Create practice area
const addPracticeArea = async (req, res) => {
  const { service_type, service_description } = req.body;

  if (!service_type || !service_description) {
    return res.status(400).json({
      success: false,
      message: "No service available rightnow",
    });
  }

  const practiceArea = await practiceAreaModel.create({
    service_type,
    service_description,
  });

  res.status(200).json({
    message: "Add successfully.",
    data: practiceArea,
  });
};

//Get practice area data
const getPracticeAreaData = async (req, res) => {
  const getData = await practiceAreaModel.find();

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
};

// Update post
const updateFAQ = async (req, res) => {
  const { id, question, answer } = req.body;

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
    message: "Successfully updated!!!",
    data: updatedFAQ,
  });
};

// Delete FAQs
const deleteFAQs = async (req, res) => {
  const { id } = req.body;
  const deletedFAQ = await FAQsModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Successfully deleted!!!",
  });
};

module.exports = { addPracticeArea, getPracticeAreaData };
