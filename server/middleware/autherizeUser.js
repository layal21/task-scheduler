const mongoose = require("mongoose");
const sendResponse = require("../helpers/sendResponse");
const JWT = require("jsonwebtoken");
require("dotenv").config();

const isUserAuthorized = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return sendResponse(res, 403, { message: "Not authorized" });
  }
  try {
    const tokenHeader = token.split(" ")[1];
    JWT.verify(tokenHeader, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return sendResponse(res, 401, {
          message: "UnAuthorized: Invalid token",
        });
      }
      req.user = decoded;
      console.log(req.user)
      //else authorize the user and let him access the protected content
      next();
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = isUserAuthorized;
