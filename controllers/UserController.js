const userModel = require("../models/UserModel");

//Add user info
const addUser = async(req,res)=>{
const {name,phoneNumber,whatsAppNumber,email} = req.body;

if(!name || !phoneNumber || !whatsAppNumber || !email){
    return res.status(200).json({
        message: "Please fill all the field!!!"
    })
}

const user = await userModel.create{
name,
phoneNumber,
whatsAppNumber,
email
}

}