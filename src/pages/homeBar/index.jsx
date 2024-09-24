import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import "./homeBar.css";
import ProductCards from "../../components/productCard/ProductCards";
import Slider from "react-slick";
import { FiLayout } from "react-icons/fi";
import DisCountSlider from "../../components/discountBanner/DisCountSlider";
import { Images } from "../../assets/Images";
import AiSteps from "../../components/AIsteps/AiSteps";
import Testimonials from "../../components/testimonials/Testimonials";
import PerSearch from "../../components/PersonalizedSearch/PerSearch";
import { productSliderSettings } from "../../config/slickslider";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import Layout from "../../components/Layout";
import { LuLayoutList } from "react-icons/lu";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { useTranslate } from "../../hooks/useTranslate";
import { useNavigate } from "react-router-dom";

const HomeBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate() 
  const { products } = useSelector((state) => state.productSlice);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/ask-ai/searches?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <Layout>
    
        <div className="container mx-auto" >
          <div className="home">
            <div className="home-content ">
              <span className="h2 fw-bolder">
                {useTranslate("Leading B2B E-commerce Platform")}
              </span>
              <p className="py-3 " style={{ fontSize: "20px" }}>
                {useTranslate(
                  "Explore more then thousands products and get best AI filtration experience answer few question and AI will let you know best products."
                )}
              </p>
              <div className="ask-ai-box">
                <input
                    type="text"
                    className="ai-search-input"
                    placeholder={useTranslate("Search Keywords")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-primary  btn-font" onClick={handleSearch}>
                  {useTranslate("Ask AI")}
                </button>
              </div>
              {/* <button className="btn bg-white btn-bg-white  btn-font arrow-button">
                {useTranslate("Ask AI")}
              </button> */}
              {/* <button onClick={handleNavigate} class="animated-button">
                <svg
                  viewBox="0 0 24 24"
                  class="arr-2"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
                <span class="text">{useTranslate("Ask AI")}</span>
                <span class="circle"></span>
                <svg
                  viewBox="0 0 24 24"
                  class="arr-1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </button> */}
            </div>
          </div>
        </div>

        {/* home banner ends */}

        {/* category slider starts */}
        {/* <Category /> */}
        {/* category slider ends */}

        {/* product cards slider */}
        {/* <div className="container mx-automy-5">
        <span className="h3 ps-3">Popular Products</span>
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
      </div> */}


        <div className="container mx-automy-5">
          <span className="h3 ps-3 fw-bold">
            {useTranslate("Popular Products")}
          </span>
          <Slider {...productSliderSettings} className="home-carousel">
            {products?.data &&
              products?.data?.map((product) => (
                <ProductCards
                  key={product.id}
                  className="mx-3"
                  data={product}
                />
              ))}
          </Slider>
        </div>
        {/* product cards slider ends */}

        {/* cutting-edge solutions banner content starts*/}
        <div className="container mx-auto">
          <div className="cutting-edge-ai my-5">
            <span className="custom-text-primary h3 fw-bold">
              {useTranslate("Your Gateway to Cutting-Edge AI Solutions")},
              <br />
              {useTranslate("All in One Place")}
            </span>
            <Row>
              <Col lg={`4`} className="my-4">
                <FiLayout size={32} color="#1A3A66" />
                <span
                  className="custom-text-primary py-3 fw-bold  d-flex flex-column"
                  style={{ fontSize: "23px" }}
                >
                  {useTranslate("Extensive Categories")}
                </span>
                <p style={{ fontSize: "20px" }}>
                  {useTranslate(
                    "With over 100 categories, our platform ensures you find the specific AI solution you need. From machine learning to computer vision, we cover a broad spectrum to meet all your AI requirements."
                  )}
                </p>
              </Col>
              <Col lg={`4`} className="my-4">
                <LuLayoutList size={32} color="#1A3A66" />
                <span
                  style={{ fontSize: "23px" }}
                  className="custom-text-primary py-3 fw-bold fs-4 d-flex flex-column"
                >
                  {useTranslate("Advanced Comparison Tools")}
                </span>
                <p style={{ fontSize: "20px" }}>
                  {useTranslate(
                    "Our advanced comparison tools let you evaluate different AI platforms side-by-side. Compare features, pricing, and user reviews to make informed decisions, ensuring transparency and the best fit for your needs."
                  )}
                </p>
              </Col>
              <Col lg={`4`} className="my-4">
                <VscWorkspaceTrusted size={32} color="#1A3A66" />
                <span
                  style={{ fontSize: "23px" }}
                  className="custom-text-primary py-3 fw-bold fs-4 d-flex flex-column"
                >
                  {useTranslate("Trusted and Verified Providers")}
                </span>
                <p style={{ fontSize: "20px" }}>
                  {useTranslate(
                    "We partner with leading AI companies recognized for innovation and reliability. Each provider undergoes rigorous verification to meet our high standards, ensuring peace of mind when selecting an AI solution."
                  )}
                </p>
              </Col>
            </Row>
          </div>
        </div>
        {/* cutting-edge solutions banner content ends */}

        {/* discount-banner starts */}
        <div className="container mx-auto" >
          <Row className="d-flex justify-content-center align-items-center">
            <Col lg={`7`} className="equal">
              <DisCountSlider />
            </Col>
            <Col lg={`5`} className="equal bg-violet">
              <div className="bg-violet-2 d-flex flex-column justify-content-center">
                <img src={Images.searchMusic} alt="search" />
                <span className="py-3 h2">
                  {useTranslate("Get The Best Result With The help of AI")}
                </span>
                <p className="" style={{ fontSize: "20px" }}>
                  {useTranslate(
                    "AI will ask questions to know more about your product,You can compare these products and buy best seller"
                  )}
                </p>
                <div>
                  <button onClick={() => navigate("/ask-ai/searches")} className="btn border-0 px-5 py-2 btn-primary">
                    {useTranslate("Ask AI")}
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* discount-banner ends */}

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
      </Layout>
    </>
  );
};

export default HomeBar;
