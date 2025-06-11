import { Card, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import React from "react";
import Rating from "./Rating";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="h5" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        {/* Manufacturer */}
        <Card.Text as="small" className="text-muted">
          by {product.manufacturer}
        </Card.Text>

        {/* Prescription Required Badge */}
        {product.prescriptionRequired && (
          <Badge bg="danger" className="ms-2">
            Prescription Required
          </Badge>
        )}

        {/* Rating */}
        <Card.Text as="div">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </Card.Text>

        {/* Dosage & Expiry */}
        <Card.Text as="small">
          <strong>Dosage:</strong> {product.dosage}
          <br />
          <strong>Expiry:</strong> {product.expiryDate}
        </Card.Text>

        {/* Stock Availability */}
        <Card.Text>
          {product.countInStock > 0 ? (
            <Badge bg="success">In Stock</Badge>
          ) : (
            <Badge bg="secondary">Out of Stock</Badge>
          )}
        </Card.Text>

        {/* Price & Discount */}
        <Card.Text as="h4">
          ${product.price}{" "}
          {product.discount > 0 && (
            <small className="text-success">
              (-{product.discount}% off)
            </small>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
