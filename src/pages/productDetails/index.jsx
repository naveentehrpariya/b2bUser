import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchProducts,
} from "../../redux/slices/productsSlice";
import { addToCompare } from "../../redux/slices/compareSlice";
import Layout from "../../components/Layout";
import { useTranslate } from "../../hooks/useTranslate";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleEnquiry() {
    navigate(`/product-enquiry`, { state: { product } });
  }

  const { products } = useSelector((state) => state.productSlice);

  const { product, loading, error } = useSelector(
    (state) => state.productByIdSlice
  );

  const handleAddToCompare = () => {
    dispatch(addToCompare(product));
    navigate("/product-compare"); // Navigate to compare page
  };

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  return (
    <>
      <Layout>
        {/* product image & basic detail - side -starts */}
        <div className="container mx-autoproduct-details pt-4">
          <Row>
            <Col lg={7}>
              <div className="img-gallery">
                {/* <div className="image-thumbnails me-3">
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
              </div> */}
                <div className="main-image">
                  <div className="main-image">
                    <img
                      src={product?.image_path}
                      className="rounded"
                      alt={product?.name}
                    />
                  </div>
                </div>
              </div>
              {/* For Desktop View Tabs - till 991px(lg) */}
              <div className="hey-world d-none d-lg-block ">
                <Tabs
                  details={product?.detail}
                  description={product?.description}
                />
              </div>
              {/* For Desktop View Tabs - ends */}
            </Col>
            <Col lg={5}>
              <div className="product-basic-details">
                <span className="h4 fw-bold">
                  {useTranslate(product?.name)}
                </span>
                <p className="text-muted py-2">
                  {useTranslate(product?.detail)}
                </p>
                <div className="main-price">
                  <span className="fs-5">{useTranslate("example.com.ud")}</span>
                  <span className="fs-5 fw-bold">{product?.price}</span>
                </div>
                <div className="d-flex gap-2 flex-wrap justify-content-between my-3">
                  <button
                    onClick={handleAddToCompare}
                    className="btn border-primary custom-text-primary flex-grow-1 fw-bold mb-3"
                  >
                    {useTranslate("Add To Compare")}
                  </button>
                  <button
                    className="btn btn-primary flex-grow-1 mb-3"
                    onClick={handleEnquiry}
                  >
                    {useTranslate("Enquiry")}
                  </button>
                </div>
                <hr />
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

        <hr />

        {/* similar products -starts */}
        <div className="container mx-automy-5">
          <span className="h3 ps-3">{useTranslate("Similar Products")}</span>
          <Slider {...productSliderSettings} className="home-carousel">
            {products?.data?.map((product) => (
              <ProductCards key={product.id} className="mx-3" data={product} />
            ))}
          </Slider>
        </div>
        {/* similar products -ends */}

        {/* Personalized Search - starts */}
        <div className="container mx-auto" >
          <PerSearch />
        </div>
        {/* Personalized Search - ends */}

        {/* Explore Categories -starts */}
        <div className="container mx-auto" >
          <span className="h2 fw-bold">
            {useTranslate("Explore Other Categories ")}
          </span>
        </div>
        <Category className={`pb-4`} />
        {/* Explore Categories -ends */}
      </Layout>
    </>
  );
};

export default ProductDetails;
