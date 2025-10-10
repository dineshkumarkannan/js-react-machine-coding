import React, { useEffect, useRef, useState } from "react";
import "./StopWatch.css";

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef<null | any>(null);
  const startTimeRef = useRef<null | any>(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime((elapsedTime) => Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  function onStart() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function onPause() {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  }

  function onReset() {
    setIsRunning(false);
    setElapsedTime(0);
  }

  function formatTime(elapsedTime) {
    const hour = Math.floor(elapsedTime / (60 * 60 * 1000));
    const min = Math.floor((elapsedTime / (60 * 1000)) % 60);
    const sec = Math.floor((elapsedTime / 1000) % 60);
    const millisec = Math.floor((elapsedTime % 1000) / 10);

    // Helper to pad values with leading zeros
    const pad = (num, size = 2) => String(num).padStart(size, "0");

    // Show hours only if needed
    return `${pad(min)}:${pad(sec)}:${pad(millisec)}`;
  }

  return (
    <div className="stopwatch-wrapper">
      <div className="display">{formatTime(elapsedTime)}</div>
      <div className="btn-wrapper">
        <button onClick={() => onStart()}>Start</button>
        <button onClick={() => onPause()}>Pause</button>
        <button onClick={() => onReset()}>Reset</button>
      </div>
    </div>
  );
};

export default StopWatch;
