const Validator = require("validator");
const validText = require("./valid-text");
const Yup = require("yup");

let userSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Email is invalid"),
  name: Yup.string()
    .required("Name is required"),
  password: Yup.string()
    .required()
    .min(5, "Password must be at least 5 characters long")
    .max(32, "Password must be shorted than 32 characters long")
});

module.exports = function validateLoginInput(data) {
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    return { message: "Email is invalid", isValid: false };
  }

  if (Validator.isEmpty(data.email)) {
    return { message: "Email field is required", isValid: false };
  }

  if (Validator.isEmpty(data.password)) {
    return { message: "Password field is required", isValid: false };
  }

  return {
    message: "",
    isValid: true,
  };
};
