import { useEffect } from "react";
import "./Progress-bar.css";

const ProgressBar = ({ progress }: any) => {
  return (
    <div className="outer">
      <div
        className="inner"
        style={{
          transform: `translateX(${progress - 100}%)`,
          transition: "transform 0.4s ease",
        }}
      >
        <div className="progress-text">{progress}%</div>
      </div>
    </div>
  );
};

export default ProgressBar;
