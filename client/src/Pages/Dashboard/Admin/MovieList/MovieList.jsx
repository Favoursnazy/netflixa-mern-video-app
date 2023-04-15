import React, { useEffect } from "react";
import Table from "../../../../Components/Table";
import SideBar from "../../../../Layout/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllMoviesAction } from "../../../../Redux/Actions/moviesAction";
import toast from "react-hot-toast";
import Loader from "../../../../utils/Notifications/Loader";
import Empty from "../../../../utils/Notifications/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { deleteAllMovieAction } from "../../../../Redux/Actions/moviesAction";
import { deleteMovieAction } from "../../../../Redux/Actions/moviesAction";

const MovieList = () => {
  const dispatch = useDispatch();
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  //get all movies from redux state
  const { movies, isLoading, pages, page, totalMovies, isError } = useSelector(
    (state) => state.getMoviesList
  );

  // delete a single movie
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );

  // dlete all movies from redux state
  const { isLoading: allLoading, isError: allError } = useSelector(
    (state) => state.deleteAllMovies
  );

  //delete movie handler
  const deleteMovieHandler = (id) => {
    window.confirm("Are you sure, you want to delete thsi movie?") &&
      dispatch(deleteMovieAction(id));
  };

  // delete all the movies handler
  const deleteAllMoviesHandler = () => {
    window.confirm("Are you sure, you want to delete") &&
      dispatch(deleteAllMovieAction());
  };

  useEffect(() => {
    //error
    if (isError || deleteError || allError) {
      toast.success(isError || deleteError || allError);
    }
    dispatch(getAllMoviesAction({}));
  }, [dispatch, isError, deleteError, allError]);

  //Pagination next and prev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };
  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movie List</h2>
          {movies?.length > 0 && (
            <button
              disabled={deleteLoading || isLoading || allLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {isLoading || allLoading || deleteLoading
                ? "Deleting..."
                : "Delete All"}
            </button>
          )}
        </div>
        {isLoading || deleteLoading || allLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table
              movie={movies}
              admin={true}
              onDeleteHandler={deleteMovieHandler}
            />
            {/* Loading More */}
            <div className="w-full flex-rows gap-6 my-5">
              <button
                onClick={prevPage}
                disabled={page == 1}
                className={sameClass}
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                onClick={nextPage}
                disabled={page == pages}
                className={sameClass}
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="You have no movies yet" />
        )}
      </div>
    </SideBar>
  );
};

export default MovieList;
