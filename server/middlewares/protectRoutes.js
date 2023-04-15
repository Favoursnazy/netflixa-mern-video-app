import asyncHandler from "express-async-handler";
import UserModel from "../models/users.model.js";
import jwt from "jsonwebtoken";

//protect middleware for routes
export const protectRoutes = asyncHandler(async (req, res, next) => {
  let token;
  //check if token exist in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // set token from Bearer token in header
      token = req.headers.authorization.split(" ")[1];
      //verify token and get user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Get user id from the decoded token
      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not Authorized, token failed!");
    }
  }
  // if token doesnt exist in headers send error
  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, token failed!");
  }
});

//admin protect middleware
export const adminProtectedRoutes = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not Authorized as an admin");
  }
};
