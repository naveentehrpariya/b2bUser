import React, { useContext, useEffect, useRef, useState } from "react";
import { Container } from "reactstrap";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./category.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { translate } from "../../utils/index";
import { LanguageContext } from "../../utils/LanguageContext";

// Shimmer Component
const Shimmer = () => {
  return (
    <div className="shimmer-wrapper">
      <div className="shimmer"></div>
    </div>
  );
};

const Category = ({ className }) => {
  const { language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sliderRef = useRef();

  const [translatedCategories, setTranslatedCategories] = useState([]);

  const { categories, loading, error } = useSelector(
    (state) => state.categorySlice
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const handleNavigate = (id) => {
    navigate(`/product-listing`);
  };

  useEffect(() => {
    const translateCategoryNames = async () => {
      if (categories?.data) {
        const translations = await Promise.all(
          categories.data.map(async (category) => {
            const translatedName = await translate(category.name, language);
            return { ...category, name: translatedName };
          })
        );
        setTranslatedCategories(translations);
      }
    };

    translateCategoryNames();
  }, [categories, language]);

  useEffect(() => {
    if (sliderRef.current && translatedCategories.length) {
      sliderRef.current.slickGoTo(0);  
    }
  }, [translatedCategories]);

  if (loading) {
    return (
      <div className="container mx-auto"  className={`my-4 ${className}`}>
        <Slider {...settings}>
          {Array(7)
            .fill()
            .map((_, index) => (
              <div key={index} className="">
                <div className="category-card mx-2">
                  <Shimmer />
                </div>
              </div>
            ))}
        </Slider>
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto"  className={`my-4 category-slider ${className}`}>
      <Slider {...settings} ref={sliderRef}>
        {translatedCategories?.map((product, index) => {
          const truncatedName =
            product.name.split(" ").length > 3
              ? product.name.split(" ").slice(0, 3).join(" ") + "..."
              : product.name;

          return (
            <div key={index} className="">
              <div
                className="category-card mx-2"
                onClick={() => handleNavigate(product.id)}
              >
                <img
                  src={product.image_path}
                  alt={product.name}
                  className="product-image"
                />
                <span>{truncatedName}</span>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Category;
