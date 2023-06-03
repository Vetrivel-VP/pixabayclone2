import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomeContainer, NewPost } from "./containers";
import { Header, MainLoader } from "./components";
import { useEffect } from "react";
import { firebaseAuth } from "./config/firebase.config";
import { createNewUser } from "./sanity";
import { useDispatch } from "react-redux";
import { SET_USER } from "./context/actions/userActions";

const App = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((result) => {
      if (result) {
        console.log("User", result?.providerData[0]);
        createNewUser(result?.providerData[0]).then(() => {
          console.log("New User Created");
          dispatch(SET_USER(result?.providerData[0]));
          setInterval(() => {
            setIsLoading(false);
          }, 2000);
        });
      }
    });
  }, []);
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start">
      {isLoading ? (
        <MainLoader />
      ) : (
        <>
          {/* Header */}
          <Header />

          {/* main content sections */}
          <main className="w-full h-full flex items-center justify-center">
            {/* Routes */}
            <Routes>
              <Route path="/*" element={<HomeContainer />} />
              <Route path="/newPost/*" element={<NewPost />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
};

export default App;
