import React, { useContext, useEffect, useRef, useState } from "react";
import "./subHeader.css";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/slices/categorySlice";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/svg/logo.svg";
import { LanguageContext } from "../../utils/LanguageContext";
import { translate } from "../../utils";

const ShimmerDropdown = () => (
  <div className="shimmer-dropdown">
    <div className="shimmer-image"></div>
    <div className="shimmer-text"></div>
  </div>
);

const SubHeader = ({ direction, ...args }) => {
  const { language } = useContext(LanguageContext);

  const [dropdownOpen, setDropdownOpen] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [translatedCategories, setTranslatedCategories] = useState([]);

  const { categories, loading, error } = useSelector(
    (state) => state.categorySlice
  );

  const toggle = (id) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    navigate("/product-listing", {
      state: { categoryId, subcategoryId },
    });
  };
  const sliderRef = useRef();
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const translateCategoryNames = async () => {
      if (categories?.data) {
        const translations = await Promise.all(
          categories.data.map(async (category) => {
            const translatedName = await translate(category.name, language);
            const subcategories = await Promise.all(
              category.subcategories.map(async (subcategory) => ({
                ...subcategory,
                name: await translate(subcategory.name, language),
              }))
            );
            return { ...category, name: translatedName, subcategories };
          })
        );
        setTranslatedCategories(translations);
      }
    };

    translateCategoryNames();
  }, [categories, language]);

  useEffect(() => {
    if (sliderRef.current && translatedCategories.length) {
      sliderRef.current.slickGoTo(0);  // Reinitializes and starts the slider from the first slide
    }
  }, [translatedCategories]);

  return (
    <div
      className={`sub-header overflow-x-hidden ${
        scroll ? "bg-white sub-header-shadow" : ""
      }  border-b border-t border-gray-200`}
    >
      <Slider {...settings} ref={sliderRef} className="py-3 bg-white">
        {loading
          ? Array(4)
              .fill()
              .map((_, index) => (
                <div key={index} className="slider-item">
                  <ShimmerDropdown />
                </div>
              ))
          : translatedCategories?.map((category) => (
              <div key={category.id} className="slider-item">
                <Dropdown
                  isOpen={dropdownOpen[category.id]}
                  toggle={() => toggle(category.id)}
                  direction={direction}
                >
                  <DropdownToggle
                    caret
                    className="dropdown-toggle-custom"
                  >
                     
                    <span className="category-name">{category.name}</span>
                  </DropdownToggle>
                  <DropdownMenu className="" {...args}>
                    {category.subcategories.map((subcategory) => (
                      <DropdownItem
                        key={subcategory.id}
                        className="d-flex gap-3 "
                        onClick={() =>
                          handleSubcategoryClick(category.id, subcategory.id)
                        }
                      >
                        <img
                          src={subcategory.image_path || logo}
                          alt={subcategory.name}
                          className="subcategory-thumbnail"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = logo;
                          }}
                        />
                        <span className="subcategory-name">
                          {subcategory.name}
                        </span>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default SubHeader;
