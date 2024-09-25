import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "./header.css";
import Swal from "sweetalert2";
import { clearProfile, userProfile } from "../../redux/slices/profileSlice";
// import { logout } from "../../redux/slices/authSlice";
import { logout } from "../../redux/slices/userAuthSlice";
import logo from "../../assets/svg/logo.svg";
import { LuUser, LuLogOut, LuUserPlus } from "react-icons/lu";
import { TfiWorld } from "react-icons/tfi";
import SubHeader from "../subHeader/SubHeader";
import { LanguageContext } from "../../utils/LanguageContext";
import { useTranslate } from "../../hooks/useTranslate";

const Header = (args) => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  const [isOpen, setIsOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langDropdownopen, setlangDropdownopen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authSlice);
  const profile = useSelector((state) => state.profileSlice.profile);

  const toggle = () => setIsOpen(!isOpen);
  const toggleLangDropdown = () => setlangDropdownopen(!langDropdownopen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    if (token) {
      dispatch(userProfile());
    }
  }, [dispatch, token]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      dispatch(clearProfile());
      localStorage.removeItem("token");
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

  const handleProfile = () => {
    console.log("Navigating to profile page");
    navigate("/profile");
  };

  const isActive = (path) => location.pathname === path;

  const logoutText = useTranslate("Logout");
  const profileText = useTranslate("Profile");
  const signInText = useTranslate("Sign In");
  const signUpText = useTranslate("Sign Up");

  return (
    <div className="sticky top-0 z-[999] bg-white">
      <Navbar
        {...args}
        className={`bg-white py-3  w-full `}
        expand="lg">
          <div className="w-full flex items-center justify-between">
            <Link to="/">
            WHOYOUINTO ADMIN
              {/* <img src={logo} alt="logo" /> */}
            </Link>
            <div className="ms-auto">
              <NavbarToggler onClick={toggle} />
              <Collapse className="w-auto" isOpen={isOpen} navbar>
                <Nav className="">
                  <NavItem className="p-2">
                    <Link
                      to="/product-listing"
                      className={`nav-link ${
                        isActive("/product-listing")
                          ? "bg-custom-primary text-white rounded"
                          : "text-grey"
                      }`}
                    >
                      {useTranslate("Shop")}
                    </Link>
                  </NavItem>

                  <NavItem className="p-2">
                    <Link
                      to="/product-compare"
                      className={`nav-link ${
                        isActive("/product-compare")
                          ? "bg-custom-primary text-white rounded"
                          : "text-grey"
                      }`}
                    >
                      {useTranslate("Compare")}
                    </Link>
                  </NavItem>

                  {/* about */}
                  <NavItem className="p-2">
                    <Link
                      to="/about"
                      className={`nav-link ${
                        isActive("/about")
                          ? "bg-custom-primary text-white rounded"
                          : "text-grey"
                      }`}
                    >
                      {useTranslate("About")}
                    </Link>
                  </NavItem>

                  <NavItem className="p-2">
                    <Link
                      to="/"
                      className={`nav-link ${
                        isActive("/help-center")
                          ? "bg-custom-primary text-white rounded"
                          : "text-grey"
                      }`}
                    >
                      {useTranslate("Help Center")}
                    </Link>
                  </NavItem>

                  <NavItem className="p-2">
                    <Dropdown
                      isOpen={langDropdownopen}
                      toggle={toggleLangDropdown}
                      className="user-dropdown"
                    >
                      <DropdownToggle
                        className="text-grey "
                        nav
                      >
                        <div className="flex items-center">
                          <TfiWorld className="me-1" /> {language === "ru" ? "Russian" : "English - USD"}
                        </div>
                      </DropdownToggle>
                      <DropdownMenu end>
                        <DropdownItem onClick={() => toggleLanguage("en")}>
                          English - USD
                        </DropdownItem>
                        <DropdownItem onClick={() => toggleLanguage("ru")}>
                          Russian
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </NavItem>
                  {/* <NavItem className="p-2">
                  <a
                    href="http://admin.b2bmarket.uz/vendor-login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`nav-link`}
                  >
                    Become a Vendor
                  </a>
                </NavItem> */}
                  {profile ? (
                    <>
                      {/* for desktop */}
                      <NavItem className="p-2 desktop-user-name">
                        <Dropdown
                          isOpen={dropdownOpen}
                          toggle={toggleDropdown}
                          className="user-dropdown"
                        >
                          <DropdownToggle
                            className={` ${
                              isActive("/profile")
                                ? "bg-custom-primary text-white rounded active"
                                : "text-grey"
                            }`}
                            nav
                          >
                            <div className="flex items-center">
                              <LuUser className="me-1" /> {profile?.user?.firstName}
                            </div>
                          </DropdownToggle>
                          <DropdownMenu end>
                            <DropdownItem onClick={handleProfile}>
                              <LuUser className="me-2" /> {profileText}
                            </DropdownItem>
                            <DropdownItem onClick={handleLogout}>
                              <LuLogOut className="me-2" /> {logoutText}
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </NavItem>
                      {/* for mobile */}
                      <NavItem className="p-2 mobile-user-name">
                        <Link
                          to="/profile"
                          className={`nav-link ${
                            isActive("/profile")
                              ? "bg-custom-primary text-white rounded active"
                              : "text-grey"
                          }`}
                        >
                          <div className="flex items-center">
                            <LuUser className="me-1" /> {profile?.user?.firstName}
                          </div>
                        </Link>
                      </NavItem>
                    </>
                  ) : (
                    <>
                      <NavItem className="p-2">
                        <Link
                          to="/sign-in"
                          className={`nav-link ${
                            isActive("/sign-in")
                              ? "bg-custom-primary text-white rounded"
                              : "text-grey"
                          }`}
                        >
                          <div className="flex items-center">
                            <LuUser className="me-1" /> {signInText}
                          </div>
                        </Link>
                      </NavItem>
                      <NavItem className="p-2">
                        <Link
                          to="/sign-up"
                          className={`nav-link ${
                            isActive("/sign-up")
                              ? "bg-custom-primary text-white rounded"
                              : "text-grey"
                          }`}
                        >
                          <div className="flex items-center">
                            <LuUserPlus className="me-1" /> {signUpText}
                          </div>
                        </Link>
                      </NavItem>
                    </>
                  )}
                </Nav>
              </Collapse>
            </div>
          </div>
      </Navbar>
      <SubHeader />
    </div>
  );
};

export default Header;
