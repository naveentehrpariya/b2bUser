import React from "react";
import "./perSearch.css";
import { useTranslate } from "../../hooks/useTranslate";

const PerSearch = () => {
  const handleVendorClick = () => {
    window.open("http://admin.b2bmarket.uz/vendor-login", "_blank");
  };

  return (
    <div className="personalized my-5 text-white text-center">
      <span className="h2">
        {useTranslate("Let's Get Started with Personlized Search")}
      </span>
      <p className="h5">
        {useTranslate(
          "Get the best deal on verity of products from electronics to cosmetic there are many categories to choose from"
        )}
      </p>
      <button
        onClick={handleVendorClick}
        className="btn bg-light border-0 w100  custom-text-primary my-3  py-2 px-5"
      >
        {useTranslate("Become a Vendor")}
      </button>
    </div>
  );
};

export default PerSearch;
