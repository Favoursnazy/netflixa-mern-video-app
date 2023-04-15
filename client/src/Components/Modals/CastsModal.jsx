import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { HiPlusCircle } from "react-icons/hi";
import Uploader from "../Uploader";
import { Input } from "../UsedInputs";
import MainModal from "./MainModal";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { castsValidation } from "../../utils/movieValidation";
import {
  updateCastAction,
  addCastAction,
} from "../../Redux/Actions/moviesAction";
import { toast } from "react-hot-toast";
import ImagePreview from "../ImagePreview";
import { InlineError } from "../../utils/Notifications/Error";

const CastsModal = ({ modalOpen, setModalOpen, cast }) => {
  const dispatch = useDispatch();
  const [castImage, setCastImage] = useState("");
  const generatedID = Math.floor(Math.random() * 10000000000);

  const image = castImage ? castImage : cast?.image;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(castsValidation),
  });

  //on submit form
  const onSubmit = (data) => {
    if (cast) {
      //if cast is not null then update cast
      dispatch(
        updateCastAction({
          ...data,
          image: image,
          id: cast?.id,
        })
      );
      toast.success("Cast updated successfully");
    } else {
      // if not then create a new cast
      dispatch(
        addCastAction({
          ...data,
          image: image,
          id: generatedID,
        })
      );
      toast.success("Cast added successfully");
    }
    reset();
    setCastImage("");
    setModalOpen(false);
  };

  useEffect(() => {
    if (cast) {
      setValue("name", cast?.name);
    }
  }, [cast, setValue]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl">
        <h2 className="text-3xl font-bold ">
          {cast ? "Update Cast" : "Create Cast"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full">
            <Input
              placeholder="John Doe"
              bg={true}
              type="text"
              label="Cast Name"
              name="name"
              register={register("name")}
            />
            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          {/* images without title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image without Title
            </p>
            <Uploader setImageUrl={setCastImage} />
            <ImagePreview
              image={image ? image : "/user.png"}
              name="castImage"
            />
          </div>
          <button
            type="submit"
            onClick={() => setModalOpen(true)}
            className="w-full flex-rows gap-4 py-3 font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {cast ? (
              <>
                <FaEdit /> Update Cast
              </>
            ) : (
              <>
                <HiPlusCircle /> Add Cast
              </>
            )}
          </button>
        </form>
      </div>
    </MainModal>
  );
};

export default CastsModal;
