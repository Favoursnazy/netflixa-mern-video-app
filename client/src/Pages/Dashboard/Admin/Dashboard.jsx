import React, { useEffect } from "react";
import SideBar from "../../../Layout/Sidebar/Sidebar";
import { HiViewGridAdd } from "react-icons/hi";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import Table from "../../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getAllCategoriesAction } from "../../../Redux/Actions/categoryAction";
import {
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../Redux/Actions/moviesAction";
import { getAllUsersAction } from "../../../Redux/Actions/userAction";
import Loader from "../../../utils/Notifications/Loader";
import Empty from "../../../utils/Notifications/Empty";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Useselectors from redux state
  const {
    categories,
    isLoading: catLoading,
    isError: catError,
  } = useSelector((state) => state.getAllCategory);
  const {
    users,
    isLoading: userLoading,
    isError: userError,
  } = useSelector((state) => state.adminGetAllUsers);

  const { isLoading, isError, movies, totalMovies } = useSelector(
    (state) => state.getMoviesList
  );

  // delete a single movie
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );

  //delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure, you want to delete thsi movie?") &&
      dispatch(deleteMovieAction(id));
  };

  // useEffect
  useEffect(() => {
    if (catError || isError || userError || deleteError) {
      toast.error("Something went wrong!");
    }
    //get all users
    dispatch(getAllUsersAction());

    //get all movies
    dispatch(getAllMoviesAction({}));

    //get all categories
    dispatch(getAllCategoriesAction());
  }, [dispatch, catError, userError, isError, deleteError]);

  // Dashboard datas
  const DashBoardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Loading..." : totalMovies || 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "Loading..." : categories?.length || 0,
    },
    {
      bg: "bg-green-700",
      icon: FaUser,
      title: "Total Users",
      total: userLoading ? "Loading.." : users?.length || 0,
    },
  ];
  return (
    <SideBar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid m:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashBoardData.map((data, index) => (
          <div
            key={index}
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-2"
          >
            <div
              className={`col-span-1 rounded-full h-12 flex-colo ${data.bg} `}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className="text-text mt-2 font-bold">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium my-6 text-border">Recent Movies</h3>
      {isLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <Table
          movie={movies.slice(0, 5)}
          admin={true}
          onDeleteHandler={deleteMovieHandler}
        />
      ) : (
        <Empty message="No movies now!!" />
      )}
    </SideBar>
  );
};

export default Dashboard;
