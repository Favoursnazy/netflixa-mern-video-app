import * as CategoryApi from "../APIs/categoriesService";
import * as CategoryConstants from "../Constants/categoryConstants";
import { ErrorAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

//Get All Categories
export const getAllCategoriesAction = () => async (disptach) => {
  try {
    disptach({ type: CategoryConstants.GET_ALL_CATEGORIES_REQUEST });
    const response = await CategoryApi.getCategoriesService();
    disptach({
      type: CategoryConstants.GET_ALL_CATEGORIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, disptach, CategoryConstants.GET_ALL_CATEGORIES_FAIL);
  }
};

//Create a new category
export const createCategoriesAction =
  (categoryTitle) => async (disptach, getState) => {
    try {
      disptach({ type: CategoryConstants.CREATE_CATEGORY_REQUEST });
      await CategoryApi.createCategoryService(
        categoryTitle,
        tokenProtection(getState)
      );
      disptach({ type: CategoryConstants.CREATE_CATEGORY_SUCCESS });
      toast.success("Category created succesfully");
      disptach(getAllCategoriesAction());
    } catch (error) {
      ErrorAction(error, disptach, CategoryConstants.CREATE_CATEGORY_FAIL);
    }
  };

//Update Category Action
export const updateCategoryAction =
  (id, updatedTitle) => async (disptach, getState) => {
    try {
      disptach({ type: CategoryConstants.UPDATE_CATEGORY_REQUEST });
      await CategoryApi.updateCategoryService(
        id,
        updatedTitle,
        tokenProtection(getState)
      );
      disptach({
        type: CategoryConstants.UPDATE_CATEGORY_SUCCESS,
      });
      toast.success("Category updated succesfully");
      disptach(getAllCategoriesAction());
    } catch (error) {
      ErrorAction(error, disptach, CategoryConstants.UPDATE_CATEGORY_FAIL);
    }
  };

//Delete category Action
export const deleteCategoryAction = (id) => async (disptach, getState) => {
  try {
    disptach({ type: CategoryConstants.DELETE_CATEGORY_REQUEST });
    await CategoryApi.deleteCategoryService(id, tokenProtection(getState));
    disptach({
      type: CategoryConstants.DELETE_CATEGORY_SUCCESS,
    });
    toast.success("Category Deleted succesfully");
    disptach(getAllCategoriesAction());
  } catch (error) {
    ErrorAction(error, disptach, CategoryConstants.DELETE_CATEGORY_FAIL);
  }
};
