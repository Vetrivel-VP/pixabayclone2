import React, { useEffect, useState } from "react";
import { BannerImage } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeeds } from "../sanity";
import { SET_FEED } from "../context/actions/feedActions";

import { Banner, Filter, MasonaryLayout, Spinner } from "../components";

const HomeContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const feeds = useSelector((state) => state.feeds);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!feeds) {
      setIsLoading(true);
      fetchFeeds().then((data) => {
        console.log("Home Container : Fetch Feeds : ", data);
        dispatch(SET_FEED(data));

        setInterval(() => {
          setIsLoading(false);
        }, 2000);
      });
    }
  }, []);

  return (
    <div className="w-full h-[5000px]">
      <Banner />

      <Filter />

      {isLoading ? (
        <div className=" w-full p-12 flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className=" w-full items-center justify-between flex-wrap gap-3 px-8 py-6">
          <MasonaryLayout feeds={feeds} />
        </div>
      )}
    </div>
  );
};

export default HomeContainer;
