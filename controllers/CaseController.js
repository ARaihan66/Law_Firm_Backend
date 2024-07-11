
const caseModel = require("../models/CaseModel");

//Add case history
const addCaseHistory = async(req,res)=>{
    try {
        const {achievement,numeric} = req.body;

    const caseHistory = await caseModel.create({
        achievement,
        numeric
    })


    if(!achievement || !numeric){
        res.status(400).json({
            success:false,
            message:"Please fill up all the given field",
        })
    }

    res.status(200).json({
        success:true,
        message:"Case history has added successfully!!!",
        data:caseHistory,
    })
    } catch (error) {
        res.status(402).json({
            success:false,
            message: error.message
        })  
    }
}

// Get case history
const getCaseHistory = async(req,res)=>{   
    try {
        const getData = await caseModel.find();
        res.status(200).json({
            success:true,
            data : getData
        })
    } catch (error) {
        res.status(401).json({
            success:false,
            message:error.message
        })
    }
}

// Update case history
const updateCase = async(req,res)=>{

    try {
        const id = req.params.id;
        const { achievement,numeric} = req.body;

        const updatedCase = await caseModel.findByIdAndUpdate( id, {
            $set:{
                achievement,
                numeric
            }
        },{new:true})

        res.status(200).json({
            success:true,
            message:"Updated successfully!!!",
            data : updatedCase
        })

    } catch (error) {
        res.status(402).json({
            success:false,
            message: error.message
        })
    }

}

// Delete case history
const deleteCase = async (req,res)=>{
try {
    const id = req.params.id;

    const deletedCaseHistory = await caseModel.findByIdAndDelete(id);

    res.status(200).json({
        success:true,
        message:"Delete successfully",
    })
} catch (error) {
    res.status(401).json({
        success:false,
        message:error.message
    })
}
}

module.exports = {addCaseHistory,getCaseHistory,updateCase,deleteCase}