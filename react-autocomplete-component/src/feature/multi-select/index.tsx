import React, { useState } from "react";

import "./index.css";
import usePromise from "./usePromise";

const index = ({
  label,
  name,
  id,
  placeholder,
  promise,
  responseHandler,
  renderList,
}) => {
  const [query, setQuery] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectedItemsSet, setSelectedItemsSet] = useState(new Set());

  const { items, setItems } = usePromise(query, promise, responseHandler);

  const handleItemSelect = (item: any) => {
    setSelectedItems((prev: any) => {
      return [...prev, item];
    });
    const newSet = selectedItemsSet;
    newSet.add(item.email);
    setSelectedItemsSet(newSet);
  };

  const handleListRender = (items: any[]) => {
    if (selectedItemsSet.size > 0) {
      const filteredItems = items.filter(
        (item: any) => !selectedItemsSet.has(item.email)
      );
      return items.length > 0 && renderList(filteredItems, 0, handleItemSelect);
    } else {
      return items.length > 0 && renderList(items, 0, handleItemSelect);
    }
  };

  const handleRemoveItem = (item: any) => {
    // setItems(null);
    const newSelectedItems = selectedItems.filter(
      (i) => i.email !== item.email
    );
    setSelectedItems([...newSelectedItems]);
    const newSet = selectedItemsSet;
    newSet.delete(item.email);
    setSelectedItemsSet(newSet);
  };

  const handleKeyDown = (e) => {
    // e.preventDefault();
    if (
      selectedItems.length > 0 &&
      !query &&
      e.key === "Backspace" &&
      e.keyCode === 8
    ) {
      const lastSelectedItem = selectedItems[selectedItems.length - 1];
      handleRemoveItem(lastSelectedItem);
      return;
    }
  };

  return (
    <div>
      <div className="mulitselect-container">
        {selectedItems &&
          selectedItems.map((item) => (
            <span className="pill">
              {item.firstName} {item.lastName}
              <span
                key={item.email}
                className="close"
                onClick={() => handleRemoveItem(item)}
              >
                x
              </span>
            </span>
          ))}
        <input
          type="text"
          name={name}
          id={id}
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      {items && handleListRender(items)}
    </div>
  );
};

export default index;
