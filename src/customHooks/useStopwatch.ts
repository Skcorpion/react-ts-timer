import { useEffect, useState } from "react";
import Time from "../utils/Time";

export type UseStopwatchType = ReturnType<typeof useStopwatch>;

export default function useStopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timerInterval = 0;
    if (isRunning) {
      timerInterval = setInterval(() => {
        if (isRunning) {
          setTime((prev) => prev + 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning]);

  function start() {
    setIsRunning((prev) => !prev);
  }

  function reset() {
    setIsRunning(false);
    setTime(0);
  }

  return {
    time: Time.getTimeFromSeconds(time),
    isRunning,
    start,
    reset,
  };
}
