import React, { useState, useEffect } from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";
import "../auth.css";
import { IoMdClose } from "react-icons/io";
import { Images } from "../../../assets/Images";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../../redux/slices/userAuthSlice";
import Swal from "sweetalert2";
import logo from "../../../assets/svg/logo.svg";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, token, error } = useSelector((state) => state.authSlice);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Login successful!",
      }).then(() => {
        navigate("/");
      });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error,
      });
    }
  }, [error]);

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
              <h2 className="text-center">Sign In</h2>
              <IoMdClose size={30} onClick={() => navigate("/")} />
            </div>
            <hr />
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  required
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  required
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button
                color="primary"
                className="p-3 border-0  "
                block
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
              <div className="text-center mt-3 d-flex justify-content-between">
                <Link to="/sign-up" className="text-decoration-none">
                  Sign Up
                </Link>
                {/* <Link to="/forgot-password">Forgot Password?</Link> */}
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
