import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/swiperStyles.css";
import "swiper/css/bundle";
import { categoriesList } from "../utils/supports";
import { Spinner } from "../components";
import { BiCloudUpload } from "react-icons/bi";
import { AiFillCloseCircle, AiOutlineClear } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { deleteUploadedAsset, savePost, uploadAsset } from "../sanity";
import { useSelector } from "react-redux";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [asset, setAsset] = useState(null);
  const [keywords, setKeywords] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const user = useSelector((state) => state.user);

  const handleFileSelect = async (event) => {
    setIsLoading(true);
    const file = event.target.files[0];
    if (file && isAllowed(file)) {
      await uploadAsset(file).then((data) => {
        console.log("Uploaded asset", data);
        setAsset(data);
        setInterval(() => {
          setIsLoading(false);
        }, 3000);
      });
    } else {
      setIsLoading(false);
      setAsset(null);
      setAlert("Invalid File Type");
      setInterval(() => {
        setAlert(null);
      }, 3000);
    }
  };

  const isAllowed = (file) => {
    const allowedTypes = [
      "audio/mp3",
      "audio/wav",
      "video/avi",
      "video/mp4",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
    ];
    return allowedTypes.includes(file.type);
  };

  const deleteAsset = async (id) => {
    setIsLoading(true);
    await deleteUploadedAsset(id).then((data) => {
      console.log("Deleted Asset:", data);
      setAsset(null);
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      setTags(keywords.split(","));
      setKeywords("");
      console.log(tags);
    }
  };

  const saveData = async () => {
    if (!title || !asset || !category || !tags) {
      setAlert("Required Fields are missing");
      setInterval(() => {
        setAlert(null);
      }, 2000);
    } else {
      if (asset?.mimeType.split("/")[0] === "image") {
        const doc = {
          _type: "post",
          title,
          keywords: tags,
          description,
          filesource:
            asset?.mimeType.split("/")[0] === "image" ? "image" : "others",
          mainImage: {
            _type: "mainImage",
            asset: {
              _type: "reference",
              _ref: asset?._id,
            },
          },
          categories: category,
          users: {
            _type: "reference",
            _ref: user?.uid,
          },
        };

        await savePost(doc).then(() => {
          setTitle("");
          setCategory(null);
          setKeywords("");
          setTags([]);
          setAsset(null);
          setDescription("");
          setAlert("Data Saved");
          setInterval(() => {
            setAlert(null);
          }, 3000);
        });
      } else {
        const doc = {
          _type: "post",
          title,
          keywords: tags,
          description,
          filesource:
            asset?.mimeType.split("/")[0] === "image" ? "image" : "others",
          otherMedia: {
            _type: "otherMedia",
            asset: {
              _type: "reference",
              _ref: asset?._id,
            },
          },
          categories: category,
          users: {
            _type: "reference",
            _ref: user?.uid,
          },
        };

        await savePost(doc).then(() => {
          setTitle("");
          setCategory(null);
          setKeywords("");
          setTags([]);
          setAsset(null);
          setDescription("");
          setAlert("Data Saved");
          setInterval(() => {
            setAlert(null);
          }, 3000);
        });
        window.location.reload();
      }
    }
  };

  return (
    <div className=" w-full h-auto flex items-center justify-start flex-col gap-4">
      {/* alert notification */}
      {alert && (
        <div className="w-full px-4 py-3 rounded-md bg-red-100 shadow-inner  flex items-center justify-center">
          <p className="text-xl text-primary font-medium">{alert}</p>
        </div>
      )}
      {/* title */}

      <input
        type="text"
        placeholder="Your post tile here"
        className=" w-full px-4 py-3 rounded-md border border-gray-200 shadow-inner text-lg text-primary font-semibold"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* categories section */}

      <Swiper
        grabCursor={true}
        spaceBetween={10}
        centeredSlides={false}
        className="mySwiper"
        slidesPerView={8}
      >
        {categoriesList &&
          categoriesList.map((value) => (
            <SwiperSlide key={value.id} className="py-4">
              <div
                className={`px-2 py-1 flex items-center justify-center rounded-md border border-gray-200 hover:shadow-md shadow-inner ${
                  category === value.name && "bg-gray-200"
                }`}
                onClick={() => setCategory(value.name)}
              >
                <p className="text-base text-primary cursor-pointer">
                  {value.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* file upload */}
      <div className="w-full bg-gray-100 backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer flex items-center justify-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {!asset ? (
              <>
                <label className=" w-full cursor-pointer h-full">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                      <p className="font-bold text-2xl">
                        <BiCloudUpload />
                      </p>
                      <p className="text-lg">Click to upload</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    className="w-0 h-0"
                    accept=".mp3,.wav,.avi,.mp4,.jpeg,.png,.gif"
                    onChange={handleFileSelect}
                  />
                </label>
              </>
            ) : (
              <>
                {asset &&
                  [
                    "image/jpeg",
                    "image/jpg",
                    "image/png",
                    "image/gif",
                  ].includes(asset?.mimeType) && (
                    <img
                      src={asset?.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  )}

                {asset &&
                  ["video/mp4", "video/avi", "video/mov", "video/wav"].includes(
                    asset?.mimeType
                  ) && (
                    <video
                      src={asset?.url}
                      controls
                      className=" w-full h-full object-cover"
                    />
                  )}
              </>
            )}
          </>
        )}

        {asset && (
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center bg-red-400 hover:bg-red-600 cursor-pointer absolute top-5 right-5"
            onClick={() => deleteAsset(asset?._id)}
          >
            <FaTrash className="text-base text-white" />
          </div>
        )}
      </div>

      {/* keywords section */}
      <div className=" w-full flex flex-col gap-4 items-center justify-center">
        <div className="w-full flex flex-col gap-4 items-center justify-center relative">
          <input
            type="text"
            placeholder="Type your Tags here separated by comma"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-200 shadow-inner text-lg text-primary font-semibold"
            onKeyUp={handleKeyUp}
          />
          <AiOutlineClear
            className="absolute right-3 text-xl text-primary cursor-pointer hover:text-2xl transition-all duration-150"
            onClick={() => {
              setKeywords("");
              setTags([]);
            }}
          />
        </div>
        {tags.length > 0 && (
          <div className=" w-full h-auto px-4 py-4 flex items-center justify-between flex-wrap border border-dashed rounded-md border-gray-200 gap-4">
            {tags.map((tag, i) => (
              <div
                className="flex items-center justify-center gap-2 px-2 py-1 rounded-md border border-gray-200 border-dashed shadow-inner hover:bg-gray-200 cursor-pointer"
                key={i}
              >
                <p>{tag}</p>
                <AiFillCloseCircle
                  className="text-lg text-primary cursor-pointer"
                  onClick={() => {
                    setTags(tags.filter((value) => value !== tag));
                  }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* description */}

      <textarea
        type="text"
        rows={6}
        cols={1}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full px-4 py-3  rounded-md border border-gray-200 shadow-inner text-lg text-primary font-semibold "
      />

      {/* button */}

      <div className="w-full flex items-center">
        <button
          className="px-4 py-2 rounded-md bg-blue-300 text-lg text-primary cursor-pointer hover:bg-blue-600 hover:text-white w-full lg:w-60 ml-auto"
          onClick={saveData}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
