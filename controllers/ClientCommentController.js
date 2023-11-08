const clientComentModel = require("../models/ClientCommentModel");

// Create client comment
const createComment = async (req, res) => {
  try {
    const { name, phone, email, comment } = req.body;

    if (!name || !phone || !email || !comment) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the field",
      });
    }
    const clientComment = await clientComentModel.create({
      name,
      phone,
      email,
      comment,
    });

    res.status(200).json({
      success: true,
      message: "Add client comment successfully",
      data: clientComment,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

// Get client all comment
const getAllComment = async (req, res) => {
  try {
    const getData = await clientComentModel.find();

    if (!getData) {
      res.status(200).json({
        success: true,
        message: "No one comments yet",
      });
    }

    res.status(200).json({
      success: true,
      message: "Get all comment successfully",
      data: getData,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

//Delete client comment
const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedComment = await clientComentModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Delete successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createComment, getAllComment, deleteComment };
