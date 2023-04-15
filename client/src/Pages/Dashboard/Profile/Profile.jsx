import React, { useEffect, useState } from "react";
import Uploader from "../../../Components/Uploader";
import { Input } from "../../../Components/UsedInputs";
import Sidebar from "../../../Layout/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileValidation } from "../../../utils/userValidation";
import {
  updateProfileAction,
  deleteUserProfileAction,
} from "../../../Redux/Actions/userAction";
import { InlineError } from "../../../utils/Notifications/Error";
import ImagePreview from "../../../Components/ImagePreview";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
  const { isError, isSuccess, isLoading } = useSelector(
    (state) => state.userupdateProfile
  );

  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useSelector((state) => state.userDeleteProfile);

  //validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  //update profile
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };

  //delete profile
  const deleteProfile = () => {
    window.confirm("Are you sure you want to delete your profile?");
    dispatch(deleteUserProfileAction());
  };

  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo.fullName);
      setValue("email", userInfo.email);
    }

    if (isError || deleteError) {
      toast.error(isError || deleteError);
      deleteError && dispatch({ type: "USER_DELETE_PROFILE_RESET" });
      isError && dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }

    if (isSuccess || deleteSuccess) {
      isSuccess && dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
      deleteSuccess && dispatch({ type: "USER_DELETE_PROFILE_RESET" });
    }
  }, [
    userInfo,
    setValue,
    isError,
    isSuccess,
    dispatch,
    deleteError,
    deleteSuccess,
  ]);

  return (
    <Sidebar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploader setImageUrl={setImageUrl} />
          </div>
          {/* {image preview} */}
          <div className="col-span-2">
            <ImagePreview
              image={imageUrl}
              name={userInfo ? userInfo.fullName : "Netflixa React Tailwind"}
            />
          </div>
        </div>
        <div className="w-full">
          <Input
            placeholder="Netflixa User Full Name"
            bg={true}
            type="text"
            label="Full Name"
            name="email"
            register={register("fullName")}
          />
          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>
        <div className="w-full">
          <Input
            placeholder="netflixa@gmail.com"
            bg={true}
            type="email"
            label="email"
            name="email"
            register={register("email")}
          />
          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex  gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            disabled={isLoading || deleteLoading}
            onClick={deleteProfile}
            type="submit"
            className="bg-subMain font-medium transitions hover:bg-main border-subMain text-white py-3 px-6 rounded-lg w-full sm:w-auto"
          >
            {deleteLoading ? "Deleting..." : "Delete Account"}
          </button>
          <button
            type="submit"
            disabled={isLoading || deleteLoading}
            className="bg-main font-medium transitions hover:bg-subMain border-2 border-subMain text-white py-3 px-6 rounded-lg w-full sm:w-auto"
          >
            {isLoading ? "Updating Profile..." : "Update Profile"}
          </button>
        </div>
      </form>
    </Sidebar>
  );
};

export default Profile;
