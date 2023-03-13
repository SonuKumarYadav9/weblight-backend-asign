const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const {
    isValid,
  isValidName,
  isValidEmail,
  isValidPassword,
  isValidRequestBody
} = require("../validations/validation");
let saltRounds = 10;

const registerUser = async (req, res) => {
  try {
    let data = req.body;
    // console.log(data)
    let { name, email, password, role } = data;
    if ((isValid(name) && isValid(email) && isValid(password) && isValid(role))) {
      if (!isValidName(name))
        return res.status(400).send({
          status: false,
          message: "name should only contain alphabets.",
        });

      if (!isValidEmail(email))
        return res
          .status(400)
          .send({ status: false, message: "The email address is invalid." });
      let checkEmail = await userModel.findOne({ email });
      if (checkEmail)
        return res.status(400).send({
          status: false,
          message: "This email address is already registered.",
        });

      if (!isValidPassword(password))
        return res.status(400).send({
          status: false,
          message: "Password should have 8 to 15 characters.",
        });

      data.password = await bcrypt.hash(password, saltRounds);

      if (!(role === ( "user") || role === ( "admin"))) {
        return res
          .status(400)
          .send({
            status: false,
            msg: "Please Enter 'user' or 'admin' in role field ",
          });
      }
      let saveUser = await userModel.create(data);
      return res.status(201).send({ status: true, data: saveUser });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "Please Enter All input" });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({status:false,msg:error.message})
}
};

const loginUser = async (req, res) => {
  try {
    let data = req.body;
    let { email, password } = data;
    if (!isValidRequestBody(data)) {
      return res
        .status(400)
        .send({ status: false, msg: "Please enter email and Password" });
    }
    if (!isValid(email))
      return res.status(400).send({ status: false, msg: "Please enter email" });

    if (!isValidEmail(email)) {
      return res.status(400).send({
        status: false,
        message: "Email should be a valid email address",
      });
    }
    if (!isValidPassword(password))
      return res
        .status(400)
        .send({ status: false, msg: "Please enter Password" });

    let user = await userModel.findOne({ email: email });
    if (!user) {
      return res
        .status(404)
        .send({ status: false, msg: "Invalid credetial Found" });
    }

    let checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword)
      return res
        .status(400)
        .send({ status: false, msg: " Invalid password credentials" });

    if (user) {
      let token = jwt.sign(
        {
          userID: user._id.toString(),
        },
        process.env.SECRET_KEY,
        { expiresIn: "2d" }
      );
      return res
        .status(200)
        .send({ status: true,msg:"Login Success" ,token: token, userID: user._id });
    } else {
      return res
        .status(404)
        .send({ status: false, msg: "this user not Found " });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({status:false,msg:error.message})
}
};


const allUser = async (req,res)=>{
  try {
    let users = await userModel.find()
    if(users){
      return res.status(200).send({status:true,data:users})
    }else{
      return res.status(404).send({status:false,msg:"User Not Found"})
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({status:false,msg:error.message})
}
}

module.exports = { registerUser, loginUser,allUser };
