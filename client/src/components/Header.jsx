import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../assets";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { firebaseAuth } from "../config/firebase.config";
import { createNewUser } from "../sanity";
import { SET_USER, SET_USER_NULL } from "../context/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { mainMenu } from "../utils/supports";

const Header = () => {
  const [color, setColor] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const changeColor = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY >= 1) {
        setColor(true);
      } else {
        setColor(false);
      }
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", changeColor);
  }

  const signWithGmail = async () => {
    await signInWithRedirect(firebaseAuth, provider).then((result) => {
      createNewUser(result?.user?.providerData[0]).then(() => {
        console.log("New User Created");
        dispatch(SET_USER(result?.providerData[0]));
      });
    });
  };

  const logOut = async () => {
    await firebaseAuth.signOut().then(() => {
      dispatch(SET_USER_NULL());
      navigate("/", { replace: true });
    });
  };

  return (
    <header
      className={`fixed inset-x-0 sm:px-12 lg:px-32 xl:px-44 py-4 flex items-center justify-between z-50 transition-all duration-300 ${
        color ? "bg-white" : "bg-transparent"
      }`}
    >
      {/* image section */}
      <Link to={"/"}>
        <img
          src={Logo}
          alt="Main Logo"
          className="w-24 h-auto object-contain"
        />
      </Link>
      {/* user Profile section */}
      <div className="flex items-center justify-center gap-4">
        {user ? (
          <>
            <div className="relative cursor-pointer">
              <img
                src={user?.photoURL}
                className="rounded-full w-10 h-10 object-cover"
                alt=""
                referrerPolicy="no-referrer"
                onClick={() => setIsMenu(!isMenu)}
              />

              {/* user menu options */}
              {isMenu && (
                <div
                  className="absolute right-0 top-12 rounded-md shadow-md w-64 px-4 py-3 bg-[#191B26] flex flex-col items-start justify-center gap-3"
                  onMouseLeave={() => setIsMenu(false)}
                >
                  <h2 className="text-gray-50 font-semibold">
                    {user?.displayName}
                  </h2>

                  {mainMenu &&
                    mainMenu.map((menu) => (
                      <Link
                        key={menu?.id}
                        to={`/newPost/${menu?.slug}`}
                        className="text-base text-gray-300"
                      >
                        {menu?.name}
                      </Link>
                    ))}
                  <div className="w-full h-[1px] bg-gray-700"></div>
                  <p className="text-xl text-gray-300" onClick={logOut}>
                    Logout
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div
              className={` flex items-center justify-center gap-2 border border-e-gray-300 px-2 py-1 rounded-md backdrop-blur-md cursor-pointer hover:shadow-md active:scale-95 transition-all ease-in-out duration-150`}
              onClick={signWithGmail}
            >
              <FcGoogle />
              <p
                className={`text-base ${
                  color ? "text-primary" : "text-gray-200"
                }`}
              >
                Login
              </p>
            </div>
          </>
        )}

        {user && (
          <Link
            to={"/newPost/upload"}
            className="px-4 py-2 rounded-full text-base font-semibold text-primary cursor-pointer bg-emerald-200 hover:bg-emerald-300"
          >
            Upload
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
