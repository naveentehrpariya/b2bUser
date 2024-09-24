import React, { useState } from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import { Button, Col, Container, Row } from "reactstrap";
import MyEnquires from "./MyEnquires"; // Ensure the correct import path
import "./userProfile.css";
import UserDetails from "./Profile";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/userAuthSlice";
import { clearProfile } from "../../redux/slices/profileSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(clearProfile()); // Clear the profile state
      localStorage.removeItem("token"); // Remove token from local storage
      navigate("/"); // Redirect to home
      Swal.fire({
        title: "Success!",
        text: "You have been logged out.",
        icon: "success",
        allowOutsideClick: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error?.message || "Unexpected error occurred during logout.",
        icon: "error",
        allowOutsideClick: false,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="abt-banner">
        <div className="container mx-autod-flex flex-column">
          <span className="h2 fw-bold">
            {useTranslate("Leading B2B E-commerce Platform")}
          </span>
          <span>
            {useTranslate(
              "Explore more than thousands of products and get the best AI filtration experience by answering a few questions, and AI will recommend the best products."
            )}
          </span>
        </div>
      </div>

      <div className="product-enquiry mt-0 main-container">
        <div className="container mx-auto" >
          <Row>
            <Col lg={5}>
              <div className="contact-form p-lg-5 p-4">
                <ul className="nav flex-column">
                  {/* <li className="nav-item">
                    <a
                      className={`nav-link fs-5 ${activeTab === "dashboard" ? "active" : ""}`}
                      href="#"
                      onClick={() => setActiveTab("dashboard")}
                    >
                      Dashboard
                    </a>
                  </li> */}
                  <li className="nav-item">
                    <a
                      className={`nav-link fs-5 ${
                        activeTab === "enquiries" ? "active" : " text-dark"
                      }`}
                      href="#"
                      onClick={() => setActiveTab("enquiries")}
                    >
                      {useTranslate("My Enquiries")}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link fs-5 ${
                        activeTab === "profile" ? "active" : "text-dark"
                      }`}
                      href="#"
                      onClick={() => setActiveTab("profile")}
                    >
                      {useTranslate("My Profile")}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      onClick={handleLogout}
                      className="nav-link fs-5 text-dark"
                      href="#"
                    >
                      {useTranslate("Logout")}
                    </a>
                  </li>
                </ul>
              </div>
            </Col>
            <Col lg={7} className="pt-5 pt-lg-0">
              {activeTab === "profile" && <UserDetails />}
              {activeTab === "enquiries" && <MyEnquires />}
            </Col>
          </Row>
        </div>
      </div>
      <div className="main-container">
        <Footer />
      </div>
    </>
  );
};

export default Profile;
