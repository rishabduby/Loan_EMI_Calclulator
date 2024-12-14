import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import ProductDetailsModal from "./product-detail/product-details.modal";
import { fetchProducts } from "../utils/api";

const ProductList = ({ filters }) => {
  const [allProducts, setAllProducts] = useState([]); // To store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // To store filtered products
  const [visibleProducts, setVisibleProducts] = useState([]); // Products for infinite scroll
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null); // To store the selected product for the modal
  const productsPerPage = 8; // Limit to 8 products per page
  const [IsLoader, setIsLoader] = useState(false);

  // Fetch all products once
  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setIsLoader(true);
        const products = await fetchProducts(); // Assuming fetchProducts fetches all products
        setIsLoader(false);

        setAllProducts(products);
        setFilteredProducts(products); // Start with all products
        setVisibleProducts(products.slice(0, productsPerPage)); // Load first 8 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    loadAllProducts();
  }, []);

  // Apply filters and sorting on the full product list
  useEffect(() => {
    let filtered = allProducts;

    // If filters are applied (not empty), apply filtering logic
    if (filters.category) {
      filtered = filtered.filter((product) =>
        product.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }
    if (filters.price) {
      filtered = filtered.filter(
        (product) => product.price <= parseFloat(filters.price)
      );
    }
    if (filters.rating) {
      filtered = filtered.filter(
        (product) => product.rating >= parseFloat(filters.rating)
      );
    }
    if (filters.sortBy === "priceLowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === "priceHighToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    // Set filtered products
    setFilteredProducts(filtered);
    setVisibleProducts(filtered.slice(0, productsPerPage)); // Reset to 8 products after filter
    setPage(1);
  }, [filters, allProducts]);

  // Load more products for infinite scroll
  const loadMore = () => {
    const nextPage = page + 1;
    const nextProducts = filteredProducts.slice(0, nextPage * productsPerPage);
    setVisibleProducts(nextProducts);
    setPage(nextPage);
  };

  // Open the modal with the selected product's details
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // Close the modal
  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      {/* Product Details Modal */}
      {/* <Loader /> */}
      {IsLoader ? (
        <Loader />
      ) : (
        <>
          <ProductDetailsModal product={selectedProduct} onClose={closeModal} />
          <InfiniteScroll
            dataLength={visibleProducts?.length}
            next={loadMore}
            hasMore={visibleProducts?.length < filteredProducts?.length}
            loader={<Loader />}
            style={{ overflow: "none" }}
            scrollThreshold={0.9} // Load when 90% of the scroll height is reached (before reaching the very bottom)
          >
            <div className="product-grid">
              {visibleProducts?.map((product) => (
                <ProductCard
                  key={product?.id}
                  title={product?.title} // Use title instead of name
                  price={product?.price}
                  category={product?.category}
                  image={product?.image} // Pass the first image from the images array
                  onClick={() => handleProductClick(product)} // Handle click to show modal
                />
              ))}
            </div>
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default ProductList;
