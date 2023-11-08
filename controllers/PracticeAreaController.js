const practiceAreaModel = require("../models/PracticeAreaModel");

// Create practice area
const addPracticeArea = async (req, res) => {
  try {
    const { service_type, service_description } = req.body;

    if (!service_type || !service_description) {
      return res.status(400).json({
        success: false,
        message: "Please fill up all field.",
      });
    }

    const practiceArea = await practiceAreaModel.create({
      service_type,
      service_description,
    });

    res.status(200).json({
      success: true,
      message: "Add practice area successfully.",
      data: practiceArea,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

//Get practice area data
const getPracticeAreaData = async (req, res) => {
  try {
    const getData = await practiceAreaModel.find();

    if (!getData) {
      res.status(401).json({
        message: "failed",
        data: "No practice area data has added successfully.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Get practice area data successfully",
      data: getData,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Update practice area data
const updatePracticeAreaData = async (req, res) => {
  try {
    const id = req.params.id;
    const { service_type, service_description } = req.body;

    const updatedFAQ = await practiceAreaModel.findByIdAndUpdate(
      id,
      {
        $set: {
          service_type: service_type,
          service_description: service_description,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Successfully practice area data updated!!!",
      data: updatedFAQ,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete practice area data
const deletePracticeAreaData = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedFAQ = await practiceAreaModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted!!!",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addPracticeArea,
  getPracticeAreaData,
  updatePracticeAreaData,
  deletePracticeAreaData,
};
