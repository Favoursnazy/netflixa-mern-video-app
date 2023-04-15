import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducer";
import * as Category from "./Reducers/categoryReducers";
import * as Movies from "./Reducers/movieReducers";

const rootReducer = combineReducers({
  //USER REDUCERS
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userupdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userChangePassword: User.userChangePasswordReducer,
  userGetFavouritesMovies: User.getFavouritesMoviesReducer,
  userDeleteFavouritesMovies: User.deleteFavoritesMoviesReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUsersReducer,
  userLikeMovie: User.userLikeMovieReducer,

  //CATEGORY REDUCERS
  getAllCategory: Category.getAllCategoryReducer,
  createCategory: Category.createNewCategoryReducer,
  updateCategory: Category.updateCategoryReducer,
  deleteCatgory: Category.deleteCategoryReducer,

  //MOVIES REDUCERS
  getMoviesList: Movies.moviesListReducer,
  getRandomMovies: Movies.randomMoviesReducer,
  getMovieById: Movies.getMovieByIdReducer,
  getTopRatedMovies: Movies.topRatedMoviesReducer,
  deleteMovie: Movies.deleteMovieReducer,
  deleteAllMovies: Movies.deleteAllMoviesReducer,
  createMovie: Movies.createMovieReducer,
  casts: Movies.movieCastsReducer,
  updateMovie: Movies.updateMovieReducer,

  //MOVIES REVIEWS
  createMovieReview: Movies.createReviewReducer,
});

//get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//INITIALSTATE
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
