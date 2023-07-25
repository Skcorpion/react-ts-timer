import { FC } from "react";
import { UseTimerType } from "../../customHooks/useTimer";
import './ControlButtons.css'

type ControlButtonsType = Pick<
  UseTimerType,
  "isRunning" | "start" | "reset"
>;

const ControlButtons: FC<ControlButtonsType> = ({
  isRunning,
  start,
  reset,
}) => (
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
);

export default ControlButtons;
