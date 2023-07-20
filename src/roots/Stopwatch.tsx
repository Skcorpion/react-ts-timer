import Control from "../components/Control";
import useStopwatch from "../customHooks/useStopwatch";

export default function Stopwatch() {
  return (
    <div className="stopwatch__container">
      <Control {...useStopwatch()} isControled={false} />
    </div>
  );
}
