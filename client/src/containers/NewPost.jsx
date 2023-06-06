import React from "react";
import { NewPostBg } from "../assets";
import { subMenu } from "../utils/supports";
import { NavLink, Route, Routes } from "react-router-dom";
import { Collections, CreatePost, MyMedia } from "../components";
import { useSelector } from "react-redux";

const NewPost = () => {
  const feeds = useSelector((state) => state.feeds);

  return (
    <div className="w-screen h-auto flex flex-col items-center justify-center relative">
      <div className=" w-full  h-340 relative">
        <img src={NewPostBg} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-overlay-4"></div>
      </div>

      {/* filter section */}

      <section className="flex flex-col w-full h-auto items-center justify-start px-6 xl:px-16 py-12">
        <div className="w-full h-auto flex items-center justify-start overflow-x-scroll">
          <ul className="flex items-center gap-6 justify-center">
            {subMenu &&
              subMenu.map((menu) => (
                <NavLink
                  key={menu.id}
                  className={({ isActive }) =>
                    isActive
                      ? "text-lg text-blue-400 hover:text-blue-400  cursor-pointer"
                      : "text-lg text-primary hover:text-blue-400  cursor-pointer"
                  }
                  to={menu.slug}
                >
                  {menu.name}
                </NavLink>
              ))}
          </ul>
        </div>

        <div className=" w-full flex flex-col items-start justify-start h-auto py-4">
          <Routes>
            <Route path="/upload" element={<CreatePost />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/my-media" element={<MyMedia feeds={feeds} />} />
          </Routes>
        </div>
      </section>
    </div>
  );
};

export default NewPost;
