import React, { useEffect, useState } from "react";
import Titles from "../../Titles";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Message, Select } from "../../UsedInputs";
import Rating from "../../Rating";
import Empty from "../../../utils/Notifications/Empty";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReviewValidation } from "../../../utils/movieValidation";
import { InlineError } from "../../../utils/Notifications/Error";
import { Link } from "react-router-dom";
import { reviewMovieAction } from "../../../Redux/Actions/moviesAction";
import toast from "react-hot-toast";

const Reviews = ({ movie }) => {
  const Ratings = [
    {
      title: "0 - Poor",
      value: 0,
    },
    {
      title: "1 - Fair",
      value: 1,
    },
    {
      title: "2 - Good",
      value: 2,
    },
    {
      title: "3 - Very Good",
      value: 3,
    },
    {
      title: "4 - Excellent",
      value: 4,
    },
    {
      title: "5 - Masterpiece",
      value: 5,
    },
  ];
  const dispatch = useDispatch();

  //getting movie from state
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovieReview
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  // Review Validations
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReviewValidation),
  });

  //on submit form
  const onSubmit = (data) => {
    dispatch(
      reviewMovieAction({
        id: movie?._id,
        review: { ...data },
      })
    );
  };

  //UseEffect
  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "CREATE_REVIEW_RESET" });
    }
  }, [dispatch, isError]);

  return (
    <div className="my-12">
      <Titles title="Reviews" Icon={BsBookmarkStarFill} />
      <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
        {/* Write review */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="xl:col-span-2 w-full flex flex-col gap-8"
        >
          <h3 className="text-xl text-text font-semibold">
            Review "{movie.title}"
          </h3>
          <p className="text-sm leading-7 font-meduim text-border">
            Write a review for this movie. It will be posted on this page. Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Amet, at!
          </p>
          <div className="text-sm w-full">
            <Select
              label="Select Rating"
              options={Ratings}
              name="rating"
              register={{ ...register("rating") }}
            />
            <div className="flex mt-4 text-lg gap2 text-star">
              <Rating value={watch("rating", false)} />
            </div>
            {errors.rating && <InlineError text={errors.rating.message} />}
          </div>
          {/* message */}
          <div className="w-full">
            <Message
              name="comment"
              register={{ ...register("comment") }}
              label="message"
              placeholder="Make it short and sweet...."
            />
            {errors.comment && <InlineError text={errors.comment.message} />}
          </div>

          {/* submit */}
          {userInfo ? (
            <button
              type="submit"
              disabled={isLoading}
              className="bg-subMain text-white py-4 w-full flex-colo rounded"
            >
              {isLoading ? "Loading..." : "Submit Review"}
              Submit
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-dry border border-dashed border-border text-subMain py-4 w-full flex-colo rounded"
            >
              Login to review this movie
            </Link>
          )}
        </form>
        {/* review */}
        <div className="col-span-3 flex w-full flex-col gap-6">
          <h3 className="text-xl text-text font-semibold">
            Reviews ({movie?.numberOfReviews})
          </h3>
          <div className="w-full flex flex-col bg-main gap-6 rounded md:p-12 p-6 h-header overflow-y-scroll">
            {movie?.reviews?.length > 0 ? (
              movie?.reviews?.map((review) => (
                <div
                  className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg"
                  key={review?._id}
                >
                  <div className="col-span-2 bg-main hidden md:block">
                    <img
                      src={
                        review?.userImage ? `${review?.userImage}` : "/user.png"
                      }
                      alt={review?.userName}
                      className="w-full h-24 rounded-lg object-cover"
                    />
                  </div>
                  <div className="col-span-7 flex flex-col gap2">
                    <h2> {review?.userName} </h2>
                    <p className="text-xs leading-6 font-medium text-text">
                      {review?.comment}
                    </p>
                  </div>
                  {/* Rates */}
                  <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                    <Rating value={review?.rating} />
                  </div>
                </div>
              ))
            ) : (
              <Empty message={`Be The first to rate "${movie.title}"`} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
