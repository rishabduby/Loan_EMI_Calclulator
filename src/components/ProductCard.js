import React, { useState } from "react";
import "./ProductCard.css";

const ProductCard = ({ title, price, image, category, onClick }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false); // Image has loaded
  };

  // Function to truncate title to 10 characters
  const truncateTitle = (title) => {
    if (title.length > 10) {
      return title.substring(0, 10) + "..."; // Truncate and add ellipsis
    }
    return title;
  };

  return (
    <div className="product-card" onClick={onClick}>
      <div className="image-container">
        {isLoading && <div className="image-placeholder"></div>}{" "}
        {/* Placeholder */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          onLoad={handleImageLoad} // Set loading to false once image loads
        />
      </div>
      <h3 title={title}>{truncateTitle(title)}</h3>{" "}
      {/* Tooltip will show full title */}
      <p>Category: {category}</p>
      <p>Price: ${price}</p>
    </div>
  );
};

export default ProductCard;
