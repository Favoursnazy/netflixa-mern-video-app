import Axios from "../APIs/Axios";

//**********************8  PUBLIC APIS's****************** */

//get all movies Function
export const getAllMoviesService = async (
  category,
  times,
  language,
  rate,
  year,
  search,
  pageNumber
) => {
  const { data } = await Axios.get(
    `/movies?category=${category}&time=${times}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
  );
  return data;
};

// get random  movies API Function
export const getRandomMoviesService = async () => {
  const { data } = await Axios.get("/movies/random/all");
  if (data) {
    return data;
  }
};

// get movie by id API function
export const getMovieByIdService = async (id) => {
  const { data } = await Axios.get(`/movies/${id}`);
  if (data) {
    return data;
  }
};

//get top rated movies API Function
export const getTopRatedMoviesService = async () => {
  const { data } = await Axios.get("/movies/rated/top");
  if (data) {
    return data;
  }
};

// review movie API Function
export const reviewMovieService = async (id, review, token) => {
  const { data } = await Axios.post(`/movies/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data;
  }
};

//delete movie API Function
export const deleteMovieService = async (id, token) => {
  const { data } = await Axios.delete(`/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

//delete all movies API Function
export const deleteAllMoviesService = async (token) => {
  const { data } = await Axios.delete(`/movies/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//create/add a new movie API Function
export const createMovieService = async (movie, token) => {
  const { data } = await Axios.post("/movies/create", movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data;
  }
};

//update movie function
export const updateMovieService = async (id, movie, token) => {
  const { data } = await Axios.put(`/movies/${id}`, movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data;
  }
};
