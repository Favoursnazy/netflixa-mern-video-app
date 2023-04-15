import express from "express";
import {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changePassword,
  getLikedMovies,
  addLikedMovie,
  deleteLikedMovie,
  deleteUser,
  getAllUsers,
} from "../controllers/users.controllers.js";
import {
  protectRoutes,
  adminProtectedRoutes,
} from "../middlewares/protectRoutes.js";

const router = express.Router();

// **************** PUBLIC ROUTES ****************
router.post("/register", registerUser);
router.post("/login", loginUser);

//*****************PRIVATE ROUTES*******************/
router.put("/update", protectRoutes, updateUserProfile);
router.delete("/delete", protectRoutes, deleteUserProfile);
router.put("/password", protectRoutes, changePassword);
router.get("/favourites", protectRoutes, getLikedMovies);
router.post("/likes", protectRoutes, addLikedMovie);
router.delete("/deletelikes", protectRoutes, deleteLikedMovie);

//************************ADMIN ROUTES *********************** */
router.get("/", protectRoutes, adminProtectedRoutes, getAllUsers);
router.delete("/:id", protectRoutes, adminProtectedRoutes, deleteUser);

export default router;
