
const caseModel = require("../models/CaseModel");

//Add case history
const addCaseHistory = async(req,res)=>{
    try {
        const {achievement,numeric,operator} = req.body;

    const caseHistory = await caseModel.create({
        achievement,
        numeric,
        operator
    })

    res.status(200).json({
        message:"Case history added successfully!!!",
        data:caseHistory,
    })
    } catch (error) {
        res.status(402).json({
            message:"failed",
            data: error.message
        })  
    }
}

// Get case history
const getCaseHistory = async(req,res)=>{   
    try {
        const getData = await caseModel.find();
        res.status(200).json({
            message:'successful',
            data : getData
        })
    } catch (error) {
        res.status(401).json({
            message:'failed',
            data : error.message
        })
    }
}

// Update case history
const updateCase = async(req,res)=>{

    try {
        const id = req.params.id;
        const { achievement,numeric,operator} = req.body;

        const updatedCase = await caseModel.findByIdAndUpdate( id, {
            $set:{
                achievement,
                numeric,
                operator
            }
        },{new:true})

        res.status(200).json({
            message:"Updated successfully!!!",
            data:updatedCase
        })

    } catch (error) {
        res.status(402).json({
            message:"failed",
            data: error.message
        })
    }

}

// Delete case history
const deleteCase = async (req,res)=>{
try {
    const id = req.params.id;

    const deletedCaseHistory = await caseModel.findByIdAndDelete(id);

    res.status(200).json({
        message:"successfull",
    })
} catch (error) {
    res.status(401).json({
        message:"failed",
        data:error.message
    })
}
}

module.exports = {addCaseHistory,getCaseHistory,updateCase,deleteCase}