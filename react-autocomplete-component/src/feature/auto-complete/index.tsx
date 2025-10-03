import React, { useCallback, useEffect, useState } from "react";
import "./index.css";
import usePromise from "./usePromise";

const index = ({
  label,
  name,
  id,
  placeholder,
  autoComplete,
  renderList,
  renderNoDataFound,
  renderError,
  promise,
  parseResponse,
  wait,
}) => {
  const [query, setQuery] = useState("");
  const [isItemSelect, setIsItemSelect] = useState(false);
  const { items, setItems, error } = usePromise(
    query,
    promise,
    parseResponse,
    wait,
    autoComplete,
    isItemSelect
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleChange = (event) => {
    event.preventDefault();
    setQuery(event.target.value);
  };

  function onClickSelect(index) {
    setQuery(items[index]?.name);
    setItems(null);
    setActiveIndex(null);
    setIsItemSelect(true);
    return;
  }

  const renderItemsList = useCallback(
    (items: any) => {
      if (autoComplete === false) {
        return null;
      }
      return <>{renderList(items, activeIndex, onClickSelect)}</>;
    },
    [items, activeIndex]
  );

  function handleKeyUp(event) {
    event.preventDefault();

    if (event.key === "Enter" && event.keyCode === 13) {
      // Enter key
      if (activeIndex === null) return;
      setQuery(items[activeIndex]?.name);
      setItems(null);
      setActiveIndex(null);
      setIsItemSelect(true);
      return;
    }
    setIsItemSelect(false);
    if (!items || items.length === 0) return;

    if (event.key === "ArrowDown" && event.keyCode === 40) {
      // ArrowDown key
      if (activeIndex === null || activeIndex === items.length - 1) {
        setActiveIndex(0);
      } else {
        setActiveIndex((prev: any) => prev + 1);
      }
    }
    if (event.key === "ArrowUp" && event.keyCode === 38) {
      // ArrowUp key
      if (activeIndex === null || activeIndex === 0) {
        setActiveIndex(items.length - 1);
      } else {
        setActiveIndex((prev: any) => prev - 1);
      }
    }
  }

  return (
    <div className="autocomplete-wrapper">
      <label htmlFor={name}>{label}</label>
      <input
        type="text"
        id={id}
        name={name}
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
      />
      {autoComplete &&
        query &&
        items &&
        items.length > 0 &&
        renderItemsList(items)}
      {autoComplete && error && renderError(error)}
      {query &&
        items &&
        items.length === 0 &&
        renderNoDataFound("No Data found!")}
    </div>
  );
};

export default index;
