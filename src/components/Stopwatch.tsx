import Control from "./Control";
import useStopwatch from "../customHooks/useStopwatch";

export default function Stopwatch() {
  return (
    <div className="stopwatch__container">
      <h2>Stopwatch</h2>
      <Control {...useStopwatch()} />
    </div>
  );
}
