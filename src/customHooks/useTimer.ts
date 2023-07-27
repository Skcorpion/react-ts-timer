import { useEffect, useState } from "react";
import Time from "../utils/Time";

export type UseTimerType = ReturnType<typeof useTimer>;

export default function useTimer(startSeconds = 600) {
  const [fullTimeInSeconds, setFullTimeInSeconds] = useState(startSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [activeFieldName, setActiveFieldName] = useState<null | string>(null);
  const [activeInputButton, setActiveInputButton] = useState(false);
  const [incOrDec, setIncOrDec] = useState<1 | -1>(1);

  
  useEffect(() => {
    let timerInterval = 0;
    if (isRunning) {
      timerInterval = setInterval(() => {
        if (isRunning && fullTimeInSeconds > 0) {
          setFullTimeInSeconds((prev) => prev - 1);
        } else if (fullTimeInSeconds === 0) {
          playSoundEffect();
          setIsRunning(false);
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning, fullTimeInSeconds]);

  useEffect(() => {
    let timeInterval = 0;
    if (activeFieldName !== null) {
      changeTime(activeFieldName, incOrDec);
      timeInterval = setInterval(() => {
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
    setFullTimeInSeconds(startSeconds);
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
  }

  // Play the sound effect when the timer ends
  const playSoundEffect = () => {
    const audio = new Audio('/bell-ding.wav');
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
    time: {...Time.getTimeFromSeconds(fullTimeInSeconds), fullTimeInSeconds},
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
