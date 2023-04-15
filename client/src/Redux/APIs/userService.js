import Axios from "../APIs/Axios";

//************************  PUBLIC API  ***********************/

//register new user API call
export const registerService = async (userDetails) => {
  const { data } = await Axios.post("/user/register", userDetails);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

//logout user function
export const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

//login user API call'
export const loginService = async (userDetails) => {
  const { data } = await Axios.post("/user/login", userDetails);

  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

//******************* PRIVATE API's ************************/

//update profile API call
export const updateProfileService = async (user, token) => {
  const { data } = await Axios.put("/user/update", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

//delete user profile API call
export const deleteUserProfileService = async (token) => {
  const { data } = await Axios.delete("/user/delete", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data;
};

//change password API call
export const changePasswordService = async (password, token) => {
  const { data } = await Axios.put("/user/password", password, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//get all favourites movies
export const getFavouritesMoviesService = async (token) => {
  const { data } = await Axios.get("/user/favourites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data;
  }
};

//delete all favorites movies
export const deleteFavouritesMoviesService = async (token) => {
  const { data } = await Axios.delete("/user/deletelikes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// user like movie
export const userLikeMovieService = async (movieId, token) => {
  const { data } = await Axios.post("/user/likes", movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data;
  }
};
//***********************8 ADMIN API's ************************ */

//  admin get all users
export const adminGetAllUsersService = async (token) => {
  const { data } = await Axios.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    return data;
  }
};

//admin delete user
export const admindeleteUserService = async (id, token) => {
  const { data } = await Axios.delete(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
