import axios from "axios";

// const BASE_URL = "https://dummyjson.com/products";

export const fetchProducts = async (page = 1, filters = {}, sort = "") => {
  const skip = (page - 1) * 30; // Ensure 'page' is initialized
  const response = await axios.get("https://fakestoreapi.com/products", {
    params: {
      skip: skip >= 0 ? skip : 0, // Fallback to 0 if skip is invalid
      limit: 30,
      ...filters,
      sort
    }
  });
  console.log({ response: response.data });
  return response.data;
};
