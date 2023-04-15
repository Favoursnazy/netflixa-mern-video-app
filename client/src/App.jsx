import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import ContactUs from "./Pages/ContactUs/ContactUs";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import NotFound from "./Pages/NotFound/NotFound";
import Favourites from "./Pages/Dashboard/FavouritesMovies/FavouritesMovies";
import MoviesPage from "./Pages/Movies/Movies";
import SingleMovie from "./Pages/SingleMovie/SingleMovie";
import Watch from "./Pages/Watch/Watch";
import Profile from "./Pages/Dashboard/Profile/Profile";
import ResetPassword from "./Pages/Dashboard/ResetPassword/ResetPassword";
import FavouritesMovies from "./Pages/Dashboard/FavouritesMovies/FavouritesMovies";
import Aos from "aos";
import MovieList from "./Pages/Dashboard/Admin/MovieList/MovieList";
import Dashboard from "./Pages/Dashboard/Admin/Dashboard";
import Categories from "./Pages/Dashboard/Admin/Categories/Categories";
import UserList from "./Pages/Dashboard/Admin/Users/Users";
import AddMovie from "./Pages/Dashboard/Admin/AddMovie/AddMovie";
import ScrollOnTop from "./ScrollToTop";
import DrawerContext from "./Context/DrawerContext";
import ToastContainer from "./utils/Notifications/Toast";
import { ProtectedRoutes, AdminProtectedRoutes } from "./ProtectedRoutes";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "./Redux/Actions/categoryAction";
import { getAllMoviesAction } from "./Redux/Actions/moviesAction";
import { getFavouritesMoviesAction } from "./Redux/Actions/userAction";
import EditMovie from "./Pages/Dashboard/Admin/EditMovie/EditMovie";

const App = () => {
  Aos.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError, isSuccess } = useSelector((state) => state.userLikeMovie);
  const { isError: catError } = useSelector((state) => state.getAllCategory);

  //UesEffect to load all categories
  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllMoviesAction({}));
    if (userInfo) {
      dispatch(getFavouritesMoviesAction());
    }
    if (isError || catError) {
      toast.error(isError || catError);
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
  }, [dispatch, userInfo, catError, isError, isSuccess]);

  return (
    <>
      <ToastContainer />
      <DrawerContext>
        <ScrollOnTop>
          <Routes>
            {/* *********************** PUBLIC ROUTES ********************* */}
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:search" element={<MoviesPage />} />
            <Route path="/movie/:id" element={<SingleMovie />} />
            <Route path="/watch/:id" element={<Watch />} />
            <Route path="*" element={<NotFound />} />
            {/* ************************ PROTECTED ROUTES *************** */}
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile" element={<Profile />} />{" "}
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/favourites" element={<FavouritesMovies />} />
              {/* ************************ ADMIN ROUTES ******************** */}
              <Route element={<AdminProtectedRoutes />}>
                <Route path="/movies-list" element={<MovieList />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/users-list" element={<UserList />} />
                <Route path="/add-movie" element={<AddMovie />} />
                <Route path="/edit-movie/:id" element={<EditMovie />} />
              </Route>
            </Route>
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  );
};

export default App;
