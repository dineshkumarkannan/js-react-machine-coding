import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

const Timer = forwardRef(({ duration, onExpire }, ref) => {
  const [time, setTime] = useState(duration);
  const timerRef = useRef<null | any>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    handleStart();
    return () => {
      clearTimeout(timerRef.current);
    };
  }, [time]);

  function handleStart() {
    timerRef.current = setTimeout(() => {
      setTime(time - 1000);
    }, 1000);

    if (time <= 0) {
      onExpire && onExpire();
      clearTimeout(timerRef.current);
    }
  }

  useImperativeHandle(ref, () => ({
    onPause() {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    },
    onStart() {
      handleStart();
    },
    onRestart() {
      setTime(duration);
    },
  }));

  function getFormattedTime(time) {
    const day = Math.floor(time / DAY);
    const hour = Math.floor((time % DAY) / HOUR);
    const min = Math.floor((time % HOUR) / MIN);
    const sec = Math.floor((time % MIN) / SEC);
    return `${day} : ${hour}: ${min}: ${sec}`;
  }

  return <div style={{ fontSize: "3rem" }}>{getFormattedTime(time)}</div>;
});

export default Timer;
