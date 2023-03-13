const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
      },
      userId:{
        type:ObjectId,
        ref:"user",
        required:true
      },    
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    // isDeleted:{
    //   type:Boolean,
    //   default:false
    // }
    },
  { timestamps: true }
);

module.exports = mongoose.model("product", productSchema);