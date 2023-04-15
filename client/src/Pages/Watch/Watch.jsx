import React, { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { useParams, Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../../Redux/Actions/moviesAction";
import Loader from "../../utils/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import {
  hasValidUrlProtocol,
  ifMovieLiked,
  likeMovie,
} from "../../utils/Functionalities";

const Watch = () => {
  let { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // const movie = Movies.find((movie) => movie._id.toString() === id);
  const [play, setPlay] = useState(false);

  //Getting movies from state
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  const { isLoading: likedLoading } = useSelector(
    (state) => state.userLikeMovie
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  //if liked function
  const isLiked = ifMovieLiked(movie);

  //useeffect
  useEffect(() => {
    //movie id
    return () => dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="container mx-auto mb-12 bg-dry p-6">
        {!isError && (
          <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
            <Link
              className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
              to={`/movie/${movie?._id}`}
            >
              <BiArrowBack />
              {movie?.title}
            </Link>
            <div className="flex-btn sm:w-auto w-full gap-5">
              <button
                onClick={() => likeMovie(movie, dispatch, userInfo)}
                disabled={isLiked || likedLoading}
                className={`bg-white hover:text-subMain 
              ${isLiked ? "text-subMain" : "text-white"}
              transitions bg-opacity-30 rounded px-4 py-3 text-sm`}
              >
                <FaHeart />
              </button>
              <button className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded font-medium px-8 py-3 text-sm">
                <FaCloudDownloadAlt /> Download
              </button>
            </div>
          </div>
        )}

        {/* Watch Video */}
        {play ? (
          <video controls autoPlay={play} className="w-full h-full rounded">
            <source src={movie?.video} type="video/mp4" title={movie?.title} />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            {isLoading ? (
              <div className={sameClass}>
                <Loader />
              </div>
            ) : isError ? (
              <div className={sameClass}>
                <div className="flex-colo mbb-4 w-24 p-5 rounded-full bg-main text-subMain text-4xl">
                  <RiMovie2Line />
                </div>
                <p className="text-border text-sm">{isError}</p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                  <button
                    onClick={() => setPlay(true)}
                    className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>
                <img
                  alt={movie?.title}
                  src={
                    hasValidUrlProtocol(`${movie?.image}`)
                      ? movie?.image
                      : `/images/movies/${movie?.image}`
                  }
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Watch;
