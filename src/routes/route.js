const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const productController = require("../controllers/productController");

const { registerUser } = userController;
const { createProduct} = productController;

router.post("/register",registerUser)
router.post("/product",createProduct)

module.exports = router