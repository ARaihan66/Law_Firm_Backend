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
      message: "Add advocate data.",
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
        success:false,
        message: "No advocate data has added yet.",
      });
    }

    res.status(200).json({
      success:true,
      message: "Successfully get advocate data.",
      data: getData,
    });
  } catch (error) {
    res.status(401).json({
      success:false,
      message: error.message,
    });
  }
};

// Update advocate info
const updateAdvocate = async (res, req) => {
  try {
    const id = req.params.id;
    const { name, experience, designation, phoneNumber } = req.body;

    const updatedAdvocate = await advocateModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          experience,
          designation,
          phoneNumber,
        },
      },
      { new: true }
    );

    res.status(200).json({
      success:true,
      message: "Update advocate data.",
      data: updatedAdvocate,
    });
  } catch (error) {
    res.status(402).json({
      success:false,
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
      success:true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(200).json({
      success:false,
      message: error.message,
    });
  }
};

module.exports = { addAdvocate, getAdvocateInfo, updateAdvocate };
