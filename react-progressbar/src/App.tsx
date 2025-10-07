import { useEffect, useRef, useState } from "react";
import ProgressBar from "./components/Progress-bar";

function App() {
  const [progressList, setProgressList] = useState([0, 0, 0, 0, 0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<null | any>(null);

  useEffect(() => {
    if (currentIndex >= progressList.length) return;

    timerRef.current = setInterval(() => {
      setProgressList((p) => {
        const newProgress = [...p];
        if (newProgress[currentIndex] >= 100) {
          clearInterval(timerRef.current);
          setCurrentIndex((index) => index + 1);
          return newProgress;
        }
        newProgress[currentIndex] += 10;
        return newProgress;
      });
    }, 500);

    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  return (
    <div className="progress-container">
      {progressList.map((progress, i) => (
        <ProgressBar key={i} progress={progress} />
      ))}
    </div>
  );
}

export default App;
