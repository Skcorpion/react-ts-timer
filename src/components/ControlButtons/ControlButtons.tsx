import { FC } from "react";
import useTimer from "../../customHooks/useTimer";
import './ControlButtons.css'

type ControlButtonsType = Pick<
  ReturnType<typeof useTimer>,
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
