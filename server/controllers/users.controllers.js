import UserModel from "../models/users.model.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/Token.js";

//@desc Register a user
//@route POST /api/user/register
//@acess Public
export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;
  try {
    //checking if all fields are filled
    if (!fullName || !email || !password) {
      res.status(404);
      throw new Error("Please all field are required");
    }

    const userExists = await UserModel.findOne({ email });
    //check if user exists
    if (userExists) {
      res.status(400);
      throw new Error("User already registered");
    }

    //else create a new user
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create user in DB
    const user = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });

    //if user created succesfully send user data and token to client
    if (user) {
      return res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//@desc Login user
//@route POST /api/user/login
// @access public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    //find user in DB
    const user = await UserModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      // if user was not found in database, send error message
      res.status(401);
      throw new Error("Invalid user credentials");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//************** PRIVATE ROUTES *******************/

//@desc update user profile
//@route PUT /api/user/profile
//@acess Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, image } = req.body;

  try {
    //find user in DB
    const user = await UserModel.findById(req.user._id);
    //if user exists update user data and save it in Db
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;

      const updateUser = await user.save();

      //send updated user data and token to client
      res.status(200).json({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        email: updateUser.email,
        image: updateUser.image,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    } else {
      //else send error message
      res.status(401);
      throw new Error("User doesn not exist");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//@desc Delete a user profile
//@route DELTE /api/users/delete
//@acess Private
export const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    //find user in DB
    const user = await UserModel.findById(req.user._id);
    // if user exists, delete user from DB
    if (user) {
      //if user is an admin send an error
      if (user.isAdmin) {
        res.status(403);
        throw new Error("Can't delete admin user");
      }

      //else delete user from DB
      await UserModel.findByIdAndDelete(req.user._id);
      res.status(200).json({
        message: "User deleted successfully",
      });
    } else {
      res.status(404);
      throw new Error("User not found!!");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//@desc Cahnge user password
//@route PUT /api/user/password
//@access Private
export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    //find user in DB
    const user = await UserModel.findById(req.user._id);
    // if user exists compare old password against new password then update user password and save it to DB
    if (user && (await bcrypt.compare(oldPassword, user.password))) {
      //hash old password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
      await user.save();
      res.status(200).json({
        message: "Password changed!",
      });
    } else {
      //else send error message
      res.status(400);
      throw new Error("Invalid old password");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//@desc Get all liked movies
//@routes GET /api/users/favourites
//@access Private
export const getLikedMovies = asyncHandler(async (req, res) => {
  try {
    //find user in DB
    const user = await UserModel.findById(req.user._id).populate("likedMovies");
    //if user exist send liked movies to client
    if (user) {
      res.status(200).json(user.likedMovies);
    } else {
      // else send error message
      res.status(400);
      throw new Error("user not found");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//@desc Add movies to liked movies
//@route POST /api/user/favorites
//@access Private
export const addLikedMovie = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    //find user in DB
    const user = await UserModel.findById(req.user._id);
    //if user exists add movie to liked movies
    if (user) {
      //if movie already liked send error message
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie already liked");
      }
      //else add movie to liked movies and save to DB
      user.likedMovies.push(movieId);
      await user.save();
      res.status(200).json({
        message: "Added to your favourites",
        likedMovies: user.likedMovies,
      });
    } else {
      // else send error message
      res.status(400);
      throw new Error("user not found");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//@desc Delete all liked movies
//@route DELETE /api/user/favourites
//access Private
export const deleteLikedMovie = asyncHandler(async (req, res) => {
  try {
    //find user in DB
    const user = await UserModel.findById(req.user._id);
    //if user exists delet all liked movies
    if (user) {
      user.likedMovies = [];
      await user.save();
      res.status(200).json({
        message: "Your favourites movies delted successfully",
      });
    } else {
      // else send error message
      res.status(400);
      throw new Error("user not found");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// ***************** ADMIN CONTROLLER ****************

//@desc Get all users
//@route GET /api/user/users
//access Private/Admin
export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    //find all users in DB
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//@desc delete user
//@route DELETE /api/user/:id
//access Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    //find user in DB
    const user = await UserModel.findById(req.params.id);
    // if user exists delete user from DB
    if (user) {
      //if user admin throw an error
      if (user.isAdmin) {
        res.status(403);
        throw new Error("can't delete admin user");
      }
      //else delete user from DB
      await UserModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(403);
      throw new Error("user not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
