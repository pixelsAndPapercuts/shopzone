import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Theme from "./theme";
import store from "./Store/Store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Theme>
      <Provider store={store}>
        <App />
      </Provider>
    </Theme>
  </BrowserRouter>
);
