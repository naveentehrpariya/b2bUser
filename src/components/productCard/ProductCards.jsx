import React from "react";
import { useNavigate } from "react-router-dom";
import "./productCard.css";
import { useTranslate } from "../../hooks/useTranslate";
import blankImg from "../../assets/Images/blank_img.jpg"

const ProductCards = ({ className, data }) => {
  const navigate = useNavigate();
  // const { name , price , image_path , id } = data

  function handleNavigate() {
    navigate(`/product-details/${data?.id}`);
  }
  console.log(data)
  return (
    <div className={`product-card ${className} my-3`} onClick={handleNavigate}>
      <img src={data?.image_path || blankImg} className="w-100 mb-3" alt="product" />
      <span
        style={{ fontFamily: "cera", fontSize: "20px" }}
        className="text-muted fw-bold"
      >
        {useTranslate(data?.name)}
      </span>
      <div>
        <span
          style={{ fontFamily: "cera", fontSize: "18px" }}
          className="price "
        >
          ${data?.price}
        </span>
      </div>
    </div>
  );
};

export default ProductCards;
