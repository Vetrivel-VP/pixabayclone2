import React from "react";
import { Loader } from "../assets";

const MainLoader = () => {
  return (
    <div className=" fixed inset-0 flex items-center justify-center backdrop-blur-md">
      <img src={Loader} alt="" />
    </div>
  );
};

export default MainLoader;
