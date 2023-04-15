import React, { useEffect } from "react";
import Layout from "../../Layout/Layout";
import { Input } from "../../Components/UsedInputs";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { RegisterValidations } from "../../utils/userValidation";
import { InlineError } from "../../utils/Notifications/Error";
import { registerAction } from "../../Redux/Actions/userAction";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isError, userInfo, isSuccess, isLoading } = useSelector(
    (state) => state.userRegister
  );

  //validated user inputs
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterValidations),
  });

  //on submit form
  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };

  //useEffect Login Page
  useEffect(() => {
    // if logged in is an admin
    if (userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/profile");
    }
    if (isSuccess) {
      toast.success(`Welcome ${userInfo?.fullName}`);
    }

    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [userInfo, isError, isSuccess, navigate, dispatch]);

  return (
    <Layout>
      <div className="container mx-auto pxx-2 my-24 flex-colo">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full 2xl:w-2/5 gap-8 flex-colo p-8 sm:p-14 md:w-3/5 bg-dry rounded-lg border border-border"
        >
          <img
            src="/logo.png"
            alt="logo"
            className="w-full h-12 object-contain"
          />
          <div className="w-full">
            <Input
              placeholder="netflixa@gmail.com"
              bg={true}
              type="text"
              label="Full Name"
              name="fullName"
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
          <div className="w-full">
            <Input
              placeholder="**********"
              bg={true}
              type="password"
              label="Password"
              name="password"
              register={register("password")}
            />
            {errors.password && <InlineError text={errors.password.message} />}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="bg-subMain transition hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full"
          >
            {
              //if its loading
              isLoading ? (
                "Loading....."
              ) : (
                <>
                  <FiLogIn /> Sign Up
                </>
              )
            }
          </button>
          <p className="text-center text-border">
            Already have an account?{""}{" "}
            <Link to="/login" className="text-dryGray font-semibold ml-2">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
