const userModel = require("../models/userModel")
const jwt =require("jsonwebtoken")


const mid = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
      let token = authorization.split(" ")[1];
      const { userID } = jwt.verify(token, process.env.SECRET_KEY);
      req.user = await userModel.findById(userID).select("--password");
      req.userId =req.user._id.toString()   // Storin userId to access in controller by next() function it will pass the data
    //  console.log(req.userId)
      next();
    } else {
      return res.status(401).send({ msg: "Unauthorised user Or Token is missing" })
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ msg: error.message })
  }
};

//* This middleware to check if ther Admin is there or not who is going to perform this action 

const isAdmin = (roles) => {
  return (req, res, next) => {

    if (!roles.includes(req.user.role)) {  // here taking user from middleware ny NEXT() function of it 
      return res.status(403).send({status:false,msg:"Only ADMIN can do this operation"});
    }
    next();
  };
};



  module.exports ={isAdmin,mid}











