import { FC } from "react";
import { UseTimerType } from "../../customHooks/useTimer";
import "./ControlButtons.css";

type ControlButtonsType = Pick<
  UseTimerType,
  "isRunning" | "time" | "start" | "reset"
>;

const ControlButtons: FC<ControlButtonsType> = ({
  isRunning,
  time,
  start,
  reset,
}) => (
  <div className="buttons">
    <button
      className={`control-btn start ${isRunning ? "running" : ""}`}
      onClick={start}
      disabled={time.fullTimeInSeconds === 0}
    >
      {isRunning ? "Pause" : "Play"}
    </button>
    <button className="control-btn" onClick={reset}>
      Reset
    </button>
  </div>
);

export default ControlButtons;
