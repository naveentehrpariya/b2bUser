import React from 'react';
import { Col } from 'reactstrap';
import './skeletonCard.css'; 

const SkeletonCard = () => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} className="mb-5">
      <div className="skeleton-image"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text short"></div>
      <div className="skeleton-button"></div>
    </Col>
  );
};

export default SkeletonCard;
