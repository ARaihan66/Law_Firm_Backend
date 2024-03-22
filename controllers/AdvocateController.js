const advocateModel = require("../models/AdvocateModel");

//Add advocate
const addAdvocate = async (req, res) => {
  try {
    const imageUrl = req.file.filename;
    const { name, experience, designation, description } = req.body;

    const advocate = await advocateModel.create({
      name,
      experience,
      designation,
      description,
      imageUrl,
    });

    res.status(200).json({
      success: true,
      message: "Add advocate successfully",
      data: advocate,
    });
  } catch (error) {
    res.status(402).json({
      success: false,
      message: error.message,
    });
  }
};

//Get advocate info
const getAdvocateInfo = async (req, res) => {
  try {
    const getData = await advocateModel.find();

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

// Update advocate info
const updateAdvocate = async (req, res) => {
  try {
    const id = req.params.id;
    let imageUrl;

    // Check if a new file is provided in the request
    if (req.file) {
      imageUrl = req.file.filename;
    }

    const { name, experience, designation, description } = req.body;

    const updateFields = {
      name,
      experience,
      designation,
      description,
    };

    // Add imageUrl to updateFields if it exists
    if (imageUrl) {
      updateFields.imageUrl = imageUrl;
    }

    const updatedAdvocate = await advocateModel.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Update advocate data.",
      data: updatedAdvocate,
    });
  } catch (error) {
    res.status(402).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove advocate
const deleteAdvocate = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedAdvocate = await advocateModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addAdvocate,
  getAdvocateInfo,
  updateAdvocate,
  deleteAdvocate,
};
