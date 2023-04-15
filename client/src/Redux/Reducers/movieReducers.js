import * as moviesConstants from "../Constants/moviesConstants";

//GET ALL MOVIES
export const moviesListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIES_LIST_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIES_LIST_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload.movies,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMovies: action.payload.totalMovies,
      };
    case moviesConstants.MOVIES_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIES_LIST_RESET:
      return {};

    default:
      return state;
  }
};

// GET RANDOM MOVIES
export const randomMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIES_RANDOM_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIES_RANDOM_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload,
      };
    case moviesConstants.MOVIES_LIST_FAIL:
      return { isLoading: false, isError: action.payload };

    default:
      return state;
  }
};

// GET MOVIE BY ID
export const getMovieByIdReducer = (state = { movie: {} }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIES_DETAILS_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIES_DETAILS_SUCCESS:
      return {
        isLoading: false,
        movie: action.payload,
      };
    case moviesConstants.MOVIES_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.MOVIES_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

// GET TOP RATED MOVIES
export const topRatedMoviesReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case moviesConstants.MOVIES_TOP_RATED_REQUEST:
      return { isLoading: true };
    case moviesConstants.MOVIES_TOP_RATED_SUCCESS:
      return {
        isLoading: false,
        movies: action.payload,
      };
    case moviesConstants.MOVIES_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };

    default:
      return state;
  }
};

//CREATE REVIEW
export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case moviesConstants.CREATE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.CREATE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

// DELETE A MOVIE
export const deleteMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.DELETE_MOVIE_REQUEST:
      return { isLoading: true };
    case moviesConstants.DELETE_MOVIE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.DELETE_MOVIE_FAIL:
      return { isLoading: false, isError: action.payload };

    default:
      return state;
  }
};

// DELETE ALL MOVIES REDUCER
export const deleteAllMoviesReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.DELETE_ALL_MOVIES_REQUEST:
      return { isLoading: true };
    case moviesConstants.DELETE_ALL_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.DELETE_ALL_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };

    default:
      return state;
  }
};

// CREATE A NEW MOVIE REDUCER
export const createMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.CREATE_MOVIES_REQUEST:
      return { isLoading: true };
    case moviesConstants.CREATE_MOVIES_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.CREATE_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.CREATE_MOVIES_RESET:
      return {};

    default:
      return state;
  }
};

// CASTS
export const movieCastsReducer = (state = { casts: [] }, action) => {
  switch (action.type) {
    case moviesConstants.ADD_CAST:
      return { casts: [...state.casts, action.payload] };
    case moviesConstants.EDIT_CAST:
      const updatedCasts = state.casts.map((cast) =>
        cast.id === action.payload.id ? action.payload : cast
      );
      return { casts: updatedCasts };
    case moviesConstants.DELETE_CAST:
      return {
        ...state,
        casts: state.casts.filter((cast) => cast.id !== action.payload),
      };
    case moviesConstants.RESET_CAST:
      return { casts: [] };

    default:
      return state;
  }
};

// UPDATE MOVI
export const updateMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case moviesConstants.UPDATE_MOVIES_REQUEST:
      return { isLoading: true };
    case moviesConstants.UPDATE_MOVIES_RESET:
      return { isLoading: false, isSuccess: true };
    case moviesConstants.UPDATE_MOVIES_FAIL:
      return { isLoading: false, isError: action.payload };
    case moviesConstants.UPDATE_MOVIES_RESET:
      return {};

    default:
      return state;
  }
};
