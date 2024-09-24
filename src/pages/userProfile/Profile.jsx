import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { Button, Col, Form, FormGroup, Input, Row } from "reactstrap";
import { editUserProfile, userProfile } from "../../redux/slices/profileSlice";
import { changePassword, clearState } from "../../redux/slices/changePwdSlice";
import "./userProfile.css";
import { translate } from "../../utils";
import { useTranslate } from "../../hooks/useTranslate";
import { LanguageContext } from "../../utils/LanguageContext";

const UserDetails = () => {
  const { language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profileSlice);
  const {
    loading: editProfileLoading,
    error: editProfileError,
    successMessage: editProfileSuccessMessage,
  } = useSelector((state) => state.editProfileSlice);
  const {
    loading: passwordLoading,
    error,
    successMessage,
  } = useSelector((state) => state.changePasswordSlice);

  // State for form fields
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    dispatch(userProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFirstname(profile?.user?.firstName || "");
      setLastname(profile?.user?.lastName || "");
      setEmail(profile?.user?.email || "");
    }
  }, [profile]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    try {
      const profileData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
      };

      const response = await dispatch(editUserProfile(profileData)).unwrap();
      Swal.fire({
        title: await translate("Success!", language),
        text:
          (await translate(response.message, language)) ||
          (await translate("Edit Profile successful.", language)),
        icon: "success",
        allowOutsideClick: false,
      });
    } catch (error) {
      Swal.fire({
        title: await translate("Error!", language),
        text:
          (await translate(error?.message, language)) ||
          (await translate(
            "Unexpected error, failed to Edit User Profile",
            language
          )),
        icon: "error",
        allowOutsideClick: false,
      });
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(
        changePassword({ old_password: oldPassword, new_password: newPassword })
      ).unwrap();
      Swal.fire({
        title: await translate("Success!", language),
        text: await translate("Password changed successfully.", language),
        icon: "success",
        allowOutsideClick: false,
      });
      // Clear the form fields
      setOldPassword("");
      setNewPassword("");
      // Optionally clear the state
      dispatch(clearState());
    } catch (err) {
      Swal.fire({
        title: await translate("Error!", language),
        text:
          (await translate(err?.message, language)) ||
          (await translate("Failed to change password.", language)),
        icon: "error",
        allowOutsideClick: false,
      });
    }
  };

  const handleBecomeVendorClick = () => {
    Swal.fire({
      title: "Become a Vendor",
      text: "If you want to become a vendor, contact us at b2bmarket.uz@gmail.com.",
      icon: "info",
      confirmButtonText: "OK"
    });
  };

  
  return (
    <div className="contact-form p-lg-5 p-4">
      <div className="d-flex justify-content-between">
        <div>
        <span className="custom-text-primary fw-bold h2">
        {useTranslate("My Profile")}
      </span>
      <p>{useTranslate("Your Details")}</p>
        </div>
      
      <div>
      <span className="custom-text-primary fw-bold h4" onClick={handleBecomeVendorClick}>
        {useTranslate("Become a Vendor")}
      </span>
      </div>
    
      </div>
      <hr />
      <Form onSubmit={handleProfileSubmit}>
        <Row>
          <Col lg={`6`}>
            <FormGroup>
              <Input
                type="text"
                name="name"
                id="name"
                value={firstname}
                placeholder={useTranslate("Your first name")}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg={`6`}>
            <FormGroup>
              <Input
                type="text"
                id="lastname"
                className="form-control"
                placeholder={useTranslate("Your Last Name")}
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col lg={`12`}>
            <FormGroup>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder={useTranslate("Your Email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button color="primary px-5 border-0" disabled={editProfileLoading}>
          {useTranslate(editProfileLoading ? "Updating..." : "Submit")}
        </Button>
      </Form>

      <hr />

      <span className="custom-text-primary fs-3 fw-bold">
        {useTranslate("Update Password")}
      </span>
      <Form onSubmit={handlePasswordSubmit}>
        <Row>
          <Col lg={`6`}>
            <FormGroup>
              <Input
                type="password"
                id="old-password"
                className="form-control"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder={useTranslate("Enter Your Old Password")}
              />
            </FormGroup>
          </Col>
          <Col lg={`6`}>
            <FormGroup>
              <Input
                type="password"
                id="new-password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={useTranslate("Enter Your New Password")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary px-5 border-0" disabled={passwordLoading}>
          {useTranslate(passwordLoading ? "Changing..." : "Submit")}
        </Button>
      </Form>
    </div>
  );
};

export default UserDetails;
