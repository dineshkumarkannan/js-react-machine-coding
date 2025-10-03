import { useEffect, useRef, useState } from "react";

const usePromise = (query, promise, responseHandler) => {
  const [items, setItems] = useState(null);
  const abortRef = useRef<null | AbortController>(null);
  const debounceRef = useRef<null | any>(null);

  const fetchApiCall = async (query: any) => {
    try {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      const response = await promise(query, abortRef.current.signal);
      if (!response.ok) {
        throw new Error("Api error");
      }
      const data = await response.json();
      console.log(responseHandler(data));
      setItems(responseHandler(data));
    } catch (err) {}
  };

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query) {
      setItems(null);
      return;
    }

    debounceRef.current = setTimeout(() => {
      fetchApiCall(query);
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [query]);

  return { items, setItems };
};

export default usePromise;
