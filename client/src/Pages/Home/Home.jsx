import React, { useEffect } from "react";
import Banner from "../../Components/Home/Banner";
import PopularMovies from "../../Components/Home/PopularMovies";
import Promos from "../../Components/Home/Promos";
import TopRated from "../../Components/Home/TopRated";
import Layout from "../../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMoviesAction,
} from "../../Redux/Actions/moviesAction";

const Home = () => {
  const dispatch = useDispatch();

  // Useselectors from redux state
  const {
    movies: randomMovies,
    isLoading: randomLoading,
    isError: randomError,
  } = useSelector((state) => state.getRandomMovies);
  const {
    movies: topRatedMovies,
    isLoading: topLoading,
    isError: topError,
  } = useSelector((state) => state.getTopRatedMovies);

  const { isLoading, isError, movies } = useSelector(
    (state) => state.getMoviesList
  );

  // useEffect
  useEffect(() => {
    if (randomError || isError || topError) {
      toast.error("Something went wrong!");
    }
    //get random movies
    dispatch(getRandomMoviesAction());

    //get all movies
    dispatch(getAllMoviesAction({}));

    //get aall top rated movies
    dispatch(getTopRatedMoviesAction());
  }, [dispatch, randomError, isError, topError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        <TopRated movies={topRatedMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
};

export default Home;
