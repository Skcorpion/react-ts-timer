import Control from "../components/Control";
import useTimer from "../customHooks/useTimer";

export default function Timer() {
  return (
    <div className="timer__container">
      <Control {...useTimer(10)} isControled={true}/>
    </div>
  );
}
