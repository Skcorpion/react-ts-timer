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
  activeInputButton,
  inputHandlers,
  inputButtonHandlers,
}) => {
  const {
    handleInputChange,
    handleInputFocus,
    handleInputKeyDown,
    handleInputClick,
    handleInputKeyUp,
    handleInputBlur
  } = inputHandlers;
  const { handleInputButtonDown, handleInputButtonUp } =
    inputButtonHandlers;
  return (
    <div className="digits__wrapper">
      <button
        className={classNames("digits__btn", "up", {
          disabled: isRunning,
        })}
        onTouchStart={() => handleInputButtonDown(1, timeType)}
        onTouchEnd={handleInputButtonUp}
        onTouchCancel={handleInputButtonUp}
        onMouseDown={() => handleInputButtonDown(1, timeType)}
        onMouseUp={handleInputButtonUp}
        onMouseLeave={handleInputButtonUp}
      />
      <input
        className="digits"
        type="text"
        name={timeType}
        value={digits}
        onChange={(e) => handleInputChange(e, digits, timeType)}
        disabled={isRunning || activeInputButton}
        onFocus={handleInputFocus}
        onClick={handleInputClick}
        onKeyDown={(e) => handleInputKeyDown(e, timeType)}
        onKeyUp={handleInputKeyUp}
        onBlur={handleInputBlur}
      />
      <button
        className={classNames("digits__btn", "down", {
          disabled: isRunning,
        })}
        onTouchStart={() => handleInputButtonDown(-1, timeType)}
        onTouchEnd={handleInputButtonUp}
        onTouchCancel={handleInputButtonUp}
        onMouseDown={() => handleInputButtonDown(-1, timeType)}
        onMouseUp={handleInputButtonUp}
        onMouseLeave={handleInputButtonUp}
      />
    </div>
  );
};

export default TimerDigits;
