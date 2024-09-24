import React, { useState } from "react";
import { Row, Col, Container } from "reactstrap";
import Header from "../../components/header/Header";
import "./productDetails.css";
import { Images } from "../../assets/Images";
import { FaStar } from "react-icons/fa";
import Tabs from "../../components/Tabs/Tabs";
import Slider from "react-slick";
import ProductCards from "../../components/productCard/ProductCards";
import { productSliderSettings } from "../../config/slickslider";
import PerSearch from "../../components/PersonalizedSearch/PerSearch";
import Category from "../../components/category/Category";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate()
  const images = [
    `${Images.camera}`,
    `${Images.facewash}`,
    `${Images.camera}`,
    `${Images.productimg}`,
  ];

  const [mainImage, setMainImage] = useState(images[0]);

  const reviews = [
    {
      name: "John Doe",
      rating: 5,
      text: "Excellent product! Highly recommend it.",
    },
    {
      name: "Jane Smith",
      rating: 4,
      text: "Good quality, but the delivery was a bit slow.",
    },
    {
      name: "Emily Johnson",
      rating: 3,
      text: "It's okay, not what I expected.",
    },
    {
      name: "Michael Brown",
      rating: 5,
      text: "Fantastic! Will buy again.",
    },
    {
      name: "Sarah Davis",
      rating: 4,
      text: "Very good, but there's room for improvement.",
    },
    {
      name: "David Wilson",
      rating: 3,
      text: "Average quality, expected more.",
    },
  ];

  const [visibleReviews, setVisibleReviews] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReviews = () => {
    if (isExpanded) {
      setVisibleReviews(3);
    } else {
      setVisibleReviews(reviews.length);
    }
    setIsExpanded(!isExpanded);
  };

  function handleEnquiry(){
    navigate(`/product-enquiry/1`)
  }
  return (
    <>
      <Header />

      {/* product image & basic detail - side -starts */}
      <div className="container mx-autoproduct-details pt-4">
        <Row>
          <Col lg={7}>
            <div className="img-gallery">
              <div className="image-thumbnails me-3">
                {images.map((image, index) => (
                  <div key={index} className="thumbnail-img mb-3">
                    <img
                      src={image}
                      alt={`Product thumbnail ${index + 1}`}
                      onClick={() => setMainImage(image)}
                      className="img-thumbnail"
                    />
                  </div>
                ))}
              </div>
              <div className="main-image">
                <div
                  className="main-image"
                  style={{ backgroundImage: `url(${mainImage})` }}
                ></div>
              </div>
            </div>
            {/* For Desktop View Tabs - till 991px(lg) */}
            <div className="hey-world d-none d-lg-block ">
              <Tabs />
            </div>
            {/* For Desktop View Tabs - ends */}
          </Col>
          <Col lg={5}>
            <div className="product-basic-details">
              <div className="stars py-1 d-flex align-items-center">
                <FaStar className="star" color="FFBD2D" />
                <FaStar className="star" color="FFBD2D" />
                <FaStar className="star" color="FFBD2D" />
                <FaStar className="star" color="FFBD2D" />
                <FaStar className="star" color="FFBD2D" />
                <span className="text-muted ms-2">
                  <strong> 4.5 </strong> (112 reviews)
                </span>
              </div>
              <span className="h4 fw-bold">Product Name</span>
              <p className="text-muted py-2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Mollitia, repellendus saepe? Velit impedit ullam recusandae sit
                aut obcaecati possimus ipsa libero esse aliquid consequuntur
                maiores eos, temporibus numquam, reiciendis eum?
              </p>
              <div className="main-price">
                <span className="fs-5">example.com.ud</span>
                <span className="fs-5 fw-bold">$38.00</span>
              </div>
              <div className="d-flex gap-2 flex-wrap justify-content-between my-3">
                <button className="btn border-primary custom-text-primary flex-grow-1 fw-bold mb-3">
                  Add To Compare
                </button>
                <button className="btn btn-primary flex-grow-1 mb-3" onClick={handleEnquiry}>
                  Enquiry
                </button>
              </div>
              <hr />
              <div className="subprice">
                <div>
                  <span className="fs-5 text-muted">example.com.ud</span>
                  <span className="fs-5 fw-bold">$38.00</span>
                </div>
                <div>
                  <span className="fs-5 text-muted">example.com.ud</span>
                  <span className="fs-5 fw-bold">$45.00</span>
                </div>
                <div>
                  <span className="fs-5 text-muted">example.com.ud</span>
                  <span className="fs-5 fw-bold">$50.00</span>
                </div>
                <div>
                  <span className="fs-5 text-muted">example.com.ud</span>
                  <span className="fs-5 fw-bold">$80.00</span>
                </div>
                <div>
                  <span className="fs-5 text-muted">example.com.ud</span>
                  <span className="fs-5 fw-bold">$38.00</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <div className="container mx-auto" >
        {/* For Mobile View - tab -start */}
        <div className="hey-world d-lg-none pt-3 px-2">
          <Tabs />
        </div>
        {/* For Mobile View - tab -start */}
      </div>
      {/* product image & basic detail - side -ends */}

      <div className="container mx-autocustomer-reviews">
        <Row>
          <Col>
            <h4 className="mb-4">Customer Reviews</h4>
            {reviews.slice(0, visibleReviews).map((review, index) => (
              <div key={index} className="review mb-4 p-3 border rounded">
                <div className="d-flex align-items-center mb-2">
                  {[...Array(review.rating)].map((star, i) => (
                    <FaStar key={i} className="star me-1" color="FFBD2D" />
                  ))}
                </div>
                <h6 className="fw-bold">{review.name}</h6>
                <p className="text-muted">{review.text}</p>
              </div>
            ))}
            <button onClick={toggleReviews} className="btn btn-primary mt-1">
              {isExpanded ? "See Less" : "See More"}
            </button>
          </Col>
        </Row>
      </div>

      <hr />

      {/* similar products -starts */}
      <div className="container mx-automy-5">
        <span className="h3 ps-3">Similar Products</span>
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
      {/* similar products -ends */}

      {/* Personalized Search - starts */}
      <div className="container mx-auto" >
        <PerSearch />
      </div>
      {/* Personalized Search - ends */}

      {/* Explore Categories -starts */}
      <div className="container mx-auto"  >
            <span className="h2 fw-bold">Explore Other Categories  </span>
      </div>
      <Category className={`pb-4`} />
      {/* Explore Categories -ends */}

      <Footer/>
    </>
  );
};

export default ProductDetails;
