import { FC } from "react";
import "./Control.css";
import useTimer from "../customHooks/useTimer";

const Control: FC<ReturnType<typeof useTimer> & { isControled: boolean }> = ({
  hours,
  minutes,
  seconds,
  isRunning,
  start,
  reset,
  handleChange,
  isControled,
}) => (
  <>
    <div className="time">
      <input
        className="digits"
        type="number"
        name="hours"
        value={hours}
        onChange={(e) => handleChange(e, hours)}
        disabled={isRunning || !isControled}
      />
      <span className="colon">:</span>
      <input
        className="digits"
        type="number"
        name="minutes"
        value={minutes}
        onChange={(e) => handleChange(e, minutes)}
        disabled={isRunning || !isControled}
      />
      <span className="colon">:</span>
      <input
        className="digits"
        type="number"
        name="seconds"
        value={seconds}
        onChange={(e) => handleChange(e, seconds)}
        disabled={isRunning || !isControled}
      />
    </div>
    <div className="buttons">
      <button
        className={`control-btn start ${isRunning ? "running" : ""}`}
        onClick={start}
      >
        {isRunning ? "Pause" : "Play"}
      </button>
      <button className="control-btn" onClick={reset}>
        Reset
      </button>
    </div>
  </>
);

export default Control;
