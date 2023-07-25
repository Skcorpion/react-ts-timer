import "./Digits.css";
import { FC } from "react";
import { UseTimerType } from "../../customHooks/useTimer";
import classNames from "classnames";

type TimerDigitsType = Omit<UseTimerType, "start" | "reset" | "time"> & {
  timeType: string;
  digits: string;
};

const TimerDigits: FC<TimerDigitsType> = ({
  digits,
  timeType,
  isRunning,
  activeFieldName,
  handleChange,
  handleClick,
  handleUp,
}) => (
  <div className="digits__wrapper">
    <button
      className={classNames("digits__btn", "up", {
        disabled: isRunning,
      })}
      onTouchStart={() => handleClick(1, timeType)}
      onTouchEnd={handleUp}
      onTouchCancel={handleUp}
    />
    <input
      className="digits"
      type="number"
      name={timeType}
      value={digits}
      onChange={(e) => handleChange(e, digits, timeType)}
      disabled={isRunning || activeFieldName !== null}
    />
    <button
      className={classNames("digits__btn", "down", {
        disabled: isRunning,
      })}
      onTouchStart={() => handleClick(-1, timeType)}
      onTouchEnd={handleUp}
      onTouchCancel={handleUp}
    />
  </div>
);

export default TimerDigits;
