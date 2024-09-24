import React from "react";
import "./about.css";
import Header from "../../components/header/Header";
import { Col, Container, Row } from "reactstrap";
import { Images } from "../../assets/Images";
import { FiTarget } from "react-icons/fi";
import { FaEye } from "react-icons/fa";
import AiSteps from "../../components/AIsteps/AiSteps";
import Testimonials from "../../components/testimonials/Testimonials";
import PerSearch from "../../components/PersonalizedSearch/PerSearch";
import Footer from "../../components/footer/Footer";
import SubHeader from "../../components/subHeader/SubHeader";
import { useTranslate } from "../../hooks/useTranslate";
const About = () => {
  const paragraph = useTranslate(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus, minima ipsam dolores saepe vitae ut architecto consectetur illo, illum accusantium soluta assumenda quas incidunt aliquam animi fugit reprehenderit! Quaerat. reiciendis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, itaque eum! Nobis neque repudiandae at explicabo! Provident, et inventore? Architecto ut vel fugiat, fugit sequi minima saepe harum laborum tempore."
  );

  return (
    <>
      <Header />
      {/* <SubHeader/> */}
      <div className="abt-banner ">
        <div className="d-flex container-fluid flex-column">
          <span className="h2 fw-bold">
            {useTranslate("Leading B2B E-commerce Platform")}
          </span>
          <span className="h5">
            {useTranslate(
              "Explore more then thousands products and get best AI filtration experience answer few question and AI will let you know best products"
            )}
          </span>
        </div>
      </div>

      <div className="main-container">
        <div className="container mx-auto" >
          <Row>
            <Col
              lg={`6`}
              className="mt-lg-5 mt-4  d-flex flex-column justify-content-center align-items-center"
            >
              <img src={Images.abtgridimg} className="w-100" alt="abt" />
            </Col>
            <Col
              lg={`6`}
              className="mt-lg-5 mt-4 d-flex flex-column justify-content-center align-items-center"
            >
              <div className="">
                <span className="h3  fw-bold">
                  {useTranslate("About B2B Market")}
                </span>
                <p className="pt-3">{paragraph}</p>
                <p>{paragraph}</p>
              </div>
            </Col>
          </Row>
        </div>

        <div className="container mx-auto" >
          <Row>
            <Col lg={`6`}>
              <div className="goals d-flex flex-column mt-5">
                <FiTarget size={50} color="#1A3A66" />
                <span className="custom-text-primary py-2 h3 fw-bold">
                  {useTranslate("Our Mission")}
                </span>
                <p style={{ fontSize: "20px" }}>
                  {useTranslate(
                    "Our mission is straightforward: to make B2B shopping simple, efficient, and cost-effective. We aim to provide a seamless, personalized shopping experience that saves businesses time and ensures they always get the best value for their investment."
                  )}
                </p>
              </div>
            </Col>
            <Col lg={`6`}>
              <div className="goals d-flex flex-column mt-5">
                <FaEye color="#1A3A66" size={50} />
                <span className="custom-text-primary py-2 h3 fw-bold">
                  {useTranslate("Our Vision")}
                </span>
                <p style={{ fontSize: "20px" }}>
                  {useTranslate(
                    "Our mission is straightforward: to make B2B shopping simple, efficient, and cost-effective. We aim to provide a seamless, personalized shopping experience that saves businesses time and ensures they always get the best value for their investment."
                  )}
                </p>
              </div>
            </Col>
          </Row>
        </div>

        {/* find best deal with AI-starts */}
        <div className="container mx-auto" >
          <AiSteps />
        </div>
        {/* find best deal with AI-ends */}

        {/* testimonials - starts */}
        <div className="container mx-auto" >
          <Testimonials />
        </div>
        {/* testimonials - ends */}

        {/* Personalized Search - starts */}
        <div className="container mx-auto" >
          <PerSearch />
        </div>
        {/* Personalized Search - ends */}

        <Footer />
      </div>
    </>
  );
};

export default About;
