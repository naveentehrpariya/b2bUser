import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import "../auth.css";
import { IoMdClose } from "react-icons/io";
import { Images } from "../../../assets/Images";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { signUpUser } from "../../../redux/slices/userAuthSlice";
import logo from "../../../assets/svg/logo.svg";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.authSlice);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Passwords do not match!",
      });
      return;
    }
    dispatch(signUpUser(formData));
  };

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    } else if (success) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Registration successful!",
      });
      navigate("/sign-in");
    }
  }, [loading, error, success, navigate]);

  return (
    <div className="auth-container">
      <Row className="align-items-center">
        <Col md="6" className="d-none d-md-block">
          <div className="auth-image">
            <img src={logo} className="auth-logo" alt="logo" />
          </div>
        </Col>
        <Col
          md="6"
          xs="12"
          className="d-flex justify-content-center align-items-center"
        >
          <div className="auth-form">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="text-center">Sign Up</h2>
              <IoMdClose size={30} onClick={() => navigate("/")} />
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  required
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <Button
                type="submit"
                color="primary"
                className="p-3 border-0"
                block
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
              {/* <div className="text-center mt-3">
                <Link to="/forgot-password">Forgot Password?</Link>
              </div> */}
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignUp;
