import Control from "./Control";
import useTimer from "../customHooks/useTimer";

export default function Timer() {
  return (
    <div className="timer__container">
      <h2>Timer</h2>
      <Control {...useTimer(10)} />
    </div>
  );
}
