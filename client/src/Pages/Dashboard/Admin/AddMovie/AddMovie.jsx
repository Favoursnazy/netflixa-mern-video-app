import React, { useEffect, useState } from "react";
import SideBar from "../../../../Layout/Sidebar/Sidebar";
import { Input, Message, Select } from "../../../../Components/UsedInputs";
import Uploader from "../../../../Components/Uploader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastsModal from "../../../../Components/Modals/CastsModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";
import ImagePreview from "../../../../Components/ImagePreview";
import { movieValidation } from "../../../../utils/movieValidation";
import { InlineError } from "../../../../utils/Notifications/Error";
import {
  createMovieAction,
  removeCastAction,
} from "../../../../Redux/Actions/moviesAction";

const AddMovie = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get all categorie from state
  const { categories } = useSelector((state) => state.getAllCategory);
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovie
  );

  const { casts } = useSelector((state) => state.casts);

  //validated user inputs
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  //on submit form
  const onSubmit = (data) => {
    dispatch(
      createMovieAction({
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUrl,
        casts,
      })
    );
  };

  //delete cast
  const handleDeleteCast = (id) => {
    dispatch(removeCastAction(id));
    toast.success("Cast removed successfully");
  };

  useEffect(() => {
    // if modal is opened
    if (modalOpen === false) {
      setCast();
    }
    //if the movie was created succesfully
    if (isSuccess) {
      reset({
        title: "",
        time: 0,
        language: "",
        year: 2023,
        category: "",
        desc: "",
      });
      setImageWithoutTitle("");
      setImageTitle("");
      setVideoUrl("");
      dispatch({ type: "CREATE_MOVIES_RESET" });
      navigate("/add-movie");
    }
    if (isError) {
      toast.error("Something went wrong");
      dispatch({ type: "CREATE_MOVIES_RESET" });
    }
  }, [modalOpen, isError, dispatch, isSuccess, reset, navigate]);

  return (
    <SideBar>
      <CastsModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      <div className="flex flex-col gap-6 ">
        <h2 className="text-xl font-bold">Create Movies</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              placeholder="Avengers Marvel"
              bg={true}
              type="text"
              label="Movie Title"
              name="title"
              register={register("title")}
            />
            {errors.title && <InlineError text={errors.title.message} />}
          </div>
          <div className="w-full">
            <Input
              name="time"
              register={register("time")}
              placeholder="2 Hours"
              bg={true}
              type="number"
              label="Duration"
            />
            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              placeholder="English"
              bg={true}
              type="text"
              label="Language Subtitle"
              name="language"
              register={register("language")}
            />
            {errors.language && <InlineError text={errors.language.message} />}
          </div>
          <div className="w-full">
            <Input
              placeholder="2022"
              bg={true}
              type="number"
              label="Released Year"
              name="year"
              register={register("year")}
            />
            {errors.year && <InlineError text={errors.year.message} />}
          </div>
        </div>

        {/* IMAGES */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          {/* images without title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image without Title
            </p>
            <Uploader setImageUrl={setImageWithoutTitle} />
            <ImagePreview
              image={imageWithoutTitle ? imageWithoutTitle : "/user.png"}
              name="imageWithoutTitle"
            />
          </div>
          {/* image with title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image with title
            </p>
            <Uploader setImageUrl={setImageTitle} />
            <ImagePreview
              image={imageTitle ? imageTitle : "/user.png"}
              name="imageWithTitle"
            />
          </div>
        </div>
        {/* DESCRIPTION */}
        <div className="w-full">
          <Message
            label="Movie Description"
            name="desc"
            placeholder="Write a little information about the movie"
            register={{ ...register("desc") }}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>

        {/* Category */}
        <div className="text-sm w-full">
          <Select
            label="Movie Category"
            options={categories?.length > 0 ? categories : []}
            name="category"
            register={{ ...register("category") }}
          />
          {errors.category && <InlineError text={errors.category.message} />}
        </div>
        {/* MOVIE VIDEO */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-border font-semibold text-sm">
            Movie Video
          </label>
          <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
            {videoUrl && (
              <div className="w-full bg-main text-sm text-subMain border py-4 border-border rounded flex-colo">
                Video Uploaded!!!
              </div>
            )}

            <Uploader setImageUrl={setVideoUrl} />
          </div>
        </div>
        {/* CASTS */}
        <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
          >
            Add Cast
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-col-4 grid-cols-2 gap-4">
            {casts?.length > 0 &&
              casts?.map((cast) => (
                <div
                  key={cast.id}
                  className="p-2 italic text-xs text-text rounded flex-colo bg-main border border-border"
                >
                  <img
                    src={`${cast?.image ? cast.image : "/user.png"}`}
                    alt={cast?.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p>{cast?.name}</p>
                  <div className="flex-rows mt-2 w-full gap-2">
                    <button
                      onClick={() => handleDeleteCast(cast?.id)}
                      className="w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded"
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => {
                        setCast(cast);
                        setModalOpen(true);
                      }}
                      className="w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading || !videoUrl || !imageTitle || !imageWithoutTitle}
          className="bg-subMain w-full flex-rows gap-6 font-medium transitions hover:bg-dry border border-subMain text-white py-4  rounded"
        >
          {isLoading ? (
            "Please Wait, Publishing Movie..."
          ) : (
            <>
              <ImUpload /> Publish Movie
            </>
          )}
        </button>
      </div>
    </SideBar>
  );
};

export default AddMovie;
