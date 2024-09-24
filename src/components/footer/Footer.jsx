import React from "react";
import "./footer.css";
import { Col, Container, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { useTranslate } from "../../hooks/useTranslate";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="footer py-3">
      <div className="container mx-auto" >
        <Row>
          <Col lg="3" className="py-3">
            <span className="fw-bold h4">{useTranslate("Top Categories")}</span>
            <div className="footer-contents">
              <Link to="/product-listing">
                {useTranslate("Cosmetic Products")}
              </Link>
              <Link to="/product-listing">
                {useTranslate("Electronic Products")}
              </Link>
              <Link to="/product-listing">
                {useTranslate("Furniture Products")}
              </Link>
              <Link to="/product-listing">
                {useTranslate("Tools & Hardware")}
              </Link>
              <Link to="/product-listing">
                {useTranslate("Sports & Entertainment")}
              </Link>
              <Link to="/product-listing">{useTranslate("Jewellery")}</Link>
            </div>
          </Col>
          <Col lg="3" className="py-3">
            <span className="fw-bold h4">{useTranslate("About B2B")}</span>
            <div className="footer-contents">
              <Link to="/about">{useTranslate("About")}</Link>
              <Link to="/contact">{useTranslate("Contact Us")}</Link>
              <Link to="/">{useTranslate("Terms & Condition")}</Link>
              <Link to="/privacy-policy">
                {useTranslate("Privacy & Policy")}
              </Link>
              <Link to="/">{useTranslate("Help Centre")}</Link>
            </div>
          </Col>
          <Col lg="3" className="py-3">
            <span className="fw-bold h4">{useTranslate("Quick Links")}</span>
            <div className="footer-contents">
              {/* <a
                href="https://admin.b2bmarket.uz/vendor-register"
                target="_blank"
              >
                {useTranslate("Become a Vendor")}
              </a> */}
              {/* <Link to="#">Refund Policy</Link> */}
              <Link to="/">{useTranslate("AI Guide")}</Link>
            </div>
          </Col>
          <Col lg="3" className="py-3">
            <span className="fw-bold h4">{useTranslate("Contact Us")}</span>
            <div className="footer-contents">
              <Link to="tel:+1254987855">+1(254)-987-855</Link>
              <Link to="mailto:example@gmail.com">
                {/* {useTranslate("example@gmail.com")} */}
              </Link>
              <span>
                {useTranslate(
                  "Kyiv, 01024, str. Yevhena Chikalenko (Pushkinska), 41 Art. LevTolstoy Square' m."
                )}
              </span>
            </div>
          </Col>
          <div className="text-center pt-3 copy-right">
            {`${useTranslate("Copyright")} © ${currentYear} ${useTranslate(
              "b2bmarket. All Rights Reserved."
            )}`}
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
