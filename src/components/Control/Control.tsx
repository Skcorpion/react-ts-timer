import { FC, ReactNode } from "react";
import "./Control.css";

type ControlType = {
  hours: ReactNode;
  minutes: ReactNode;
  seconds: ReactNode;
};

const Control: FC<ControlType> = ({ hours, minutes, seconds }) => (
  <div className="time">
    {hours}
    <span className="colon">:</span>
    {minutes}
    <span className="colon">:</span>
    {seconds}
  </div>
);

export default Control;
