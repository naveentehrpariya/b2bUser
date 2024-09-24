import { Navigate } from "react-router-dom";
import SignIn from "../pages/Auth/signIn";
import SignUp from "../pages/Auth/signUp";
import ForgotPassword from "../pages/Auth/forgotPwd";
import ResetPassword from "../pages/Auth/resetPwd";

// import Verify from "../pages/auth/register/verify/verify";

const PrivateRoute = [
  { path: `*`, element: <Navigate to="/auth/login/email" replace /> },

  { path: `/sign-in`, element: <SignIn /> },
  { path: `/sign-up`, element: <SignUp /> },
  { path: `/forgot-password`, element: <ForgotPassword /> },
  { path: `/reset-password`, element: <ResetPassword /> },
];
export default PrivateRoute;
