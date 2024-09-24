import React, { useState } from "react";
import "./contact.css";
import Header from "../../components/header/Header";
import {
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { FaPhone, FaLocationDot, FaArrowRightLong } from "react-icons/fa6";
import { IoMdMailUnread } from "react-icons/io";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm } from "../../redux/slices/contactSlice";
import Swal from "sweetalert2";
import Layout from "../../components/Layout";
import { useTranslate } from "../../hooks/useTranslate";

const Contact = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
  });

  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(submitContactForm(formData));
    console.log(response);
    if (response?.error) {
      Swal.fire({
        title: "Error!",
        allowOutsideClick: false,
        text:
          response?.payload.message ||
          "There was an issue with your submission.",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#007bff",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    } else {
      setFormData({
        full_name: "",
        phone: "",
        email: "",
        message: "",
      });
      Swal.fire({
        title: "Success!",
        text: response?.payload.message || "Your Messgae has been submitted.",
        icon: "success",
        confirmButtonText: "Ok",
        confirmButtonColor: "#007bff",
        customClass: {
          confirmButton: "btn btn-primary",
        },
      });
    }
  };

  return (
    <Layout>
      <div className="contact main-container">
        <div className="container mx-auto" >
          <Row>
            <Col lg={`5`} className="d-flex flex-column justify-content-center">
              <span className="h2 fw-bold">{useTranslate("Contact Info")}</span>
              <div className="py-5">
                <div className="d-flex gap-3 align-items-center">
                  <FaPhone color="#1A3A66" size={25} />
                  <span className="fs-5">01282-219839</span>
                </div>
                <div className="d-flex gap-3 align-items-center py-4">
                  <IoMdMailUnread color="#1A3A66" size={25} />
                  <span className="fs-5">
                    {useTranslate("example@gmail.com")}
                  </span>
                </div>
                <div className="d-flex gap-3 align-items-center">
                  <FaLocationDot color="#1A3A66" size={25} />
                  <span className="fs-5">
                    {useTranslate(
                      "Pasture lane, Factory lane, Barrowford, Nelson, BB9 6ES"
                    )}
                  </span>
                </div>
              </div>
              {/* <div>
                <span className="fw-bold fs-4">Check our AI Guide</span>
                <p className="fs-5">
                  Check out our AI guide to know about how our AI model helps
                  you
                </p>
                <span className="hover-underline-animation h4 custom-text-primary">
                  AI Model <FaArrowRightLong />
                </span>
              </div> */}
            </Col>
            <Col lg={`7`} className="pt-5 pt-lg-0">
              <div className="contact-form p-lg-5 p-4">
                <span className="custom-text-primary fw-bold h2">
                  {useTranslate("Write to us")}
                </span>
                <p>
                  {useTranslate(
                    "Email us your requirement or issue you are facing"
                  )}
                </p>
                <hr />
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col lg={`12`}>
                      <FormGroup>
                        <Input
                          type="text"
                          name="full_name"
                          id="name"
                          placeholder={useTranslate("Your Full Name")}
                          value={formData.full_name}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={`6`}>
                      <FormGroup>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder={useTranslate("Your Email")}
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    <Col lg={`6`}>
                      <FormGroup>
                        <Input
                          type="tel"
                          name="phone"
                          id="mobile"
                          placeholder={useTranslate("Your Mobile Number")}
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </FormGroup>
                    </Col>
                    {/* <Col lg={`6`}>
                      <FormGroup>
                        <Input
                          type="select"
                          name="subject"
                          id="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                        >
                          <option>General Inquiry</option>
                          <option>Support</option>
                          <option>Feedback</option>
                          <option>Others</option>
                        </Input>
                      </FormGroup>
                    </Col> */}
                    <Col lg={`12`}>
                      <FormGroup>
                        <Input
                          type="textarea"
                          name="message"
                          id="message"
                          placeholder={useTranslate("Your Message")}
                          value={formData.message}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button color="primary px-1" type="submit" disabled={loading}>
                    {useTranslate(loading ? "Submitting..." : "Submit")}
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
