import JWT from "jsonwebtoken";
import userModel from "../models/usersModel.js";
// protected route token base
export const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// Admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.isAdmin == false) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorize Access",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Error in admin access",
      error,
    });
    console.log(error);
  }
};
