import * as CategoryReducers from "../Constants/categoryConstants";

//GET ALL CATEGORIES
export const getAllCategoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CategoryReducers.GET_ALL_CATEGORIES_REQUEST:
      return { isLoading: true };
    case CategoryReducers.GET_ALL_CATEGORIES_SUCCESS:
      return { isLoading: false, categories: action.payload };
    case CategoryReducers.GET_ALL_CATEGORIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryReducers.UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

//CREATE A NEW CATEGORY
export const createNewCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoryReducers.CREATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoryReducers.CREATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoryReducers.CREATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryReducers.CREATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

//UPDATE CATEGORY
export const updateCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoryReducers.UPDATE_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoryReducers.UPDATE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoryReducers.UPDATE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryReducers.UPDATE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};

//DELETE CATEGORY
export const deleteCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CategoryReducers.DELETE_CATEGORY_REQUEST:
      return { isLoading: true };
    case CategoryReducers.DELETE_CATEGORY_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case CategoryReducers.DELETE_CATEGORY_FAIL:
      return { isLoading: false, isError: action.payload };
    case CategoryReducers.DELETE_CATEGORY_RESET:
      return {};
    default:
      return state;
  }
};
