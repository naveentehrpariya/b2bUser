import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";
import { LanguageProvider } from "./utils/LanguageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <LanguageProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </Provider>
  // </React.StrictMode>
);
