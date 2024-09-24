import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  clearCompare,
  removeFromCompare,
} from "../../redux/slices/compareSlice";
import Header from "../../components/header/Header";
import SubHeader from "../../components/subHeader/SubHeader";
import "./productCompare.css";
import { IoIosAddCircle } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";
import Footer from "../../components/footer/Footer";
import { useTranslate } from "../../hooks/useTranslate";
import { translate } from "../../utils/index";
import { LanguageContext } from "../../utils/LanguageContext";

const ProductCompare = () => {
  const { language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.compare);

  const [expanded, setExpanded] = useState({});

  const handleAddProduct = () => {
    navigate("/product-listing");
  };

  const handleClearComparison = () => {
    dispatch(clearCompare());
  };

  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th></th>
          {products.map((product, index) => (
            <th key={index}>
              <RxCrossCircled
                size={32}
                className="action-icon"
                onClick={() => dispatch(removeFromCompare(product.id))}
              />
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const renderDescription = (product) => {
    const isExpanded = expanded[product.id];
    const description = product.description;

    return (
      <div>
        {isExpanded ? description : `${description.substring(0, 30)}`}
        {description.length > 100 && (
          <Button
            color="link"
            className="px-0"
            style={{ width: "auto" }}
            onClick={() =>
              setExpanded({ ...expanded, [product.id]: !isExpanded })
            }
          >
            {isExpanded ? "Read Less" : "Read More"}
          </Button>
        )}
      </div>
    );
  };

  const productImgText = useTranslate("Product Image");
  const productNameText = useTranslate("Product Name");
  const productPriceText = useTranslate("Product Price");
  const productDescText = useTranslate("Product Description");

  const [translatedProducts, setTranslatedProducts] = useState([]);
  useEffect(() => {
    const translateProductsName = async () => {
      if (products) {
        const translations = await Promise.all(
          products.map(async (product) => {
            const translatedName = await translate(product.name, language);
            const translatedDesc = await translate(
              product.description,
              language
            );

            return {
              ...product,
              name: translatedName,
              description: translatedDesc,
            };
          })
        );
        setTranslatedProducts(translations);
      }
    };

    translateProductsName();
  }, [products, language]);

  const renderTableBody = () => {
    const headers = [
      productImgText,
      productNameText,
      productPriceText,
      productDescText,
    ];
    return (
      <tbody>
        {headers.map((header, index) => (
          <tr key={index}>
            <th>{header}</th>
            {translatedProducts.map((product) => (
              <td key={product.id}>
                {header === productImgText && (
                  <img
                    src={product.image_path}
                    alt={product.name}
                    style={{ width: "100px" }}
                  />
                )}
                {header === productNameText && product.name}
                {header === productPriceText && product.price}
                {header === productDescText && renderDescription(product)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  return (
    <>
      <Header />
      {/* <SubHeader /> */}
      <div className="product-compare py-5">
        <div className="contact-form p-lg-5 p-4  container">
          <h2>{useTranslate("Product Comparison")}</h2>
          {products.length > 0 && (
            <IoIosAddCircle
              className="action-icon"
              size={32}
              onClick={handleAddProduct}
            />
          )}
          {products.length === 0 ? (
            <div>
              <p>No products to compare.</p>
              <IoIosAddCircle
                className="action-icon"
                size={32}
                onClick={handleAddProduct}
              />
            </div>
          ) : (
            <Table className="compare-table" responsive>
              {renderTableHeader()}
              {renderTableBody()}
            </Table>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductCompare;
