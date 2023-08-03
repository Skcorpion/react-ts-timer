import { useEffect, useRef, useState } from "react";
import Time from "../../utils/Time";
import sound from "../../assets/bell-ding.wav";
import timerWorker from "./timerWorker";

export type UseTimerType = ReturnType<typeof useTimer>;

export default function useTimer(startSeconds = 600) {
  const [fullTimeInSeconds, setFullTimeInSeconds] = useState(startSeconds);
  const [resetTime, setResetTime] = useState(startSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [activeFieldName, setActiveFieldName] = useState<null | string>(null);
  const [activeInputButton, setActiveInputButton] = useState(false);
  const [incOrDec, setIncOrDec] = useState<1 | -1>(1);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Initialize the web worker
    workerRef.current = new Worker(timerWorker);

    // Event listener to handle messages from the worker
    workerRef.current.onmessage = (event) => {
      const { action } = event.data;

      switch (action) {
        case "TICK":
          setFullTimeInSeconds((prev) => prev - 1);
          break;
        case "TIMER_ENDED":
          setIsRunning(false);
          break;
        default:
          break;
      }
    };

    // Clean up the worker when the component unmounts
    return () => {
      workerRef.current?.terminate();
    };
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      // Send data to the worker whenever isRunning or fullTimeInSeconds changes
      workerRef.current?.postMessage({ fullTimeInSeconds });
      setIsChanged(false);
    }
  }, [isRunning, fullTimeInSeconds]);

  useEffect(() => {
    if (fullTimeInSeconds === 0 && !isChanged) playSoundEffect();
  }, [fullTimeInSeconds, isChanged]);

  useEffect(() => {
    if (isChanged) setResetTime(fullTimeInSeconds);
  }, [isChanged, fullTimeInSeconds]);

  useEffect(() => {
    let timeInterval = 0;
    if (activeFieldName !== null) {
      changeTime(activeFieldName, incOrDec);
      timeInterval = window.setInterval(() => {
        changeTime(activeFieldName, incOrDec);
      }, 100);
    }

    return () => {
      clearInterval(timeInterval);
    };
  }, [activeFieldName, incOrDec]);

  function start() {
    setIsRunning((prev) => !prev);
  }

  function reset() {
    setIsRunning(false);
    setFullTimeInSeconds(resetTime);
  }

  function changeTime(name: string, incOrDec: 1 | -1) {
    switch (name) {
      case "hours":
        setFullTimeInSeconds((prev) => {
          const nextValue = prev + 3600 * incOrDec;
          if (nextValue >= 0) {
            return nextValue;
          } else return prev;
        });
        break;
      case "minutes":
        setFullTimeInSeconds((prev) => {
          const nextValue = prev + 60 * incOrDec;
          if (nextValue >= 0) {
            return nextValue;
          } else return prev;
        });
        break;
      case "seconds":
        setFullTimeInSeconds((prev) => {
          const nextValue = prev + incOrDec;
          if (nextValue >= 0) {
            return nextValue;
          } else return prev;
        });
        break;
    }
    setIsChanged(true);
  }

  // Play the sound effect when the timer ends
  const playSoundEffect = () => {
    const audio = new Audio(sound);
    audio.play();
  };

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    prevValue: string,
    name: string
  ) {
    if (!("inputType" in e.nativeEvent)) {
      // filter keyboard numbers (only arrows allowed)
      const { value } = e.target;
      const intValue = parseInt(value);
      const intPrevValue = parseInt(prevValue);
      const incOrDec = intValue > intPrevValue ? 1 : -1;
      changeTime(name, incOrDec);
    }
  }

  function handleInputButtonTouchDown(incOrDec: 1 | -1, name: string) {
    if (!isRunning) {
      setIncOrDec(incOrDec);
      setActiveFieldName(name);
      setActiveInputButton(true);
    }
  }

  function handleInputButtonTouchUp() {
    setActiveFieldName(null);
    setActiveInputButton(false);
  }

  return {
    time: { ...Time.getTimeFromSeconds(fullTimeInSeconds), fullTimeInSeconds },
    isRunning,
    activeInputButton,
    start,
    reset,
    inputHandlers: {
      handleInputChange,
    },
    inputButtonHandlers: {
      handleInputButtonTouchDown,
      handleInputButtonTouchUp,
    },
  };
}
