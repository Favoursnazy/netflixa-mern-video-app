import jwt from "jsonwebtoken";

//@desc Authenticated user & get token
export const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
