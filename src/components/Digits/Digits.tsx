import "./Digits.css";
import { FC } from "react";
import useTimer from "../../customHooks/useTimer";
import DigitsButton from "../DigitsButton/DigitsButton";

type DigitsType = Pick<
  ReturnType<typeof useTimer>,
  "isRunning" | "handleClick" | "handleUp" | "handleChange" | "activeFieldName"
> & { isControled: boolean; time: { type: string; digits: string } };

const Digits: FC<DigitsType> = ({
  isRunning,
  isControled,
  handleClick,
  handleUp,
  handleChange,
  activeFieldName,
  time,
}) => (
  <div className="digits__wrapper">
    <DigitsButton
      {...{
        isRunning,
        isControled,
        handleClick,
        handleUp,
        time,
        direction: {
          class: "up",
          incOrDec: 1,
        },
      }}
    />
    <input
      className="digits"
      type="number"
      name={time.type}
      value={time.digits}
      onChange={(e) => handleChange(e, time.digits, time.type)}
      disabled={isRunning || !isControled || activeFieldName !== null}
    />
    <DigitsButton
      {...{
        isRunning,
        isControled,
        handleClick,
        handleUp,
        time,
        direction: {
          class: "down",
          incOrDec: -1,
        },
      }}
    />
  </div>
);

export default Digits;
