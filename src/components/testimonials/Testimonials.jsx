import Slider from "react-slick";
import "./testimonials.css";
import { Images } from "../../assets/Images";
import { useTranslate } from "../../hooks/useTranslate";

const Testimonials = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="testimonials py-5">
      <div className="text-center">
        <span
          style={{ fontWeight: "bolder", fontSize: "28px" }}
          className="custom-text-primary fw-bold"
        >
          {useTranslate("Our Customers Love Us")}
        </span>
        <p style={{ fontSize: "22px" }} className="py-3">
          {useTranslate(
            "Get the best deal on verity of products from electronics to cosmetic there are many categories to choose from"
          )}
        </p>
        <Slider {...settings}>
          <div className="customer">
            <div className="reviews">
              <img src={Images.quote} alt="quote" />
              <p style={{ fontSize: "19px" }}>
                "
                {useTranslate(
                  "I've been using it for quite a few years now. I have tried a few others and they didn't have the functionality for B2b Market. The end results elevate a simple brochure into the look of a published magazine! It's so more engaging than scrolling through a PDF. I also appreciate that we can link to our website right from the document."
                )}
                "
              </p>
              <span className="custom-text-primary fw-bold">
                {useTranslate("Siddharth Soni")}
              </span>
            </div>
          </div>
          <div className="customer">
            <div className="reviews">
              <img src={Images.quote} alt="quote" />
              <p className="fs-5">
                "
                {useTranslate(
                  "I've been using it for quite a few years now. I have tried a few others and they didn't have the functionality for B2b Market. The end results elevate a simple brochure into the look of a published magazine! It's so more engaging than scrolling through a PDF. I also appreciate that we can link to our website right from the document."
                )}
                "
              </p>
              <span className="custom-text-primary fw-bold">
                {useTranslate("Siddharth Soni")}
              </span>
            </div>
          </div>
          <div className="customer">
            <div className="reviews">
              <img src={Images.quote} alt="quote" />
              <p className="fs-5">
                "
                {useTranslate(
                  "I've been using it for quite a few years now. I have tried a few others and they didn't have the functionality for B2b Market. The end results elevate a simple brochure into the look of a published magazine! It's so more engaging than scrolling through a PDF. I also appreciate that we can link to our website right from the document."
                )}
                "
              </p>
              <span className="custom-text-primary fw-bold">
                {useTranslate("Siddharth Soni")}
              </span>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Testimonials;
