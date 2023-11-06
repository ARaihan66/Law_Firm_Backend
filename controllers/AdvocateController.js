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
      message: "Successfully advocate created!!!",
       data: advocate
    });
  } catch (error) {
    res.status(402).json({
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
        message: "failed",
        data: "No one comments yet",
      });
    }

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

// Update advocate info
const updateAdvocate = async (res, req) => {
  try {
    const { id, name, experience, designation, phoneNumber } = req.body;

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
      message: "Advocate info updated successfully",
      data: updatedAdvocate,
    });
  } catch (error) {
    res.status(402).json({
      message: error.message,
    });
  }
};

// Remove advocate
const deleteAdvocate = async (req, res) => {
  try {
    const { id } = req.body;

    const deletedAdvocate = await advocateModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(200).json({
      message: error.message,
    });
  }
};

module.exports = { addAdvocate, getAdvocateInfo, updateAdvocate };
