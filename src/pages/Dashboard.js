import React, { useState } from "react";
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";

const Dashboard = () => {
  const [filters, setFilters] = useState({});

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="dashboard">
      <Filter onApplyFilters={handleApplyFilters} />
      <ProductList filters={filters} />
    </div>
  );
};

export default Dashboard;
