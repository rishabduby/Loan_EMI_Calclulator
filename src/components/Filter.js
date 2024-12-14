import React, { useState } from "react";
import {
  FaTag,
  FaDollarSign,
  FaStar,
  FaSortAmountDown,
  // FaSortAmountUp,
  FaTimesCircle // Icon for Clear button
} from "react-icons/fa"; // Import icons for UI
import "./Filter.css";

const Filter = ({ onApplyFilters }) => {
  const [filters, setFilters] = useState({
    category: "",
    price: "",
    rating: "",
    sortBy: "" // Add sort option
  });

  // Handle change in filter inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Apply filters and pass to parent component
  const applyFilters = () => {
    onApplyFilters(filters);
  };

  // Clear all filters and reset to initial state
  const clearAllFilters = () => {
    setFilters({
      category: "",
      price: "",
      rating: "",
      sortBy: ""
    });
    onApplyFilters({
      category: "",
      price: "",
      rating: "",
      sortBy: ""
    }); // Reset the applied filters in the parent component (Dashboard)
  };

  return (
    <div className="filters-container">
      {/* Category Filter */}
      <div className="filter-item">
        <FaTag className="filter-icon" />
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
        </select>
      </div>

      {/* Price Filter */}
      <div className="filter-item">
        <FaDollarSign className="filter-icon" />
        <input
          type="number"
          name="price"
          value={filters.price}
          placeholder="Max Price"
          onChange={handleChange}
        />
      </div>

      {/* Rating Filter */}
      <div className="filter-item">
        <FaStar className="filter-icon" />
        <select name="rating" value={filters.rating} onChange={handleChange}>
          <option value="">All Ratings</option>
          <option value="4">4 & above</option>
          <option value="3">3 & above</option>
        </select>
      </div>

      {/* Sorting Filter */}
      <div className="filter-item">
        <FaSortAmountDown className="filter-icon" />
        <select name="sortBy" value={filters.sortBy} onChange={handleChange}>
          <option value="">Sort By</option>
          <option value="priceLowToHigh">Price Low to High</option>
          <option value="priceHighToLow">Price High to Low</option>
        </select>
      </div>

      {/* Apply Filters Button */}
      <button className="apply-btn" onClick={applyFilters}>
        Apply Filters
      </button>

      {/* Clear All Filters Button */}
      <div className="clear-btn" onClick={clearAllFilters}>
        <FaTimesCircle className="clear-icon" />
        {/* Clear All */}
      </div>
    </div>
  );
};

export default Filter;
