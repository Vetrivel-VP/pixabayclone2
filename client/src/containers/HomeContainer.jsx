import React from "react";
import { BannerImage } from "../assets";

const HomeContainer = () => {
  return (
    <div className="w-full h-[5000px]">
      <div className=" w-screen  h-420 flex items-center justify-center relative">
        <img src={BannerImage} className="w-full h-full object-cover" alt="" />
      </div>
      hi
    </div>
  );
};

export default HomeContainer;
