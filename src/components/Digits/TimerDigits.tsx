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
  inputHandlers,
  inputButtonHandlers,
}) => {
  const { handleInputChange } = inputHandlers;
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
        disabled={isRunning || activeFieldName !== null}
        //onFocus={handleFocus}
        //onTouchStart={handleFocus}
        //onMouseDown={handleFocus}
        //onKeyDown={handleKeys}
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
