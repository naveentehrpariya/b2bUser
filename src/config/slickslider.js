import { MdArrowBack, MdArrowForward } from "react-icons/md";

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <MdArrowBack color="black" size={32} />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <MdArrowForward color="black" size={32} />
    </div>
  );
};

export const productSliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
