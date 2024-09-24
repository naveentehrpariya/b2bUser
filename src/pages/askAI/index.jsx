import React, {  useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import Layout from "../../components/Layout";
import { useTranslate } from "../../hooks/useTranslate";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../../redux/slices/askAiSlice";
import ProductCards from "../../components/productCard/ProductCards";
import SkeletonCard from "../../components/skeletons/skeletonCard";
import { useLocation } from "react-router-dom";

const AskAi = () => {
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.askAi);
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('query');
    if (query) {
      setTextInput(query);
      dispatch(searchProducts({ query }));
    }
  }, [location.search, dispatch]);

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
    if (e.target.value) {
      setFileInput(null);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileInput(e.target.files[0]);
      setTextInput("");
    } else {
      setFileInput(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (textInput) {
      formData.append("query", textInput);
    } else if (fileInput) {
      formData.append("file", fileInput);
    }
    dispatch(searchProducts(formData));
  };

  return (
    <>
      <Layout>
        {/* <SubHeader /> */}

        {/* Category banner - starts */}
        <div className="container mx-auto my-5" >
          <div className="product-list-banner">
            <span className="h2 fw-bolder">{useTranslate("Ask AI")}</span>
            <p className="fs-5 py-2">
              {useTranslate(
                "Explore more than thousands of products and get the best AI filtration experience. Answer a few questions and AI will let you know the best products."
              )}
            </p>
          </div>
        </div>
        {/* Category banner - ends */}

        {/* products -filteration -starts */}
        <div className="container mx-auto" >
          <Form onSubmit={handleSubmit}>
            <Row className="d-flex w-100  align-items-center">
              <Col md={4}>
                <FormGroup>
                  <Label className="h5" for="fileInput">
                    Upload a file
                  </Label>
                  <Input
                    type="file"
                    name="fileInput"
                    id="fileInput"
                    accept=".jpg,.png,.jpeg,.docx,.pdf"
                    onChange={handleFileChange}
                    disabled={!!textInput}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="h5" for="textInput">
                    Enter your query
                  </Label>
                  <Input
                    type="text"
                    name="textInput"
                    id="textInput"
                    value={textInput}
                    onChange={handleTextChange}
                    disabled={!!fileInput}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <Button
                  color="primary"
                  type="submit"
                  className="w-100 mt-3 "
                  disabled={loading || (!textInput && !fileInput)}
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </Col>
            </Row>
          </Form>

       <div className="products-list">       
          {error && (
            <Alert color="danger" className="mt-3">
              {error}
            </Alert>
          )}

          {loading && (
            <Row className="my-3">
              {[...Array(12)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </Row>
          )}

          <Row>
            {products.length > 0
              ? products.map((data, index) => (
                  <Col key={index} xs={12} sm={6} md={4} lg={3}>
                    <ProductCards data={data} />
                  </Col>
                ))
              : !error && (
                  <div className="mt-4 text-center">
                    <Alert color="secondary">
                      <h4 className="alert-heading">
                        Welcome to AI Product Search!
                      </h4>
                      <p>
                        To view product results, please enter a query in the
                        text field or upload a file.
                      </p>
                      <hr />
                      <p className="mb-0">
                        Once you submit your query or file, AI will analyze it
                        and show you the best matching products.
                      </p>
                    </Alert>
                  </div>
                )}
          </Row>
          </div>
        </div>
        {/* products filteration- ends */}
      </Layout>
    </>
  );
};

export default AskAi;
