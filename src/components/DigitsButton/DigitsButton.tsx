import classNames from "classnames";
import "./DigitsButton.css";
import { FC } from "react";
import useTimer from "../../customHooks/useTimer";

type DigitsButtonType = Pick<
  ReturnType<typeof useTimer>,
  "isRunning" | "handleClick" | "handleUp"
> & {
  isControled: boolean;
  time: { type: string; digits: string };
  direction: { class: string; incOrDec: 1 | -1 };
};

const DigitsButton: FC<DigitsButtonType> = ({
  isRunning,
  isControled,
  handleClick,
  time,
  handleUp,
  direction,
}) => (
  <button
    className={classNames("digits__btn", direction.class, {
      disabled: isRunning,
      inactive: !isControled,
    })}
    onTouchStart={() => handleClick(direction.incOrDec, time.type)}
    onTouchEnd={handleUp}
    onTouchCancel={handleUp}
  />
);

export default DigitsButton;
