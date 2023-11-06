
const caseModel = require("../models/CaseModel");

//Add case history
const addCaseHistory = async(req,res)=>{
    try {
        const {caseWon,numberOfLawers,freeConsultation,caseDismissed} = req.body;

    const caseHistory = await caseModel.create({
        caseWon,
        numberOfLawers,
        freeConsultation,
        caseDismissed
    })

    res.status(200).json({
        message:"Case history added successfully!!!",
        data:caseHistory,
    })
    } catch (error) {
        res.status(402).json({
            message: error.message
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
        const {id, caseWon,numberOfLawers,freeConsultation,caseDismissed} = req.body;

        const updatedCase = await caseModel.findByIdAndUpdate( id, {
            $set:{
                caseWon,
                numberOfLawers,
                freeConsultation,
                caseDismissed 
            }
        },{new:true})

        res.status(200).json({
            message:"Updated successfully!!!",
            data:updatedCase
        })

    } catch (error) {
        res.status(402).json({
            message: error.message
        })
    }

}

module.exports = {addCaseHistory,getCaseHistory,updateCase}