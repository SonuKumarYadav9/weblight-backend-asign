const mongoose = require("mongoose");

//🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶__Validations_For_Value Check🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶🔶//

const isValid = (value) => {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length === 0) return false;
  if (typeof value == "number" && value === null) return false;
  return true;
};

const isValidPassword = (value) => {
  return /^[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(value.trim());
};

const isValidObjectId = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

const isValidName = function (val) {
  let regx = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
  return regx.test(val);
};

const isValidEmail = (value) => {
  return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(value.trim());
};

const isValidPrice = (price) => {
  let regex = /^(?:0|[1-9]\d*)(?:\.(?!.*000)\d+)?$/;
  return regex.test(price);
};

const isValidRequestBody = (data) => {
  if (Object.keys(data).length === 0) {
    return false;
  }
  return true;
};

module.exports = {
  isValidObjectId,
  isValidPassword,
  isValid,
  isValidName,
  isValidEmail,
  isValidPrice,
  isValidRequestBody
};
