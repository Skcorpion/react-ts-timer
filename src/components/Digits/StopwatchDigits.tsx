import "./Digits.css";
import { FC } from "react";

type StopwatchDigitsType = {
  timeType: string;
  digits: string;
};

const StopwatchDigits: FC<StopwatchDigitsType> = ({ timeType, digits }) => (
  <input className="digits" type="number" name={timeType} value={digits} disabled />
);

export default StopwatchDigits;
