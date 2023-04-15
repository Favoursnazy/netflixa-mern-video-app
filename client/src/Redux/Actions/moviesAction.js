import * as MoviesApi from "../APIs/moviesService";
import { ErrorAction, tokenProtection } from "../Protection";
import * as moviesConstants from "../Constants/moviesConstants";
import { toast } from "react-hot-toast";

export const getAllMoviesAction =
  ({
    category = "",
    times = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: moviesConstants.MOVIES_LIST_REQUEST });
      const response = await MoviesApi.getAllMoviesService(
        category,
        times,
        language,
        rate,
        year,
        search,
        pageNumber
      );
      dispatch({
        type: moviesConstants.MOVIES_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorAction(error, dispatch, moviesConstants.MOVIES_LIST_FAIL);
    }
  };

//get random movies action
export const getRandomMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIES_RANDOM_REQUEST });
    const response = await MoviesApi.getRandomMoviesService();
    dispatch({
      type: moviesConstants.MOVIES_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, moviesConstants.MOVIES_RANDOM_FAIL);
  }
};

// get movie by ID action
export const getMovieByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIES_DETAILS_REQUEST });
    const response = await MoviesApi.getMovieByIdService(id);
    dispatch({
      type: moviesConstants.MOVIES_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, moviesConstants.MOVIES_DETAILS_FAIL);
  }
};

//get top rated movies action
export const getTopRatedMoviesAction = () => async (dispatch) => {
  try {
    dispatch({ type: moviesConstants.MOVIES_TOP_RATED_REQUEST });
    const response = await MoviesApi.getTopRatedMoviesService();
    dispatch({
      type: moviesConstants.MOVIES_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorAction(error, dispatch, moviesConstants.MOVIES_TOP_RATED_FAIL);
  }
};

//review movie action
export const reviewMovieAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: moviesConstants.CREATE_REVIEW_REQUEST });
      const response = await MoviesApi.reviewMovieService(
        id,
        review,
        tokenProtection(getState)
      );
      dispatch({
        type: moviesConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review added successfully");
      dispatch({ type: moviesConstants.CREATE_REVIEW_RESET });
      dispatch(getMovieByIdAction(id));
    } catch (error) {
      ErrorAction(error, dispatch, moviesConstants.CREATE_REVIEW_FAIL);
    }
  };

// delete movie action
export const deleteMovieAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_MOVIE_REQUEST });
    const response = await MoviesApi.deleteMovieService(
      id,
      tokenProtection(getState)
    );
    dispatch({ type: moviesConstants.DELETE_MOVIE_SUCCESS, payload: response });
    toast.success("Movie deleted successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorAction(error, dispatch, moviesConstants.DELETE_MOVIE_FAIL);
  }
};

// delete all movies action
export const deleteAllMovieAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.DELETE_ALL_MOVIES_REQUEST });
    const response = await MoviesApi.deleteAllMoviesService(
      tokenProtection(getState)
    );
    dispatch({
      type: moviesConstants.DELETE_ALL_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("All Movie deleted successfully");
    dispatch(getAllMoviesAction({}));
  } catch (error) {
    ErrorAction(error, dispatch, moviesConstants.DELETE_ALL_MOVIES_FAIL);
  }
};

//create a new movie
export const createMovieAction = (movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.CREATE_MOVIES_REQUEST });
    const response = await MoviesApi.createMovieService(
      movie,
      tokenProtection(getState)
    );
    dispatch({
      type: moviesConstants.CREATE_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("Movie created sucessfully");
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorAction(error, dispatch, moviesConstants.CREATE_MOVIES_FAIL);
  }
};

///*********************** CASTS ******************* */

//add cast
export const addCastAction = (cast) => (dispatch, getState) => {
  dispatch({ type: moviesConstants.ADD_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

//remove cast
export const removeCastAction = (id) => (dispatch, getState) => {
  dispatch({ type: moviesConstants.DELETE_CAST, payload: id });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts.id));
};

//update casts
export const updateCastAction = (cast) => (dispatch, getState) => {
  dispatch({ type: moviesConstants.EDIT_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

//delete cast
export const deleteAllCastAction = () => (dispatch) => {
  dispatch({ type: moviesConstants.EDIT_CAST, payload: cast });
  localStorage.removeItem("casts");
};

// update movie by id
export const updateMovieAction = (id, movie) => async (dispatch, getState) => {
  try {
    dispatch({ type: moviesConstants.UPDATE_MOVIES_REQUEST });
    const response = await MoviesApi.updateMovieService(
      id,
      movie,
      tokenProtection(getState)
    );
    dispatch({
      type: moviesConstants.UPDATE_MOVIES_SUCCESS,
      payload: response,
    });
    toast.success("Movie updated successfully");
    dispatch(getMovieByIdAction(id));
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorAction(error, dispatch, moviesConstants.UPDATE_MOVIES_FAIL);
  }
};
