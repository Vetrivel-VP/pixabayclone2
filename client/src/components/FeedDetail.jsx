import React, { useEffect, useState } from "react";
import { NewPostBg } from "../assets";
import { useParams } from "react-router-dom";
import { addToCollection, fetchFeedDetail } from "../sanity";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MdBookmarks } from "react-icons/md";
import MasonaryLayout from "./MasonaryLayout";
import { Comment, Filter } from "../components";

const FeedDetail = () => {
  const [feed, setFeed] = useState(null);
  const [alreadySaved, setAlreadySaved] = useState(null);
  const user = useSelector((state) => state.user);
  const feeds = useSelector((state) => state.feeds);

  const { _id } = useParams();

  useEffect(() => {
    fetchFeedDetail(_id).then((data) => {
      setFeed(data[0]);
    });
    console.log(
      "Feed Suggestions",
      feeds?.filter((item) => item.otherMedia)
    );
  }, [_id]);

  useEffect(() => {
    // prettier-ignore
    setAlreadySaved(
      !!feed?.collections?.filter((item) => item._id === user?.uid)?.length
    );
    //   1 , [2,3,1] -> [1].length -> 1 -> !1 -> false -> !false -> true
    //   5 , [2,3,1] -> [].length -> 0 -> !0 -> true -> !true -> false
  }, [alreadySaved]);

  const saveToCollections = async (id, uid) => {
    if (!alreadySaved) {
      addToCollection(id, uid).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <div className="w-screen h-auto flex flex-col items-center justify-center relative">
      <div className=" w-full  h-[240px] relative">
        <img src={NewPostBg} className="w-full h-full object-cover" alt="" />
        <div className="absolute inset-0 bg-overlay-4"></div>
      </div>

      <Filter />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 px-8 lg:px-12 xl:px-32 py-6 gap-4">
        <div className="flex flex-col items-start justify-start gap-4">
          <div className="flex h-auto lg:h-600 xl:h-[800px] items-center justify-center flex-col overflow-hidden rounded-md shadow-md">
            {feed?.mainImage && (
              <img
                src={feed?.mainImage.asset.url}
                alt=""
                className="w-full h-full object-cover"
              />
            )}

            {feed?.otherMedia && (
              <video
                src={feed?.otherMedia.asset.url}
                loop
                autoPlay
                muted
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className=" w-full py-4 flex flex-col items-start justify-start">
            <Comment feed={feed} user={user} setFeed={setFeed} />
          </div>
        </div>
        <div className="flex items-start flex-col justify-start w-full gap-6">
          <div className="flex items-center justify-center gap-3">
            <img
              src={feed?.users?.photoURL}
              className="w-12 h-12 rounded-full object-cover shadow-md"
              alt=""
            />
            <p className="text-xl text-primary font-semibold">
              {feed?.users?.displayName}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-2 px-2 py-1 rounded-md border border-red-200">
              <FaHeart className="text-red-500 text-lg" />
              {feed?.collections?.length > 0 ? (
                <p className="text-base text-primary font-semibold">
                  {feed?.collections?.length}
                </p>
              ) : (
                <p className="text-base text-primary font-semibold">0</p>
              )}
            </div>

            <div
              className={`w-8 h-8 rounded-md flex items-center justify-center border cursor-pointer  ${
                alreadySaved
                  ? "border-emerald-400"
                  : "border-gray-100 bg-gray-300"
              }`}
              onClick={() => saveToCollections(feed?._id, user?.uid)}
            >
              {alreadySaved ? (
                <MdBookmarks className="text-xl text-emerald-500" />
              ) : (
                <MdBookmarks className="text-xl text-white" />
              )}
            </div>
          </div>

          {feed?.keywords?.length > 0 && (
            <p className="text-base text-primary font-semibold">
              Tags :{" "}
              {feed?.keywords?.map((tag, i) => (
                <span
                  className="px-1 py-[1px] mx-1 rounded-md border border-gray-200"
                  key={i}
                >
                  {tag}
                </span>
              ))}
            </p>
          )}

          {user && (
            <>
              {feed?.mainImage && (
                <a
                  href={`${feed?.mainImage?.asset.url}?dl`}
                  className=" w-auto px-16 text-lg text-gray-50 font-semibold py-2 rounded-full bg-emerald-500 hover:shadow-md"
                >
                  Free Download
                </a>
              )}

              {feed?.otherMedia && (
                <a
                  href={`${feed?.otherMedia?.asset.url}?dl`}
                  className=" w-auto px-16 text-gray-50 font-semibold py-2 rounded-full bg-emerald-500 hover:shadow-md"
                >
                  Free Download
                </a>
              )}
            </>
          )}

          <div className="w-full h-[1px] rounded-md bg-gray-200"></div>

          <p className="text-base text-primary">{feed?.description}</p>
          <p className="text-lg font-semibold text-primary">Suggested Post</p>

          <div className="w-full items-center justify-center flex-wrap gap-3">
            <MasonaryLayout
              isSuggestions={true}
              feeds={
                feed?.otherMedia
                  ? feeds?.filter((item) => item.otherMedia)
                  : feeds?.slice(0, 8).filter((item) => item.mainImage)
              }
            />
          </div>
        </div>
      </div>

      <div className=" w-full px-12 xl:px-32 flex flex-col items-start justify-start">
        <p className="text-lg font-semibold text-primary">Related Post</p>

        <div className="w-full items-center justify-center flex-wrap gap-3">
          <MasonaryLayout
            feeds={
              feed?.otherMedia
                ? feeds?.filter((item) => item.otherMedia)
                : feeds?.filter((item) => item.mainImage)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default FeedDetail;
