import React from "react";
import { Link } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="flex-colo gap-8 w-full min-h-screen text-white bg-main lg:py-20 py-10 px-6">
      <img
        src="/404.svg"
        className="w-full h-96 object-contain"
        alt="notFound"
      />
      <h1 className="lg:text-4xl font-semibold">Page Not Found</h1>
      <p className="font-medium text-border leading-6 ">
        This Page you are looking for does not exist. You may have mistyped the
        URL
      </p>
      <Link
        to="/"
        className="bg-subMain text-white flex-rows transitions gap-4 font-meduim py-2 px-6 hover:text-main rounded-md"
      >
        <BiHomeAlt /> Go back Home
      </Link>
    </div>
  );
};

export default NotFound;
