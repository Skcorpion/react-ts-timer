import { useEffect, useState} from "react";
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    prevValue: string
  ) {
    if (!("inputType" in e.nativeEvent)) {
      // filter keyboard numbers (only arrows allowed)
      const { name, value } = e.target;
      const intValue = parseInt(value);
      const intPrevValue = parseInt(prevValue);
      const incOrDec = intValue > intPrevValue ? 1 : -1;

      switch (name) {
        case "hours":
          setTime((prev) => {
            const nextValue = prev + 3600 * incOrDec;
            if (nextValue >= 0) {
              return nextValue;
            } else return prev;
          });
          break;
        case "minutes":
          setTime((prev) => {
            const nextValue = prev + 60 * incOrDec;
            if (nextValue >= 0) {
              return nextValue;
            } else return prev;
          });
          break;
        case "seconds":
          setTime((prev) => {
            const nextValue = prev + incOrDec;
            if (nextValue >= 0) {
              return nextValue;
            } else return prev;
          });
          break;
      }
    }
  }

  return {
    ...Time.getTimeFromSeconds(time),
    start,
    reset,
    handleChange,
    isRunning,
  };
}