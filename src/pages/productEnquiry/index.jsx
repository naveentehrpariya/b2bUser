import React, { useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./productEnquiry.css";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { Images } from "../../assets/Images";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitEnquiry } from "../../redux/slices/submitEnquirySlice";
import Layout from "../../components/Layout";
import { useTranslate } from "../../hooks/useTranslate";

const ProductEnquiry = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.submitEnquiry);
  const { product } = location.state || {};

  const [formData, setFormData] = useState({
    product_id: product?.id,
    vendor_id: product?.uploader_id,
    full_name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch the action and wait for it to complete
    const response = await dispatch(submitEnquiry(formData));
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
      Swal.fire({
        title: "Success!",
        text: "Your enquiry has been submitted.",
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
    <>
      <Layout>
        <div className="product-enquiry ">
          <div className="container mx-auto" >
            <Row>
              <Col lg={`4`}>
                <div className="d-flex flex-column">
                  <img src={product?.image_path} alt="product-img" />
                  <span className="fs-4 fw-bold py-3">
                    {useTranslate(product?.name)}
                  </span>
                  <p>{product?.description}</p>
                </div>
              </Col>
              <Col lg={`8`} className="pt-5 pt-lg-0">
                <div className="contact-form p-lg-5 p-4">
                  <span className="custom-text-primary fw-bold h2">
                    {useTranslate("Enquiry Now")}
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
                            placeholder={useTranslate("Your full Name")}
                            value={formData.full_name}
                            onChange={handleChange}
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
                            onChange={handleChange}
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
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={`12`}>
                        <FormGroup>
                          <Input
                            type="textarea"
                            name="message"
                            id="message"
                            placeholder={useTranslate("Your Message")}
                            value={formData.message}
                            onChange={handleChange}
                            required
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Button disabled={loading} color="primary px-1 border-0">
                      {useTranslate(loading ? "Sending Enquiry..." : "Submit")}{" "}
                    </Button>
                  </Form>
                  <hr />
                  <div className="subprice">
                    <span className="custom-text-primary fs-3 fw-bold">
                      {useTranslate("Enquiry others")}
                    </span>
                    <p>
                      {useTranslate("Select who else is getting those enquiry")}
                    </p>
                    <div>
                      <label htmlFor="checkbox1" className="ms-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <span className="fs-5 ms-3 text-muted">
                          {useTranslate("example.com.ud")}
                        </span>
                      </label>
                      <span className="fs-5 fw-bold ms-2">$38.00</span>
                    </div>
                    <div>
                      <label htmlFor="checkbox1" className="ms-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <span className="fs-5 ms-3 text-muted">
                          {useTranslate("example.com.ud")}
                        </span>
                      </label>
                      <span className="fs-5 fw-bold ms-2">$38.00</span>
                    </div>
                    <div>
                      <label htmlFor="checkbox1" className="ms-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <span className="fs-5 ms-3 text-muted">
                          {useTranslate("example.com.ud")}
                        </span>
                      </label>
                      <span className="fs-5 fw-bold ms-2">$38.00</span>
                    </div>
                    <div>
                      <label htmlFor="checkbox1" className="ms-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          id="flexCheckDefault"
                        />
                        <span className="fs-5 ms-3 text-muted">
                          {useTranslate("example.com.ud")}
                        </span>
                      </label>
                      <span className="fs-5 fw-bold ms-2">$38.00</span>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductEnquiry;
