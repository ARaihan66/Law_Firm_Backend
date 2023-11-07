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
      message: "successful",
      data: clientComment,
    });
  } catch (error) {
    res.status(401).json({
      message: "failed",
      data: error.message,
    });
  }
};

// Get client all comment
const getAllComment = async (req, res) => {
  try {
    const getData = await clientComentModel.find();

    if (!getData) {
      res.status(200).json({
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

//Delete client comment
const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedComment = await clientComentModel.findByIdAndDelete(id);

    res.status(200).json({
      message: "successful",
    });
  } catch (error) {
    res.status(401).json({
      message: "failed",
    });
  }
};

module.exports = { createComment, getAllComment, deleteComment };
