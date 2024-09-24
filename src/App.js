import ScrollToTop from "./components/Scrolls/ScrollToTop";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";

import { Route, Routes } from "react-router-dom";
import publicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import ProtectedRoute from "./routes/ProtectedRoute";
import {  useSelector } from "react-redux";

function App() {
  const { token } = useSelector((state) => state.authSlice);

  return (
    <>
      <ScrollToTop />
      <Routes>
        {publicRoute.map((route, index) => (
          <Route key={index} {...route} />
        ))}

        {token
          ? ProtectedRoute.map((route, index) => (
              <Route key={index} {...route} />
            ))
          : PrivateRoute.map((route, index) => (
              <Route key={index} {...route} />
            ))}
      </Routes>
    </>
  );
}

export default App;
