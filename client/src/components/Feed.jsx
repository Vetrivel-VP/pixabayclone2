import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdBookmarks, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { addToCollection, deleteFeed } from "../sanity";

const Feed = ({ data }) => {
  const [alreadySaved, setAlreadySaved] = useState(null);
  const [isHoverred, setIsHoverred] = useState(false);

  const user = useSelector((state) => state.user);

  const feedDelete = () => {
    deleteFeed(data._id).then(() => {
      window.location.reload();
    });
  };

  const saveToCollections = async (id, uid) => {
    if (!alreadySaved) {
      addToCollection(id, uid).then(() => {
        window.location.reload();
      });
    }
  };

  useEffect(() => {
    // 1, [2,4,1] -> [1].length -> 1 -> !1 -> false -> !false -> true
    // 5, [2,4,1] -> [].length -> 0 -> !0 -> true -> !true -> false
    // !!([2,4,1].filter(num => num.value === 1).length)
    // setAlreadySaved(data?.collections?.filter(item => item._id === user?.uid).length
    setAlreadySaved(
      !!data?.collections?.filter((item) => item._id === user?.uid).length
    );
  }, []);

  return (
    <div
      className="m-2 relative cursor-pointer"
      onMouseEnter={() => setIsHoverred(true)}
      onMouseLeave={() => setIsHoverred(false)}
    >
      <div className="relative cursor-pointer w-auto rounded-lg shadow-md overflow-hidden">
        {data?.mainImage && (
          <Link to={`/feed-detail/${data?._id}`} className="w-full h-full">
            <img
              src={data.mainImage.asset.url}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
        )}

        {data?.otherMedia && (
          <Link to={`/feed-detail/${data?._id}`} className="w-full h-full">
            <video
              src={data.otherMedia.asset.url}
              loop
              autoPlay
              muted
              className="w-full h-full object-cover"
            />
          </Link>
        )}

        {isHoverred && (
          <>
            <div className="absolute inset-x-0 top-0 px-3 py-2 flex items-center">
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center border ${
                  alreadySaved ? "border-emerald-400" : "border-gray-100"
                }`}
                onClick={() => saveToCollections(data?._id, user?.uid)}
              >
                <MdBookmarks
                  className={`text-xl ${
                    alreadySaved ? "text-emerald-400" : "text-gray-100"
                  }`}
                />
              </div>
            </div>
            {data?.keywords.length > 0 && (
              <div className="absolute inset-x-0 bottom-0 px-3 py-2 flex items-center gap-1 bg-gradient-to-bl from-[rgba(0,0,0,0.2)] to-[rgba(0,0,0,0.8)] backdrop-blur-sm flex-wrap">
                {data?.keywords.slice(0, 3).map((tag, i) => (
                  <p className="text-sm font-semibold text-gray-50" key={i}>{`${
                    tag.length > 10 ? `${tag.slice(1, 10)}...` : tag
                  }`}</p>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {user?.uid === data?.users?._id && (
        <div
          className="absolute top-2 right-2 z-20 w-6 h-6 cursor-pointer rounded-full bg-[rgba(256,256,256,0.6)] flex items-center justify-center hover:bg-white"
          onClick={feedDelete}
        >
          <MdDelete className="text-lg text-red-500" />
        </div>
      )}
    </div>
  );
};

export default Feed;
