import { Navigate } from "react-router-dom";

import ProductList from "../pages/ProductList";
import ProductDetails from "../pages/productDetails";
import ProductEnquiry from "../pages/productEnquiry";
import About from "../pages/about";
import Contact from "../pages/contact";
import PrivacyPolicy from "../pages/privacyPolicy";
import Category from "../components/category/Category";
import HomeBar from "../pages/homeBar";
import ProductCompare from "../pages/productCompare";
import AskAi from "../pages/askAI";



const publicRoute = [
  { path: `*`, element: <Navigate to="/" replace /> },
  { path: `/`, element: <HomeBar /> },
  { path: `/category`, element: <Category /> },
  { path: `/product-listing`, element: <ProductList /> },
  { path: `/product-details/:id`, element: <ProductDetails /> },
  { path: `/product-enquiry`, element: <ProductEnquiry /> },
  { path: `/about`, element: <About /> },
  { path: `/contact`, element: <Contact /> },
  { path: `/product-compare`, element: <ProductCompare /> },
  { path: `/privacy-policy`, element: <PrivacyPolicy /> },
  // 
  { path : "/ask-ai/searches" , element : <AskAi/> }
];
export default publicRoute;
