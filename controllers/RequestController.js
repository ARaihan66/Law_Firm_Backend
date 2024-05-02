
const requestModel = require("../models/RequestModel");

//add request
const addRequest = async (req, res) => {
  try {
    const {
      name,
      phoneNo,
      email,
      subject,
      expectedDate,
      selectedLawer,
      requestMessage,
    } = req.body;

    const storeRequest = await requestModel.create({
      name,
      phoneNo,
      email,
      subject,
      expectedDate,
      selectedLawer,
      requestMessage,
    })

    res.status(200).json({
        success:true,
        request:storeRequest
    })
  } catch (error) {
    res.status(401).json({
        success:true,
        message: error.message
    })

  }
};

//get request
const getRequest = async(req,res)=>{
try {
    const getRequest =  await requestModel.find();
    
    res.status(200).json({
        success:true,
        message: "Successfully get all request data",
        data:getRequest
    })
} catch (error) {
    res.status(401).json({
        success:false,
        message:error.message
    })
}
}

//delete request
const deleteRequest = async(req,res){
    try {
        const id = req.params.id;

        const deletedRequest = await requestModel.findByIdAndDelete(id);

        res.status(200).json({
            success:true,
            message:"Request data is deleted successfully.",
            data:deletedRequest
        })

    } catch (error) {
        res.status(401).json({
            suceess:false,
            message:error.message
        })
    }
}

module.exports = {addRequest,getRequest, deleteRequest};
