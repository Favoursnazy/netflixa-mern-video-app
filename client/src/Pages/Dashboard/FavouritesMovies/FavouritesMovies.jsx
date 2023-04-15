import React, { useEffect } from "react";
import Table from "../../../Components/Table";
import SideBar from "../../../Layout/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  deleteFavouritesMoviesAction,
  getFavouritesMoviesAction,
} from "../../../Redux/Actions/userAction";
import Loader from "../../../utils/Notifications/Loader";
import Empty from "../../../utils/Notifications/Empty";

const FavouritesMovies = () => {
  const dispatch = useDispatch();

  const { isError, isLoading, likedMovies } = useSelector(
    (state) => state.userGetFavouritesMovies
  );

  //delete user from state handler
  const {
    isError: deleteError,
    isLoading: deleteLoading,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavouritesMovies);

  //delete movie handle
  const deleteMovieHandler = () => {
    window.confirm("Are you sure you want to delete all movies?");
    dispatch(deleteFavouritesMoviesAction());
  };

  useEffect(() => {
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "GET_FAVOURITES_MOVIES_RESET"
          : "DELETE_FAVOURITE_MOVIES_RESET",
      });
    }
    return () => dispatch(getFavouritesMoviesAction());
  }, [dispatch, isError, deleteError, isSuccess]);
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favourites Movies</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading || isLoading}
              onClick={deleteMovieHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {deleteLoading ? "Deleteting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies?.length > 0 ? (
          <Table movie={likedMovies} admin={false} />
        ) : (
          <Empty message="You Have No Favourites Movies For Now!" />
        )}
      </div>
    </SideBar>
  );
};

export default FavouritesMovies;
