import Control from "../components/Control/Control";
import { useTimerContext } from "./Root";
import ControlButtons from "../components/ControlButtons/ControlButtons";
import StopwatchDigits from "../components/Digits/StopwatchDigits";

export default function Stopwatch() {
  const { stopWatch } = useTimerContext();
  const { hours, minutes, seconds, isRunning, start, reset } = stopWatch;
  return (
    <div className="stopwatch__container">
      <Control
        hours={<StopwatchDigits {...{ timeType: "hours", digits: hours }} />}
        minutes={
          <StopwatchDigits {...{ timeType: "minutes", digits: minutes }} />
        }
        seconds={
          <StopwatchDigits {...{ timeType: "seconds", digits: seconds }} />
        }
      />
      <ControlButtons {...{ isRunning, start, reset }} />
    </div>
  );
}
