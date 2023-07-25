import Control from "../components/Control/Control";
import ControlButtons from "../components/ControlButtons/ControlButtons";
import TimerDigits from "../components/Digits/TimerDigits";
import { useTimerContext } from "./Root";

export default function Timer() {
  const { timer } = useTimerContext();
  const {
    isRunning,
    start,
    reset,
    hours,
    minutes,
    seconds,
    handleClick,
    handleUp,
    handleChange,
    activeFieldName,
  } = timer;
  const compactProps = {
    isRunning,
    handleClick,
    handleUp,
    handleChange,
    activeFieldName,
  };
  return (
    <div className="timer__container">
      <Control
        hours={
          <TimerDigits
            {...{
              ...compactProps,
              timeType: "hours",
              digits: hours,
            }}
          />
        }
        minutes={
          <TimerDigits
            {...{
              ...compactProps,
              timeType: "minutes",
              digits: minutes,
            }}
          />
        }
        seconds={
          <TimerDigits
            {...{
              ...compactProps,
              timeType: "seconds",
              digits: seconds,
            }}
          />
        }
      />
      <ControlButtons {...{ isRunning, start, reset }} />
    </div>
  );
}
