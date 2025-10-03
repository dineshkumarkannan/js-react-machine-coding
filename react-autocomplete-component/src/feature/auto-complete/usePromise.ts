import { useEffect, useRef, useState } from "react";

const usePromise = (
  query,
  promise,
  parseResponse,
  wait,
  autoComplete,
  isItemSelect
) => {
  const [items, setItems] = useState(null);
  const [error, setError] = useState("");

  const timeRef = useRef<any | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const debounce = (cb, time) => {
    return function (...args) {
      const context = this;
      if (timeRef.current) clearTimeout(timeRef.current);
      timeRef.current = setTimeout(() => {
        cb.apply(context, args);
      }, time);
    };
  };

  const fetchCall = debounce(async (query: any, promise: any) => {
    try {
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      const respone = await promise(query, abortRef.current.signal);

      if (!respone.ok) {
        throw new Error("Api error!");
      }
      const data = await respone.json();
      setItems(parseResponse(data));
    } catch (err: any) {
      if (err.name !== "AbortError") {
        setError(err.message || "unknown error");
      }
    } finally {
    }
  }, wait);

  useEffect(() => {
    if (!query || !autoComplete || isItemSelect) {
      setItems(null);
      setError("");
      return;
    }

    fetchCall(query, promise);

    return () => {
      if (timeRef.current) clearTimeout(timeRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [query, promise, isItemSelect]);

  return { items, setItems, error };
};

export default usePromise;
