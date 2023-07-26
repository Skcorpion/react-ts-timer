import { useEffect, useState } from "react";
import Time from "../utils/Time";

export type UseTimerType = ReturnType<typeof useTimer>;

export default function useTimer(startSeconds = 600) {
  const [time, setTime] = useState(startSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [activeFieldName, setActiveFieldName] = useState<null | string>(null);
  const [activeInputButton, setActiveInputButton] = useState(false);
  const [incOrDec, setIncOrDec] = useState<1 | -1>(1);

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
    setTime(startSeconds);
  }

  function changeTime(name: string, incOrDec: 1 | -1) {
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

  function moveCaretToEnd(
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLInputElement, MouseEvent>
      | React.FocusEvent<HTMLInputElement, Element>
  ) {
    (e.target as HTMLInputElement).setSelectionRange(2, 2);
  }

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    prevValue: string,
    name: string
  ) {
    // fix copy past hack!
    console.log(e.target.value.slice(1));


    if (!("inputType" in e.nativeEvent)) {
      // filter keyboard numbers (only arrows allowed)
      const { value } = e.target;
      const intValue = parseInt(value);
      const intPrevValue = parseInt(prevValue);
      const incOrDec = intValue > intPrevValue ? 1 : -1;
      changeTime(name, incOrDec);
    }
  }

  function handleInputButtonDown(incOrDec: 1 | -1, name: string) {
    if (!isRunning) {
      setIncOrDec(incOrDec);
      setActiveFieldName(name);
      setActiveInputButton(true);
    }
  }

  function handleInputButtonUp() {
    setActiveFieldName(null);
    setActiveInputButton(false);
  }

  function handleInputFocus(e: React.FocusEvent<HTMLInputElement, Element>) {
    moveCaretToEnd(e);
  }

  function handleInputClick(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    moveCaretToEnd(e);
  }

  function handleInputKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    name: string
  ) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setIncOrDec(1);
      setActiveFieldName(name);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setIncOrDec(-1);
      setActiveFieldName(name);
    } else if (/\D/.test(e.key)) {
      e.preventDefault();
    }
  }

  function handleInputKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      setActiveFieldName(null);
    }
  }

  function handleInputBlur() {
    setActiveFieldName(null);
  }

  return {
    time: Time.getTimeFromSeconds(time),
    isRunning,
    activeInputButton,
    start,
    reset,
    inputHandlers: {
      handleInputChange,
      handleInputFocus,
      handleInputKeyDown,
      handleInputClick,
      handleInputKeyUp,
      handleInputBlur,
    },
    inputButtonHandlers: {
      handleInputButtonDown,
      handleInputButtonUp,
    },
  };
}
