import React, { useEffect, useMemo, useState } from "react";
import Layout from "../../Layout/Layout";
import Filters from "../../Components/Filters";
import Movie from "../../Components/Movie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../../utils/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { getAllMoviesAction } from "../../Redux/Actions/moviesAction";
import {
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../../Datas/FilterData";
import { useParams } from "react-router-dom";

const MoviesPage = () => {
  const { search } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "All categories" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);
  const sameClass =
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";

  //get all movies from redux state
  const { movies, isLoading, pages, page, totalMovies, isError } = useSelector(
    (state) => state.getMoviesList
  );

  //get all categories from redux state
  const { categories } = useSelector((state) => state.getAllCategory);

  //Queries
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All categories" ? "" : category?.title,
      times: times?.title.replace(/\D/g, ""),
      language: language?.title === "Sort By Language" ? "" : language?.title,
      rate: rates?.title.replace(/\D/g, ""),
      year: year?.title.replace(/\D/g, ""),
      search: search ? search : "",
    };
    return query;
  }, [category, language, rates, year, times, search]);

  //UseEffect
  useEffect(() => {
    //error
    if (isError) {
      toast.success(isError);
    }
    //get all movies
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, isError, queries]);

  //Pagination next and prev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page - 1,
      })
    );
  };

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  };
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Filters data={datas} />
        <p className="text-lg font-meduim my-6">
          Total{" "}
          <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>{" "}
          items Found {search && `For "${search}"`}
        </p>
        {isLoading ? (
          <>
            <div className="w-full gap-6 flex-colo min-h-screen">
              <Loader />
            </div>
          </>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {movies?.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>
            {/* Loading More */}
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
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
          <>
            <div className="w-full gap-6 flex-colo min-h-screen">
              <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
                <RiMovie2Line />
              </div>
              <p className="text-border text-sm">
                It seem's like we dont have any movie yet
              </p>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MoviesPage;
