import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import "../auth.css";
import { IoMdClose } from "react-icons/io";
import { Images } from "../../../assets/Images";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../../../assets/svg/logo.svg";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Assuming you have a route parameter for the reset token
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to reset password
    // Example: API call or state update
    console.log("Reset Password with Token:", token);
    console.log("New Password:", password);

    // Navigate to confirmation page or show message
    navigate("/");
  };

  return (
    <div className="auth-container">
      <Row className="align-items-center">
        <Col md="6" className="d-none  d-md-block">
          <div className="auth-image">
            <img src={logo} className="auth-logo" alt="logo" />
          </div>
        </Col>
        <Col
          md="6"
          xs="12"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="auth-form ">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text-center">Reset Password</h2>
              <IoMdClose size={30} onClick={() => navigate("/")} />
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                className="p-3 border-0"
                block
              >
                Reset Password
              </Button>
              <div className="text-center mt-3">
                <Link to="/">Go back to Sign In</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
