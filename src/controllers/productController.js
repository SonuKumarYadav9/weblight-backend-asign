const productModel = require("../models/productmodel");
const mongoose= require('mongoose')

//* importing all the validation from validation file
const {
  isValidObjectId,
  isValidPrice,
  isValidRequestBody,
  isValid,
  isValidName,
} = require("../validations/validation");

const createProduct = async (req, res) => {
  try {
    let data = req.body;
    if (!isValidRequestBody(data)) {
      return res
        .status(400)
        .send({ status: true, msg: "Please enter data to create product" });
    }
    let { name, userId, category, price } = data;
    if (isValid(name) && userId && isValid(category) && price) {
      if (!isValidName(name)) {
        return res
          .status(400)
          .send({ status: true, msg: "Please enter Valid Name" });
      }
      if (!isValidObjectId(userId)) {
        return res
          .status(400)
          .send({ status: true, msg: "Please enter Valid userId" });
      }
      console.log(userId)
      console.log(req.userId )

      // *checking if the user is trying to create product is same or not who is login
      if (req.userId !== userId) {
        return res
          .status(403)
          .send({ status: true, msg: "Please Enter Admin's UserId" });
      }
      if (!isValidPrice(price)) {
        return res
          .status(400)
          .send({ status: true, msg: "Please enter Valid Price" });
      }
      let create = await productModel.create(data);
      return res.status(201).send({ status: true, data: create });
    } else {
      return res.status(400).json({ status: false, msg: "All field require" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { category, priceBand, name, page = 1, limit = 10 } = req.query;
    let filter = {};

    //*Apply filters based on query params
    if (category) {
        filter.category = category
    };
    if (priceBand) {
      const [minPrice, maxPrice] = priceBand.split("-");
      filter.price = { $gte: minPrice, $lte: maxPrice };
    }
    if (name){
        filter.name = { $regex: name }
}

    //*Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const data = await productModel.find(filter).skip(startIndex).limit(limit);

    // if (!data.isDeleted === true) {
    return res.status(200).send({ status: true, data: data });
    // }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};


const updateProduct = async (req, res) => {
    try {
        let productId= req.params.id;
        // console.log(productId);
        if (!productId) {
          return res
            .status(400)
            .send({ status: false, msg: "Please enter a valid productid" });
        }

        if (!isValidObjectId(productId)) {
          return res
            .status(400)
            .send({ status: false, msg: "Please enter a valid productid" });
        }
        let data = req.body;
      
        //*checking empty body
        if (!isValidRequestBody(data)) {
          return res
            .status(400)
            .send({ status: false, msg: "Please enter data to create product" });
        }
      
        //*destructuring req.body
        let { name, price, category } = data;
      
        //*checking validation for name
        if (!isValidName(name)) {
          return res
            .status(400)
            .send({ status: false, msg: "Please enter a valid name" });
        }
        // checking price validation
        if (!isValidPrice(price)) {
          return res
            .status(400)
            .send({ status: false, msg: "Please enter a valid price" });
        }
      
        //checking category
        if (!isValid(category)) {
          return res
            .status(400)
            .send({ status: false, msg: "Please enter a valid category" });
        }
      
        let updatedData = await productModel.findByIdAndUpdate(
          { _id: productId.toString() },  //filtering
          data,                                     // updating
          { new: true }  //* its gives us the new data 
        );
        return res
          .status(200)
          .send({ status: true, msg: "Product Updated Successfully", data: updatedData });
      } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, msg: error.message });
      }

  };
  

const deleteProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    //* validating productId
    if (!isValidObjectId(productId)) {
        return res 
          .status(400)
          .send({ status: true, msg: "Please enter Valid ProductID" });
      }
    let deleteProduct = await productModel.findByIdAndDelete({ _id:productId });
    return res
      .status(200)
      .send({ status: true, msg: "Product is Successfully Deleted" ,data:deleteProduct});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, msg: error.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
