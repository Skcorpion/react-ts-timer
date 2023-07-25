import Control from "../components/Control/Control";
import { useTimerContext } from "./Root";
import ControlButtons from "../components/ControlButtons/ControlButtons";
import StopwatchDigits from "../components/Digits/StopwatchDigits";

export default function Stopwatch() {
  const { stopWatch } = useTimerContext();
  const { time, isRunning, start, reset } = stopWatch;
  return (
    <div className="stopwatch__container">
      <Control
        hours={<StopwatchDigits {...{ timeType: "hours", digits: time.hours }} />}
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
