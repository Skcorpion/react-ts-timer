import { useEffect } from "react";
import Control from "../components/Control/Control";
import ControlButtons from "../components/ControlButtons/ControlButtons";
import TimerDigits from "../components/Digits/TimerDigits";
import { useTimerContext } from "./Root";
import { useLocation } from "react-router-dom";

export default function Timer() {
  const { timer } = useTimerContext();
  const {
    time,
    isRunning,
    activeInputButton,
    start,
    reset,
    inputHandlers,
    inputButtonHandlers,
  } = timer;
  const compactProps = {
    isRunning,
    activeInputButton,
    inputHandlers,
    inputButtonHandlers,
  };
  const location = useLocation();

  useEffect(() => {
    const tabName = location.pathname.replace(/^\/+/, ""); // Remove leading slash
    document.title = `${tabName.charAt(0).toUpperCase()}${tabName.slice(1)} - ${
      time.hours
    }:${time.minutes}:${time.seconds}`;
  }, [location, time]);
  return (
    <div className="timer__container">
      <Control
        hours={
          <TimerDigits
            {...{
              ...compactProps,
              timeType: "hours",
              digits: time.hours,
            }}
          />
        }
        minutes={
          <TimerDigits
            {...{
              ...compactProps,
              timeType: "minutes",
              digits: time.minutes,
            }}
          />
        }
        seconds={
          <TimerDigits
            {...{
              ...compactProps,
              timeType: "seconds",
              digits: time.seconds,
            }}
          />
        }
      />
      <ControlButtons {...{ isRunning, time, start, reset }} />
    </div>
  );
}
