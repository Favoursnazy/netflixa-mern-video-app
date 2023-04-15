import Categories from "../models/categories.model.js";
import asyncHandler from "express-async-handler";
import { CategoriesData } from "../Datas/categories.js";

//****************** PUBLIC CONTROLLERS*************** */

//@Desc Get all categories
//@routes  GET /api/categories
//@access Public
export const getCategories = asyncHandler(async (req, res) => {
  try {
    //find all categories in the database
    const categories = await Categories.find({});
    //send all categories to clients
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//****************** ADMIN CONTROLLERS*************** */

//@desc   Create a new category
//@route  POST /api/categories/create
//access  Private/Admin
export const createCategory = asyncHandler(async (req, res) => {
  try {
    //get title from request body
    const { title } = req.body;
    //create new category
    const category = new Categories({
      title,
    });
    //save the category to the database
    const createdCategory = await category.save();
    //send the category to the client
    res.status(200).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//@desc   Update a category
//@route  PUT /api/categories/update/:id
//access  Private/Admin
export const updateCategory = asyncHandler(async (req, res) => {
  try {
    //get category id from request params
    const category = await Categories.findById(req.params.id);

    if (category) {
      //update category
      category.title = req.body.title || category.title;

      //save category to database
      const updatedCategory = await category.save();
      //send updated category to client
      res.status(200).json(updatedCategory);
    } else {
      res.status(400);
      throw new Error("Category was not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//@desc    Delete a category
//@route  DELETE /api/categories/delete/:id
//access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res) => {
  try {
    //check if category exists in database
    const category = await Categories.findById(req.params.id);

    if (category) {
      //delete category
      await Categories.findByIdAndDelete(req.params.id);
      //send message to client
      res.status(200).json({
        message: "Category deleted successfully",
      });
    } else {
      res.status(400);
      throw new Error("Category was not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//@Desc Import categories
//@route POST /api/category/import
//@access Public
export const importCategories = asyncHandler(async (req, res) => {
  //first we make sure our category table is empty by deleting all documents
  await Categories.deleteMany({});
  //then we insert all category from our categoryData
  const category = await Categories.insertMany(CategoriesData);
  res.status(200).json(category);
});
