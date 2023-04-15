import React from "react";
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="w-full py-4 flex-colo">
      <PuffLoader color="#F20000" />
    </div>
  );
};

export default Loader;
