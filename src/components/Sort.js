import React from "react";

const Sort = ({ onApplySort }) => {
  return (
    <select onChange={(e) => onApplySort(e.target.value)}>
      <option value="">Sort by</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
    </select>
  );
};

export default Sort;
