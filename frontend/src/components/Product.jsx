import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="image-container">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-img"
          />
        </Link>

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="discount-badge">{product.discount}% OFF</div>
        )}
      </div>

      {/* Product Details */}
      <div className="product-info">
        <Link to={`/product/${product._id}`} className="product-link">
          <h3 className="product-name">{product.name}</h3>
        </Link>

        <p className="manufacturer">{product.manufacturer}</p>

        {/* Rating */}
        <div className="rating">
          ⭐ {product.rating} ({product.numReviews} reviews)
        </div>

        {/* Description */}
        <p className="description">{product.description}</p>

        {/* Stock */}
        <p className={`stock ${product.countInStock > 0 ? "in" : "out"}`}>
          {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* Price */}
        <div className="price">
          <span>${product.price}</span>
          {product.discount > 0 && (
            <small className="discount-text">
              &nbsp;Save {product.discount}% today
            </small>
          )}
        </div>

        {/* Button */}
        <Link to={`/product/${product._id}`}>
          <button className="view-btn">View Product</button>
        </Link>
      </div>

      {/* Inline CSS */}
      <style jsx="true">{`
        .product-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          overflow: hidden;
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          width: 100%;
          max-width: 320px;
          margin: 16px;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        /* Image Section */
        .image-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .product-img {
          width: 100%;
          height: 270px;
          object-fit: cover;
          transition: transform 0.4s ease;
          border-bottom: 1px solid #f1f1f1;
        }

        .image-container:hover .product-img {
          transform: scale(1.08);
        }

        /* Discount Badge */
        .discount-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #ff3b3b;
          color: #fff;
          font-size: 0.8rem;
          padding: 5px 10px;
          border-radius: 8px;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        /* Info Section */
        .product-info {
          padding: 14px 18px 20px 18px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .product-link {
          text-decoration: none;
        }

        .product-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #222;
          margin: 0;
          transition: color 0.3s ease;
        }

        .product-name:hover {
          color: #007bff;
        }

        .manufacturer {
          font-size: 0.9rem;
          color: #666;
        }

        .rating {
          font-size: 0.9rem;
          color: #f4b400;
          font-weight: 500;
        }

        .description {
          font-size: 0.85rem;
          color: #777;
          line-height: 1.4;
          max-height: 45px;
          overflow: hidden;
        }

        .stock {
          font-size: 0.9rem;
          font-weight: 600;
          margin-top: 2px;
        }

        .stock.in {
          color: #2a9d8f;
        }

        .stock.out {
          color: #e63946;
        }

        .price {
          font-size: 1.2rem;
          font-weight: 700;
          color: #111;
          display: flex;
          align-items: center;
        }

        .discount-text {
          font-size: 0.85rem;
          color: #2a9d8f;
          font-weight: 500;
          margin-left: 4px;
        }

        .view-btn {
          margin-top: 10px;
          padding: 10px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(90deg, #007bff, #00c3ff);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .view-btn:hover {
          background: linear-gradient(90deg, #005ecb, #00a7d6);
          transform: scale(1.03);
        }

        /* Responsive Layouts */
        @media (max-width: 1200px) {
          .product-img {
            height: 240px;
          }
        }

        @media (max-width: 900px) {
          .product-card {
            max-width: 300px;
          }
          .product-img {
            height: 220px;
          }
        }

        @media (max-width: 600px) {
          .product-card {
            max-width: 100%;
            margin: 10px 0;
          }
          .product-img {
            height: 200px;
          }
          .product-info {
            padding: 10px 14px 16px 14px;
          }
          .product-name {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
