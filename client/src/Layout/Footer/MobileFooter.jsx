import React, { useContext } from "react";
import { BsCollectionPlay } from "react-icons/bs";
import { CgUser } from "react-icons/cg";
import { FiHeart, FiUserCheck } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import MenuDrawer from "../../Components/Drawer/MenuDrawer";
import { SideBarContext } from "../../Context/DrawerContext";
import { useSelector } from "react-redux";
import { AiTwotoneHome } from "react-icons/ai";

const MobileFooter = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const { likedMovies } = useSelector((state) => state.userGetFavouritesMovies);
  const { mobileDrawer, toggleDrawer } = useContext(SideBarContext);
  const active = "bg-subMain text-main";
  const InActive =
    "transitions text-2xl flex-colo hover:bg-white hover:text-main text-white rounded-md px-4 py-3";

  const Hover = ({ isActive }) =>
    isActive ? `${active} ${InActive}` : InActive;
  return (
    <>
      <div className="flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow w-full">
        <MenuDrawer drawerOpen={mobileDrawer} toggleDrawer={toggleDrawer} />
      </div>
      <footer className="lg:hidden fixed z-50 bottom-0 w-full px-1">
        <div className="bg-dry rounded-md flex-btn w-full p-1">
          <NavLink to="/" className={Hover}>
            <AiTwotoneHome />
          </NavLink>
          <NavLink to="/favourites" className={Hover}>
            <div className="relative">
              <div className="w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1">
                {likedMovies?.length || 0}
              </div>
              <FiHeart />
            </div>
          </NavLink>
          <NavLink
            to={
              userInfo?.isAdmin
                ? "/dashboard"
                : userInfo
                ? "/profile"
                : "/login"
            }
            className={Hover}
          >
            {userInfo ? (
              <img
                src={userInfo?.image ? userInfo.image : "/user.png"}
                alt={userInfo?.fullName}
                className="w-8 h-8 rounded-full object-cover border-subMain"
              />
            ) : (
              <CgUser className="w-8 h-8" />
            )}
          </NavLink>
          <NavLink to="/movies" className={InActive}>
            <BsCollectionPlay />
          </NavLink>
        </div>
      </footer>
    </>
  );
};

export default MobileFooter;
