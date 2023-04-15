import React from "react";
import { FiUser } from "react-icons/fi";

const Promos = () => {
  return (
    <div className="my-20 py-20 md:px-20 px-8 bg-dry">
      <div className="lg:grid lg:grid-cols-2 lg:gap-10 items-center">
        <div className="flex lg:gap-10 gap-6 flex-col">
          <h1 className="xl:text-3xl text-xl  capitalize font-sans font-meduim xl:leading-loose">
            Download Your Movies & Watch Offline. <br /> Enjoy on your Mobile
          </h1>
          <p className="text-text text-sm xl:text-base leading-6 xl:leading-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            qui? Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Labore, qui? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Labore, qui? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Labore, qui? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Labore, qui? Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Labore, qui?
          </p>
          <div className="flex gap-4 md:text-lg text-sm">
            <div className="flex-colo bg-black text-subMain px-6 py-3 rounded font-bold">
              HD 4K
            </div>
            <div className="flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded font-bold">
              <FiUser /> 2K
            </div>
          </div>
        </div>
        <div className="">
          <img
            src="/mobile.png"
            alt="Mobile"
            className="w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Promos;
