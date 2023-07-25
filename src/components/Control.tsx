import { FC } from "react";
import "./Control.css";
import useTimer from "../customHooks/useTimer";
import ControlButtons from "./ControlButtons/ControlButtons";
import Digits from "./Digits/Digits";

const Control: FC<ReturnType<typeof useTimer> & { isControled: boolean }> = ({
  hours,
  minutes,
  seconds,
  isRunning,
  start,
  reset,
  handleChange,
  handleClick,
  handleUp,
  isControled,
  activeFieldName,
}) => (
  <>
    <div className="time">
      <Digits
        {...{
          isRunning,
          isControled,
          handleClick,
          handleUp,
          handleChange,
          activeFieldName,
          time: { type: "hours", digits: hours },
        }}
      />
      <span className="colon">:</span>
      <Digits
        {...{
          isRunning,
          isControled,
          handleClick,
          handleUp,
          handleChange,
          activeFieldName,
          time: { type: "minutes", digits: minutes },
        }}
      />
      <span className="colon">:</span>
      <Digits
        {...{
          isRunning,
          isControled,
          handleClick,
          handleUp,
          handleChange,
          activeFieldName,
          time: { type: "seconds", digits: seconds },
        }}
      />
    </div>
    <ControlButtons {...{ isRunning, start, reset }} />
  </>
);

export default Control;
