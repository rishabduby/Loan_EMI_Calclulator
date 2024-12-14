import React from "react";
import "./product-details.modal.css"; // You can style the modal here

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <h2>{product.title}</h2>
        <div className="img-main">
          <img
            src={product.image}
            alt={product.title}
            className="modal-image"
          />
        </div>
        <p>
          <strong>Price:</strong> ${product.price}
        </p>
        <p>
          <strong>Category:</strong> {product.category}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating.rate} ★
        </p>
        <p>
          <strong>Reviews:</strong> {product.rating.count} reviews
        </p>
        <p>
          <strong>Description:</strong> {product.description}
        </p>
        <p>
          <strong>Availability:</strong>{" "}
          {product.availability ? "In Stock" : "Out of Stock"}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
