const advocateModel = require("../models/AddAdvocateModel");

//Add advocate
const addAdvocate = async (req, res) => {
  try {
    const { name, experience, designation, phoneNumber } = req.body;

    const advocate = await advocateModel.create({
      name,
      experience,
      designation,
      phoneNumber,
    });

    res.status(200).json({
      message: "Successfully advocate created!!!",
      data: advocate,
    });
  } catch (error) {
    res.status(402).json({
      message: error.message,
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

module.exports = { addAdvocate, updateAdvocate };
