import React, { useRef, useState } from "react";
import Timer from "./Timer";

import "./TimerWrapper.css";

const TimerWrapper = () => {
  const [expired, setExpired] = useState(false);
  const timerChildRef = useRef<null | any>(null);

  function handleRestart() {
    console.log("Expired!");
    setExpired(false);
    timerChildRef.current.onRestart();
  }

  return (
    <div className="timer-wrapper">
      <Timer
        duration={10 * 1000}
        onExpire={() => setExpired(true)}
        ref={timerChildRef}
      />
      <div className="btn-wrapper">
        <button
          onClick={() => timerChildRef.current.onStart()}
          disabled={expired}
        >
          Start
        </button>
        <button
          onClick={() => timerChildRef.current.onPause()}
          disabled={expired}
        >
          Pause
        </button>
        <button onClick={() => handleRestart()}>Restart</button>
      </div>
    </div>
  );
};

export default TimerWrapper;
