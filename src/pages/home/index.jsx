import React from "react";
import { Col, Container, Row } from "reactstrap";
import "./home.css";
import Header from "../../components/header/Header";
import Category from "../../components/category/Category";
import ProductCards from "../../components/productCard/ProductCards";
import Slider from "react-slick";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { FiLayout } from "react-icons/fi";
import DisCountSlider from "../../components/discountBanner/DisCountSlider";
import { Images } from "../../assets/Images";
import AiSteps from "../../components/AIsteps/AiSteps";
import Testimonials from "../../components/testimonials/Testimonials";
import PerSearch from "../../components/PersonalizedSearch/PerSearch";
import Footer from "../../components/footer/Footer";
import { productSliderSettings } from "../../config/slickslider";
import SubHeader from "../../components/subHeader/SubHeader";
import { useTranslate } from "./useTranslate";

const Home = () => {
  return (
    <>

      <Header />
      {/* <SubHeader/> */}
      {/* home banner starts*/}
      <div fluid>
        <div className="home">
          <div className="home-content ">
            <span className="h1 fw-bolder">
              {useTranslate("Leading B2B E-commerce Platform")}
            </span>
            <p className="py-3">
              {useTranslate(
                "Explore more then thousands products and get best AI filtration experience answer few question and AI will let you know best products."
              )}
            </p>
            <div className="ask-ai-box">
              <input type="text" placeholder="Search Keywords" />
              <button className="btn btn-primary ">
                {useTranslate("Ask AI")}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* home banner ends */}

      {/* category slider starts */}
      {/* <Category /> */}
      {/* category slider ends */}

      {/* product cards slider */}


      <div className="container mx-automy-5">
        <span className="h3 ps-3">{useTranslate("Popular Products")}</span>
        <Slider {...productSliderSettings} className="home-carousel">
          <ProductCards className="mx-3" />
          <ProductCards className="mx-3" />
          <ProductCards className="mx-3" />
          <ProductCards className="mx-3" />
          <ProductCards className="mx-3" />
          <ProductCards className="mx-3" />
          <ProductCards className="mx-3" />
          <ProductCards className="mx-3" />
        </Slider>
      </div>
      {/* product cards slider ends */}

      {/* cutting-edge solutions banner content starts*/}
      <div fluid>
        <div className="cutting-edge-ai my-5">
          <span className="custom-text-primary h3">
            {useTranslate("Your Gateway to Cutting-Edge AI Solutions")}, <br />
            {useTranslate("All in One Place")}
          </span>
          <Row>
            <Col lg={`4`} className="my-4">
              <FiLayout size={32} color="#1A3A66" />
              <span className="custom-text-primary py-3  d-flex flex-column">
                {useTranslate("Extensive Categories")}
              </span>
              <p className="fs-5">
                {useTranslate(
                  "With over 100 categories, our platform ensures you find the specific AI solution you need. From machine learning to computer vision, we cover a broad spectrum to meet all your AI requirements."
                )}
              </p>
            </Col>
            <Col lg={`4`} className="my-4">
              <FiLayout size={32} color="#1A3A66" />
              <span className="custom-text-primary py-3 fs-4 d-flex flex-column">
                {useTranslate("Advanced Comparison Tools")}
              </span>
              <p className="fs-5">
                {useTranslate(
                  "Our advanced comparison tools let you evaluate different AI platforms side-by-side. Compare features, pricing, and user reviews to make informed decisions, ensuring transparency and the best fit for your needs."
                )}
              </p>
            </Col>
            <Col lg={`4`} className="my-4">
              <FiLayout size={32} color="#1A3A66" />
              <span className="custom-text-primary py-3 fs-4 d-flex flex-column">
                {useTranslate("Extensive Categories")}
              </span>
              <p className="fs-5">
                {useTranslate(
                  "With over 100 categories, our platform ensures you find the specific AI solution you need. From machine learning to computer vision, we cover a broad spectrum to meet all your AI requirements."
                )}
              </p>
            </Col>
          </Row>
        </div>
      </div>
      {/* cutting-edge solutions banner content ends */}

      {/* discount-banner starts */}
      <div fluid>
        <Row className="d-flex justify-content-center align-items-center">
          <Col lg={`7`}>
            <DisCountSlider />
          </Col>
          <Col lg={`5`}>
            <div className="bg-violet">
              <img src={Images.searchMusic} alt="search" />
              <span className="py-3 h2">
                {useTranslate("Get The Best Result With The help of AI")}
              </span>
              <p className="h5">
                {useTranslate(
                  "AI will ask questions to know more about your product,You can compare these products and buy best seller"
                )}
              </p>
              <div>
                <button className="btn border-0 px-5 py-2 btn-primary">
                  {useTranslate("Ask AI")}
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {/* discount-banner ends */}

      {/* find best deal with AI-starts */}
      <div fluid>
        <AiSteps />
      </div>
      {/* find best deal with AI-ends */}

      {/* testimonials - starts */}
      <div fluid>
        <Testimonials />
      </div>
      {/* testimonials - ends */}

      {/* Personalized Search - starts */}
      <div fluid>
        <PerSearch />
      </div>
      {/* Personalized Search - ends */}

      <Footer />



      asklbbjhbj
    </>
  );
};

export default Home;
