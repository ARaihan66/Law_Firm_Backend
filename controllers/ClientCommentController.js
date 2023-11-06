const clientComentModel = require("../models/ClientCommentModel");

// Create comment
const createComment = async (req, res) => {
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
};

// Get all comment
const getAllComment = async(req,res)=>{
const getData = await clientComentModel.find();

if(!getData){
  res.status(200).json({
    message:"failed",
    data:"No one comments yet"
  })
}

res.status(200).json({
  message:"successful",
  data:getData
})
}

module.exports = { createComment,getAllComment };
