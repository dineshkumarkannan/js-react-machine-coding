import React from "react";

const RenderList = ({ items, activeIndex, onClickSelect }) => {
  if (items.lenght >= 0) {
    return null;
  }
  return (
    <div className="list-wrapper">
      {items.map((item, index) => {
        return (
          <div
            key={index}
            className={`list-item ${index === activeIndex ? "active" : ""}`}
            onClick={() => onClickSelect(index)}
          >
            {item.name}
          </div>
        );
      })}
    </div>
  );
};

export default RenderList;
