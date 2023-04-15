import React, { useEffect } from "react";
import { Input } from "../../../Components/UsedInputs";
import SideBar from "../../../Layout/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { InlineError } from "../../../utils/Notifications/Error";
import { changePasswordValidation } from "../../../utils/userValidation";
import { changeUserPasswordAction } from "../../../Redux/Actions/userAction";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.userChangePassword
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(changeUserPasswordAction(data));
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_CHANGE_PASSWORD_RESET" });
    }
    if (message) {
      toast.success(message);
      reset();
    }
  }, [isSuccess, dispatch, isError, message, reset]);

  return (
    <SideBar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 ">
        <h2 className="text-xl font-bold">Change Password</h2>
        <div className="w-full">
          <Input
            placeholder="************"
            bg={true}
            type="password"
            label="Old Password"
            name="oldPassword"
            register={register("oldPassword")}
          />
          {errors.oldPassword && (
            <InlineError text={errors.oldPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Input
            placeholder="*************"
            bg={true}
            type="password"
            label="New Password"
            name="newPassword"
            register={register("newPassword")}
          />
          {errors.newPassword && (
            <InlineError text={errors.newPassword.message} />
          )}
        </div>
        <div className="w-full">
          <Input
            placeholder="**************"
            bg={true}
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            register={register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <InlineError text={errors.confirmPassword.message} />
          )}
        </div>
        <div className="flex justify-end items-center my-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-main font-medium transitions hover:bg-subMain border-2 border-subMain text-white py-3 px-6 rounded-lg w-full sm:w-auto"
          >
            {isLoading ? "Updating..." : "Change Password"}
          </button>
        </div>
      </form>
    </SideBar>
  );
};

export default ResetPassword;
