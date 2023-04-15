import express from "express";
import * as categoriesController from "../controllers/categories.controller.js";
import {
  protectRoutes,
  adminProtectedRoutes,
} from "../middlewares/protectRoutes.js";

const router = express.Router();

//****************** PUBLIC ROUTES ********************/
router.get("/", categoriesController.getCategories);
router.post("/import", categoriesController.importCategories);

//****************** ADMIN ROUTES **********************/
router.post(
  "/create",
  protectRoutes,
  adminProtectedRoutes,
  categoriesController.createCategory
);
router.put(
  "/update/:id",
  protectRoutes,
  adminProtectedRoutes,
  categoriesController.updateCategory
);
router.delete(
  "/delete/:id",
  protectRoutes,
  adminProtectedRoutes,
  categoriesController.deleteCategory
);

export default router;
