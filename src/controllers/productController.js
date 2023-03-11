const productModel=  require("../models/productmodel")


const createProduct = async (req,res)=>{
    try {
        let data = req.body
        let create = await productModel.create(data)
        return res.status(201).send({status:true,data:create})
    } catch (error) {
        console.log(console.error())
    }
}

module.exports={createProduct}