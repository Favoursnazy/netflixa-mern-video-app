import * as userConstants from "../Constants/userConstants";
import * as userApi from "../APIs/userService";
import { ErrorAction, tokenProtection } from "../Protection";
import toast from "react-hot-toast";

//LOGIN ACTION
export const loginAction = (userDetails) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(userDetails);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

//REGISTER ACTIONS
export const registerAction = (userDetails) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(userDetails);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

//LOGOUT OUT ACTION
export const logoutAction = () => (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
  dispatch({ type: userConstants.GET_FAVOURITES_MOVIES_RESET });
};

//update profile
export const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Profile updated");
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

//delete user profile
export const deleteUserProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    await userApi.deleteUserProfileService(tokenProtection(getState));
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
    toast.success("Account Deleted Successfully");
    dispatch(logoutAction());
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
    dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET });
  }
};

// change user password
export const changeUserPasswordAction =
  (password) => async (dispatch, getState) => {
    try {
      dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
      const response = await userApi.changePasswordService(
        password,
        tokenProtection(getState)
      );
      dispatch({
        type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
    }
  };

//get all favourites movies
export const getFavouritesMoviesAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_FAVOURITES_MOVIES_REQUEST });
    const response = await userApi.getFavouritesMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_FAVOURITES_MOVIES_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.GET_FAVOURITES_MOVIES_FAIL);
  }
};

//delete all favourites movies
export const deleteFavouritesMoviesAction =
  () => async (dispatch, getState) => {
    try {
      dispatch({ type: userConstants.DELETE_FAVOURITE_MOVIES_REQUEST });
      await userApi.deleteFavouritesMoviesService(tokenProtection(getState));
      dispatch({
        type: userConstants.DELETE_FAVOURITE_MOVIES_SUCCESS,
      });
      toast.success("Favourites Movies Deleted");
    } catch (error) {
      ErrorAction(error, dispatch, userConstants.DELETE_FAVOURITE_MOVIES_FAIL);
    }
  };

// user like movie action
export const likemovieAction = (movieId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.LIKE_MOVIE_REQUEST });
    const response = await userApi.userLikeMovieService(
      movieId,
      tokenProtection(getState)
    );
    dispatch({ type: userConstants.LIKE_MOVIE_SUCCESS, payload: response });
    toast.success(response.message);
    // dispatch(getFavouritesMoviesAction());
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.LIKE_MOVIE_FAIL);
  }
};

//************************* ADMIN APIS'S ****************** */

//admin get all users action
export const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const response = await userApi.adminGetAllUsersService(
      tokenProtection(getState)
    );
    dispatch({ type: userConstants.GET_ALL_USERS_SUCCESS, payload: response });
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

//admin delete user
export const deletetUsersAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    await userApi.admindeleteUserService(id, tokenProtection(getState));
    dispatch({ type: userConstants.DELETE_USER_SUCCESS });
    toast.success("User Deleted");
  } catch (error) {
    ErrorAction(error, dispatch, userConstants.DELETE_USER_FAIL);
  }
};
