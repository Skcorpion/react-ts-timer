import { useEffect, useState } from "react";
import Time from "../utils/Time";

export default function useTimer(startSeconds = 600) {
  const [time, setTime] = useState(startSeconds);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval = 0;
    if (isRunning) {
      timerInterval = setInterval(() => {
        if (isRunning && time > 0) {
          setTime((prev) => prev - 1);
        } else if (time === 0) {
          setIsRunning(false);
        }
      }, 1000);
    }
    
    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning, time]);

  function start() {
    setIsRunning((prev) => !prev);
  }

  function reset() {
    setIsRunning(false);
    setTime(startSeconds);
  }
  
  return { ...Time.getTimeFromSeconds(time), start, reset, isRunning };
}