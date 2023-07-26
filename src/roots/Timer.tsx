import Control from "../components/Control/Control";
import ControlButtons from "../components/ControlButtons/ControlButtons";
import TimerDigits from "../components/Digits/TimerDigits";
import { useTimerContext } from "./Root";

export default function Timer() {
  const { timer } = useTimerContext();
  const {
    time,
    isRunning,
    activeFieldName,
    start,
    reset,
    inputHandlers,
    inputButtonHandlers,
  } = timer;
  const compactProps = {
    isRunning,
    activeFieldName,
    inputHandlers,
    inputButtonHandlers,
  };
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
      <ControlButtons {...{ isRunning, start, reset }} />
    </div>
  );
}
