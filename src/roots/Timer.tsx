import Control from "../components/Control";
import { useTimerContext } from "./Root";

export default function Timer() {
  const { timer } = useTimerContext();
  return (
    <div className="timer__container">
      <Control {...timer} isControled={true} />
    </div>
  );
}
