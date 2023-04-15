import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { likemovieAction } from "../Redux/Actions/userAction";
import Axios from "../Redux/APIs/Axios";
import axios from "axios";
import { IoMdCloudDownload } from "react-icons/io";

//check if movie is aded to favourites
export const ifMovieLiked = (movie) => {
  const { likedMovies } = useSelector((state) => state.userGetFavouritesMovies);
  return likedMovies?.find((likedMovies) => likedMovies?._id === movie?._id);
};

//like movi functionality
export const likeMovie = (movie, dispatch, userInfo) => {
  return !userInfo
    ? toast.error("Please Login to add to favourites")
    : dispatch(
        likemovieAction({
          movieId: movie._id,
        })
      );
};

// check if image has a https or http protocol
export const hasValidUrlProtocol = (url) => {
  return ["http://", "https://", "ftp://"].some((protocol) =>
    url.startsWith(protocol)
  );
};

//download video url functionality
export const DownloadVideo = async (videoUrl, setProgress) => {
  const { data } = await Axios({
    url: videoUrl,
    method: "GET",
    responseType: "blob",
    onDownloadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      let percent = Math.floor((loaded * 100) / total);
      setProgress(percent);
      if (percent > 0 && percent < 100) {
        toast.loading(`Downloading... ${percent}`, {
          id: "download",
          duration: 100000000,
          position: "bottom-right",
          style: {
            background: "#0B0F29",
            color: "#FFFFFF",
            borderRadius: "10px",
            border: ".5px solid #F20000",
            padding: "16px",
          },
          icon: <IoMdCloudDownload className="text-2xl mr-2 text-subMain" />,
        });
      } else {
        toast.dismiss("download");
      }
    },
  });
  return data;
};
