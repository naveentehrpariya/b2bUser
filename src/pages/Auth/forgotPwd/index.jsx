import React, { useState } from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import "../auth.css";
import { IoMdClose } from "react-icons/io";
import { Images } from "../../../assets/Images";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/svg/logo.svg";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement logic to send reset password link to email
    // Example: API call or state update
    console.log("Request Password Reset for:", email);

    // Navigate to confirmation page or show message
    navigate("/reset-password");
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
              <h2 className="text-center">Forgot Password</h2>
              <IoMdClose size={30} onClick={() => navigate("/")} />
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                className="p-3 border-0"
                block
              >
                Submit
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

export default ForgotPassword;
