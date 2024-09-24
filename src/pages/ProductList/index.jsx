import React, { useContext, useEffect, useState } from "react";
import "./productList.css";
import {
  Col,
  Container,
  FormGroup,
  Input,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import Category from "../../components/category/Category";
import ProductCards from "../../components/productCard/ProductCards";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/productsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../redux/slices/categorySlice";
import SkeletonCard from "../../components/skeletons/skeletonCard";
import Layout from "../../components/Layout";
import { useTranslate } from "../../hooks/useTranslate";
import { LanguageContext } from "../../utils/LanguageContext";
import { translate } from "../../utils";

const ProductList = () => {
  const { language } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // state selectors
  const { categories } = useSelector((state) => state.categorySlice);
  const { loading, error, products } = useSelector(
    (state) => state.productSlice
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [priceRange, setPriceRange] = useState(""); // Initialize as empty string
  const [translatedCategories, setTranslatedCategories] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);

  useEffect(() => {
    const { categoryId, subcategoryId } = location.state || {};
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    if (subcategoryId) {
      setSelectedSubcategory(subcategoryId);
    }
    dispatch(
      fetchProducts({ category_id: categoryId, subcategory_id: subcategoryId })
    );

    dispatch(fetchCategories());
  }, [location.state, dispatch]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  useEffect(() => {
    // Filter subcategories based on selected category
    const selectedCategoryObj = translatedCategories.find(
      (category) => category.id === parseInt(selectedCategory)
    );
    setFilteredSubcategories(selectedCategoryObj?.subcategories || []);
  }, [translatedCategories, selectedCategory]);

  // Calculate the index of the last and first product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Get the current products to display
  const currentProducts =
    products?.data?.slice(indexOfFirstProduct, indexOfLastProduct) || [];

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil((products?.data?.length || 0) / productsPerPage);

  const pageNumbers = [];

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 3) {
      pageNumbers.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pageNumbers.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages
      );
    }
  }

  const handleApplyFilter = () => {
    const query = {
      category_id: selectedCategory,
      subcategory_id: selectedSubcategory,
    };

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split("-").map(Number);
      query.min_price = minPrice;
      query.max_price = maxPrice;
    }

    dispatch(fetchProducts(query));
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

  return (
    <>
      <Layout>
        {/* <SubHeader /> */}

        {/* Category banner - starts */}
        <div className="container mx-auto" >
          <div className="product-list-banner">
            <span className="h2 fw-bolder">
              {useTranslate("Sports & Entertainment")}
            </span>
            <p className="fs-5 py-2">
              {useTranslate(
                "Explore more than thousands of products and get the best AI filtration experience. Answer a few questions and AI will let you know the best products."
              )}
            </p>
          </div>
        </div>
        {/* Category banner - ends */}

        {/* category slider starts */}
        <Category />
        {/* category slider ends */}

        {/* Finding-best-canon-camera -starts */}
        <div className="container mx-auto" >
          <div className="canon-camera my-4">
            <span className="fw-bold fs-4 custom-text-primary">
              {useTranslate("Let's Get Started with Personalized Search")}
            </span>
            <p className="fs-5">
              {useTranslate(
                "Get the best deal on a variety of products from electronics to cosmetics. There are many categories to choose from."
              )}
            </p>
            <div className="pt-3">
              <button onClick={() => navigate("/ask-ai/searches")} className="text-white btn btn-primary px-2 border-0">
                {useTranslate("Ask AI")}
              </button>
            </div>
          </div>
        </div>
        {/* Finding-best-canon-camera -ends */}

        {/* products -filteration -starts */}
        <div className="container mx-auto" >
          <span className="h2 fw-bold">{useTranslate("List Products")}</span>
          <div className="products-filters pt-3">
            <FormGroup className="filter-select">
              <Input
                type="select"
                name="categories"
                id="categoriesSelect"
                onChange={handleCategoryChange}
                value={selectedCategory}
              >
                <option value="">{useTranslate("Select a category")}</option>
                {translatedCategories &&
                  translatedCategories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </Input>
            </FormGroup>
            <FormGroup className="filter-select">
              <Input
                type="select"
                name="subcategories"
                id="subcategoriesSelect"
                onChange={handleSubcategoryChange}
                value={selectedSubcategory}
              >
                <option value="">
                  {useTranslate("Select a Sub-Category")}
                </option>
                {filteredSubcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup className="filter-range">
              <Input
                type="select"
                name="priceRange"
                id="priceRangeSelect"
                onChange={handlePriceRangeChange}
                value={priceRange}
              >
                <option value="">{useTranslate("Select Price Range")}</option>
                <option value="0-500">{0 - 500}</option>
                <option value="500-1000">500 - 1000</option>
                <option value="1000-1500">1000 - 1500</option>
                <option value="1500-2000">1500 - 2000</option>
                <option value="2000-2500">2000 - 2500</option>
                <option value="2500-3000">2500 - 3000</option>
                <option value="3000-3500">3000 - 3500</option>
                <option value="3500-4000">3500 - 4000</option>
                <option value="4000-4500">4000 - 4500</option>
                <option value="4500-5000">4500 - 5000</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <button
                className="text-white btn btn-primary px-5 w-100 border-0"
                onClick={handleApplyFilter}
              >
                {useTranslate("Apply Filter")}
              </button>
            </FormGroup>
          </div>
          <div className="product-results d-flex flex-wrap justify-content-between align-items-center">
            <span className="text-muted pt-3">
              {useTranslate("Showing")} {currentProducts.length}{" "}
              {useTranslate("of")} {products?.data?.length || 0}{" "}
              {useTranslate("Results")}
            </span>
          </div>
          <div className="products-list">
            {loading && (
              <Row>
                {[...Array(12)].map((_, index) => (
                  <SkeletonCard key={index} />
                ))}
              </Row>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-5">
                <p className="text-danger">An error occurred: {error}</p>
              </div>
            )}
            <Row>
              {currentProducts.length > 0 ? (
                currentProducts.map((data, index) => (
                  <Col key={index} xs={12} sm={6} md={4} lg={3}>
                    <ProductCards data={data} />
                  </Col>
                ))
              ) : (
                <>
                  <span>No Data Available</span>
                </>
              )}
            </Row>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Pagination aria-label="Page navigation">
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  onClick={() => paginate(currentPage - 1)}
                  previous
                />
              </PaginationItem>
              {pageNumbers.map((pageNum, index) => (
                <PaginationItem key={index} active={pageNum === currentPage}>
                  <PaginationLink
                    onClick={() => paginate(pageNum)}
                    disabled={pageNum === "..."}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                  onClick={() => paginate(currentPage + 1)}
                  next
                />
              </PaginationItem>
            </Pagination>
          </div>
        </div>
        {/* products filteration- ends */}

        {/* Explore Categories -starts */}
        <div className="explore-other-categories">
          <div className="container mx-auto" >
            <span className="h2 fw-bold">
              {useTranslate("Explore Other Categories")}
            </span>
          </div>
          <Category />
        </div>
        {/* Explore Categories -ends */}
      </Layout>
    </>
  );
};

export default ProductList;
