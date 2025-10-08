import React, { createContext, useContext, useState } from "react";
import "./index.css";

const StepperContext = createContext<null | any>({});
export const useStepper = () => useContext(StepperContext);

const Stepper = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalChildren = children.length;

  const goToStep = (index: any) => {
    setActiveIndex(index);
  };

  const goToPrev = () => {
    setActiveIndex(Math.max(0, activeIndex - 1));
  };

  const goToNext = () => {
    setActiveIndex(Math.min(activeIndex + 1, totalChildren - 1));
  };

  return (
    <StepperContext.Provider value={{ goToStep, goToPrev, goToNext }}>
      <div className="stepper">
        <div className="stpper-header">
          <div className="step-wrap">
            {children.map((step, index) => {
              return (
                <div
                  key={index}
                  className={`step ${activeIndex >= index ? "active" : ""}`}
                  onClick={() => goToStep(index)}
                >
                  {index + 1}
                </div>
              );
            })}
          </div>

          <div
            className="step-line active"
            style={{ width: `${(100 / (totalChildren - 1)) * activeIndex}%` }}
          ></div>
        </div>
        <div className="stepper-content">{children[activeIndex]}</div>
      </div>
    </StepperContext.Provider>
  );
};

const Step = ({ children }: any) => {
  const { goToPrev, goToNext } = useStepper();
  return (
    <div>
      <div>{children}</div>
      <div className="btn-container">
        <button onClick={() => goToPrev()}>Prev</button>
        <button onClick={() => goToNext()}>Next</button>
      </div>
    </div>
  );
};

Stepper.Step = Step;

export default Stepper;
