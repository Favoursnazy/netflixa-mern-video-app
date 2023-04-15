import React from "react";
import { BsFillGridFill } from "react-icons/bs";
import { FaHeart, FaListAlt, FaUsers } from "react-icons/fa";
import {
  RiLockPasswordFill,
  RiLogoutCircleLine,
  RiMovie2Fill,
} from "react-icons/ri";
import { HiViewGridAdd } from "react-icons/hi";
import { FiSettings } from "react-icons/fi";
import Layout from "../Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "../../Redux/Actions/userAction";
import { toast } from "react-hot-toast";

const SideBar = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.userLogin);

  //user logout function
  const logoutHandler = () => {
    dispatch(logoutAction());
    toast.success("Logged out successfully");
    navigate("/login");
  };
  const SideBarLinks = userInfo?.isAdmin
    ? [
        {
          name: "Dashboard",
          link: "/dashboard",
          icon: BsFillGridFill,
        },
        {
          name: "Movies",
          link: "/movies-list",
          icon: FaListAlt,
        },
        {
          name: "Add Movie",
          link: "/add-movie",
          icon: RiMovie2Fill,
        },
        {
          name: "Categories",
          link: "/categories",
          icon: HiViewGridAdd,
        },
        {
          name: "Users",
          link: "/users-list",
          icon: FaUsers,
        },
        {
          name: "Update Profile",
          link: "/profile",
          icon: FiSettings,
        },
        {
          name: "Favourites Movies",
          link: "/favourites",
          icon: FaHeart,
        },
        {
          name: "Change Password",
          link: "/reset-password",
          icon: RiLockPasswordFill,
        },
      ]
    : userInfo
    ? [
        {
          name: "Update Profile",
          link: "/profile",
          icon: FiSettings,
        },
        {
          name: "Favourites Movies",
          link: "/favourites",
          icon: FaHeart,
        },
        {
          name: "Change Pasword",
          link: "/reset-password",
          icon: RiLockPasswordFill,
        },
      ]
    : [];

  const active = "bg-dryGray text-subMain";
  const hover = "hover:text-white hover:bg-main";
  const inActive =
    "rounded font-medium text-sm transitions flex gap-3 items-center p-4";

  const Hover = ({ isActive }) => {
    return isActive ? `${active} ${inActive}` : `${inActive} ${hover}`;
  };
  return (
    <Layout>
      <div className="min-h-screen container mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-800 p-6 rounded-md xl:mb-0 mb-5">
            {
              //Sidebar Links
              SideBarLinks.map((link, index) => (
                <NavLink to={link.link} key={index} className={Hover}>
                  <link.icon /> <p>{link.name}</p>
                </NavLink>
              ))
            }
            <button
              className={`${inActive} ${hover} w-full`}
              onClick={logoutHandler}
            >
              <RiLogoutCircleLine /> Log Out
            </button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="10"
            data-aos-offset="200"
            className="col-span-6 rounded-md bg-dry border border-gray-800 p-6"
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SideBar;
