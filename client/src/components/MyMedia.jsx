import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import MasonaryLayout from "./MasonaryLayout";

const MyMedia = ({ feeds }) => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [filteredFeed, setFilteredFeed] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    setFilteredFeed(feeds?.filter((data) => data.users._id === user?.uid));
    setInterval(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-start">
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="w-full items-center justify-between flex-wrap gap-3">
            <MasonaryLayout feeds={filteredFeed} />
          </div>
        </>
      )}
    </div>
  );
};

export default MyMedia;
