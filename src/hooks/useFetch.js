import { useState, useEffect } from "react";

const useFetch = (apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    apiCall()
      .then((response) => setData(response))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, dependencies);

  return { data, loading, error };
};

export default useFetch;
