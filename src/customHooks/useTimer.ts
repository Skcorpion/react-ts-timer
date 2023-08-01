import { useEffect, useState } from "react";
import Time from "../utils/Time";
import sound from "../assets/bell-ding.wav";

export type UseTimerType = ReturnType<typeof useTimer>;

export default function useTimer(startSeconds = 600) {
  const [fullTimeInSeconds, setFullTimeInSeconds] = useState(startSeconds);
  const [resetTime, setResetTime] = useState(startSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [activeFieldName, setActiveFieldName] = useState<null | string>(null);
  const [activeInputButton, setActiveInputButton] = useState(false);
  const [incOrDec, setIncOrDec] = useState<1 | -1>(1);

  useEffect(() => {
    if (isRunning) {
      window.setTimeout(() => {
        if (fullTimeInSeconds > 0) {
          setFullTimeInSeconds((prev) => prev - 1);
        } else {
          setIsRunning(false);
        }
        if (fullTimeInSeconds === 1) {
          playSoundEffect();
          setIsRunning(false);
        }
      }, 1000);
      setIsChanged(false);
    }
  }, [isRunning, fullTimeInSeconds]);

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
