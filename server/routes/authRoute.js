const express = require("express");
const router = express.Router();
const User = require("../models/user");
const generateAuthToken = require("../utils/auth");
const sendResponse = require("../helpers/sendResponse");
const isEmailValid = require("../helpers/inputValidation");
const isUserAuthorized = require("../middleware/autherizeUser");
const Joi = require("joi");
const {
  addTokenToBlackList,
  isTokenBlackListed,
  tokenBlackList,
} = require("../middleware/tokenBlackList");
const {
  emailSchema,
  usernameSchema,
  passwordSchema,
} = require("../helpers/userValidation");

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(username, email, password);

  try {
    const schema = Joi.object({
      username: usernameSchema,
      email: emailSchema,
      password: passwordSchema,
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return sendResponse(res, 400, {
        message: validation.error.details[0].message,
      });
    }

    // if (!username || !email || !password) {
    //   return sendResponse(res, 400, { message: "All fields are required" });
    // }
    // if (!isEmailValid(email)) {
    //   return sendResponse(res, 400, { message: "Invalid email format" });
    // }
    // if (password.length < 8) {
    //   return sendResponse(res, 400, {
    //     message: "Password must be at least 8 characters",
    //   });
    // }
    //check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendResponse(res, 400, { message: "User already exists" });
    }
    //create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    //generate token
    const token = generateAuthToken(newUser);
    return sendResponse(res, 200, { token: token });
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, { message: "sign up failed" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    // if (!email || !password) {
    //   return sendResponse(res, 400, {
    //     message: "Email and password are required",
    //   });
    // }
    const schema = Joi.object({
      email: emailSchema,
      password: passwordSchema,
    });
    const validation = schema.validate(req.body);

    if (validation.error) {
      return sendResponse(res, 400, {
        message: validation.error.details[0].message,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 401, { message: "User is not found" });
    }

    const comparedPassword = await user.comparedPassword(password);
    if (!comparedPassword) {
      return sendResponse(res, 401, { message: "Invalid password" });
    }
    const token = generateAuthToken(user);
    return sendResponse(res, 200, { token });
  } catch (err) {
    console.error(err);
    return sendResponse(res, 500, { message: "Login failed" });
  }
});

router.post("/logout", async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return sendResponse(res, 401, { message: "UnAuthorized" });
  }
  const token = authorizationHeader.split(" ")[1];
  if (!token) {
    return sendResponse(res, 401, { message: "UnAuthorized" });
  }

  //check if token is black listed
  if (isTokenBlackListed(token)) {
    return sendResponse(res, 401, { message: "Token is invalid" });
  }
  addTokenToBlackList(token);
  console.log(tokenBlackList);
  return sendResponse(res, 200, { message: "Logout successful" });
});

router.get("/protected", isUserAuthorized, async (req, res) => {
  const userEmail = req.user.userName;
  return sendResponse(res, 200, {
    message: `Welcome ${userEmail} to ths exclusive content`,
  });
});

module.exports = router;
