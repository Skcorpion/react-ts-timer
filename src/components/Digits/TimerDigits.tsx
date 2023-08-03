import "./Digits.css";
import { FC } from "react";
import { UseTimerType } from "../../customHooks/timer/useTimer";
import classNames from "classnames";

type TimerDigitsType = Omit<UseTimerType, "start" | "reset" | "time"> & {
  timeType: string;
  digits: string;
};

const TimerDigits: FC<TimerDigitsType> = ({
  digits,
  timeType,
  isRunning,
  activeInputButton,
  inputHandlers,
  inputButtonHandlers,
}) => {
  const {
    handleInputChange,
  } = inputHandlers;
  const { handleInputButtonTouchDown, handleInputButtonTouchUp } =
    inputButtonHandlers;
  return (
    <div className="digits__wrapper">
      <button
        className={classNames("digits__btn", "up", {
          disabled: isRunning,
        })}
        onTouchStart={() => handleInputButtonTouchDown(1, timeType)}
        onTouchEnd={handleInputButtonTouchUp}
        onTouchCancel={handleInputButtonTouchUp}
      />
      <input
        className="digits"
        type="number"
        name={timeType}
        value={digits}
        onChange={(e) => handleInputChange(e, digits, timeType)}
        disabled={isRunning || activeInputButton}
      />
      <button
        className={classNames("digits__btn", "down", {
          disabled: isRunning,
        })}
        onTouchStart={() => handleInputButtonTouchDown(-1, timeType)}
        onTouchEnd={handleInputButtonTouchUp}
        onTouchCancel={handleInputButtonTouchUp}
      />
    </div>
  );
};

export default TimerDigits;
