import express from "express";
import * as moviesController from "../controllers/movies.controller.js";
import {
  protectRoutes,
  adminProtectedRoutes,
} from "../middlewares/protectRoutes.js";

const router = express.Router();

//***************** PUBLIC ROUTES **************** */
router.post("/import", moviesController.importMovies);
router.get("/", moviesController.getMovies);
router.get("/:id", moviesController.getMovieById);
router.get("/rated/top", moviesController.getTopRatedMovies);
router.get("/random/all", moviesController.getRandomMovies);

//**************** PRIVATE ROUTES ****************
router.post("/:id/reviews", protectRoutes, moviesController.createMovieReview);

//**************** ADMIN ROUTES ****************
router.put(
  "/:id",
  protectRoutes,
  adminProtectedRoutes,
  moviesController.updateMovie
);
router.delete(
  "/:id",
  protectRoutes,
  adminProtectedRoutes,
  moviesController.deleteMovie
);
router.delete(
  "/",
  protectRoutes,
  adminProtectedRoutes,
  moviesController.deleteAllMovies
);
router.post(
  "/create",
  protectRoutes,
  adminProtectedRoutes,
  moviesController.createMovie
);

export default router;
