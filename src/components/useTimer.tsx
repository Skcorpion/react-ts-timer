import { useEffect, useState } from "react";

type Time = {
  seconds: number;
  minutes: number;
  hours: number;
};

type StringTime = {
  [Property in keyof Time]: string;
};

export default function useTimer() {
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

  function secondsTransform(totalSeconds: number) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return timeISO({ seconds, minutes, hours });
  }

  function timeISO(timeObj: Time) {
    const stringTimeObj: StringTime = { seconds: "", minutes: "", hours: "" };

    for (const [key, value] of Object.entries(timeObj)) {
      value < 10
        ? (stringTimeObj[key as keyof Time] = `0${value}`)
        : (stringTimeObj[key as keyof Time] = `${value}`);
    }

    return stringTimeObj;
  }
  
  return { ...secondsTransform(time), start, reset, isRunning };
}
