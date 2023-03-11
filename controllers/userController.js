const userModel = require("../models/userModel")





const registerUser = async (req,res)=>{
    try {
        let data = req.body
        console.log(data)
        let saveUser = await userModel.create(data)
        return res.status(201).send({status:true,data:saveUser})
    } catch (error) {
        console.log(error)
    }
}

module.exports ={registerUser}