import Control from "../components/Control";
import { useTimerContext } from "./Root";

export default function Stopwatch() {
  const { stopWatch } = useTimerContext();
  return (
    <div className="stopwatch__container">
      <Control {...stopWatch} isControled={false} />
    </div>
  );
}
