import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";

import { BrowserRouter as Router } from "react-router-dom";
import myReducer from "./context";

const root = ReactDOM.createRoot(document.getElementById("root"));

const myStore = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
root.render(
  <React.StrictMode>
    <Provider store={myStore}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
