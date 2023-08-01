import Control from "../components/Control/Control";
import { useTimerContext } from "./Root";
import ControlButtons from "../components/ControlButtons/ControlButtons";
import StopwatchDigits from "../components/Digits/StopwatchDigits";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Stopwatch() {
  const { stopWatch } = useTimerContext();
  const { time, isRunning, start, reset } = stopWatch;
  const location = useLocation();

  useEffect(() => {
    const tabName = location.pathname.replace(/^\/+/, ""); // Remove leading slash
    document.title = `${tabName.charAt(0).toUpperCase()}${tabName.slice(1)} - ${
      time.hours
    }:${time.minutes}:${time.seconds}`;
  }, [location, time]);
  return (
    <div className="stopwatch__container">
      <Control
        hours={
          <StopwatchDigits {...{ timeType: "hours", digits: time.hours }} />
        }
        minutes={
          <StopwatchDigits {...{ timeType: "minutes", digits: time.minutes }} />
        }
        seconds={
          <StopwatchDigits {...{ timeType: "seconds", digits: time.seconds }} />
        }
      />
      <ControlButtons {...{ isRunning, start, reset }} />
    </div>
  );
}
