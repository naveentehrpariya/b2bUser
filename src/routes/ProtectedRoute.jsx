import React from "react";
import { Navigate } from "react-router-dom";
import Profile from "../pages/userProfile";
import ProductEnquiry from "../pages/productEnquiry";

const ProtectedRoute = [
  // { path: "*", element: <Navigate to="/sign-up" replace /> },
  { path: "/profile", element: <Profile /> },
  { path: `/product-enquiry/:id`, element: <ProductEnquiry /> },
];

export default ProtectedRoute;
