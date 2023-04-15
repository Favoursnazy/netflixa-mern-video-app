import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieInfo from "../../Components/Single/MovieInfo/MovieInfo";
import Layout from "../../Layout/Layout";
import MovieCasts from "../../Components/Single/MovieCasts/MovieCasts";
import Reviews from "../../Components/Single/Reviews/Reviews";
import Titles from "../../Components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../../Components/Movie";
import ShareMovieModal from "../../Components/Modals/ShareMovieModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../../Redux/Actions/moviesAction";
import Loader from "../../utils/Notifications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { SideBarContext } from "../../Context/DrawerContext";
import { DownloadVideo } from "../../utils/Functionalities";
import FileSaver from "file-saver";

const SingleMovie = () => {
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const { id } = useParams();
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setProgress } = useContext(SideBarContext);
  // const movieId = Movies.find((movie) => movie._id.toString() === id);
  // const RelatedMovies = Movies.filter((m) => m.category === movieId.category);
  const dispatch = useDispatch();

  //Getting movies from state
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );
  const { movies } = useSelector((state) => state.getMoviesList);

  //rated movies by category
  const relatedMovies = movies?.filter((m) => m.category === movie?.category);

  // download movie functionality
  const HandleDownloadMovie = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setProgress).then((data) => {
      setProgress(0);
      FileSaver.saveAs(data, name);
    });
  };

  //useeffect
  useEffect(() => {
    //movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo mbb-4 w-24 p-5 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went Wrong</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            movie={movie}
          />
          <MovieInfo
            movie={movie}
            setModalOpen={setModalOpen}
            DownloadVideo={HandleDownloadMovie}
            progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCasts movie={movie} />
            {/* Ratings */}
            <Reviews movie={movie} />
            {/* Related */}
            {relatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {relatedMovies.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default SingleMovie;
