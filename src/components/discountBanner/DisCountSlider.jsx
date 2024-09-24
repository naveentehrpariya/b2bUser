import React, { useEffect } from "react";
import "./disbanslide.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBack, MdArrowForward } from "react-icons/md";
import { fetchSliderProducts } from "../../redux/slices/sliderSlice";
import { Spinner } from "reactstrap";


const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <MdArrowForward color="black" size={25} />
    </div>
  );
};

const DisCountSlider = () => {
  const dispatch = useDispatch();
  const { sliderItems, loading, error } = useSelector((state) => state.sliderItems);
  console.log(sliderItems)
  useEffect(() => {
    dispatch(fetchSliderProducts());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // dots : false
        }
      }
    ]
  };

  return (
    <div className="discount-slider">
      {loading ? (
        <Spinner/>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Slider {...settings}>
          {sliderItems && sliderItems?.data?.map((item) => (
            <div key={item.id}>
              <img
                src={item.image_path}
                className="w-100"
                alt={`discount-banner-${item.id}`}
              />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default DisCountSlider;
