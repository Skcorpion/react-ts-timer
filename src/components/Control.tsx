import { FC } from "react";
import "./Control.css";
import useTimer from "../customHooks/useTimer";
import classNames from "classnames";

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
}) => (
  <>
    <div className="time">
      <div className="digits__wrapper">
        <button
          className={classNames("digits__btn", "up", {
            disabled: isRunning,
            inactive: !isControled,
          })}
          onTouchStart={() => handleClick(1, "hours")}
          onTouchEnd={handleUp}
          onTouchCancel={handleUp}
        />
        <input
          className="digits"
          type="number"
          name="hours"
          value={hours}
          onChange={(e) => handleChange(e, hours, "hours")}
          disabled={isRunning || !isControled}
        />
        <button
          className={classNames("digits__btn", "down", {
            disabled: isRunning,
            inactive: !isControled,
          })}
          onTouchStart={() => handleClick(-1, "hours")}
          onTouchEnd={handleUp}
          onTouchCancel={handleUp}
        />
      </div>
      <span className="colon">:</span>
      <div className="digits__wrapper">
        <button
          className={classNames("digits__btn", "up", {
            disabled: isRunning,
            inactive: !isControled,
          })}
          onTouchStart={() => handleClick(1, "minutes")}
          onTouchEnd={handleUp}
          onTouchCancel={handleUp}
        />
        <input
          className="digits"
          type="number"
          name="minutes"
          value={minutes}
          onChange={(e) => handleChange(e, minutes, "minutes")}
          disabled={isRunning || !isControled}
        />
        <button
          className={classNames("digits__btn", "down", {
            disabled: isRunning,
            inactive: !isControled,
          })}
          onTouchStart={() => handleClick(-1, "minutes")}
          onTouchEnd={handleUp}
          onTouchCancel={handleUp}
        />
      </div>
      <span className="colon">:</span>
      <div className="digits__wrapper">
        <button
          className={classNames("digits__btn", "up", {
            disabled: isRunning,
            inactive: !isControled,
          })}
          onTouchStart={() => handleClick(1, "seconds")}
          onTouchEnd={handleUp}
          onTouchCancel={handleUp}
        />
        <input
          className="digits"
          type="number"
          name="seconds"
          value={seconds}
          onChange={(e) => handleChange(e, seconds, "seconds")}
          disabled={isRunning || !isControled}
        />
        <button
          className={classNames("digits__btn", "down", {
            disabled: isRunning,
            inactive: !isControled,
          })}
          onTouchStart={() => handleClick(-1, "seconds")}
          onTouchEnd={handleUp}
          onTouchCancel={handleUp}
        />
      </div>
    </div>
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
  </>
);

export default Control;
