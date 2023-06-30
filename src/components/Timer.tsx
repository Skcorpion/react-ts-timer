import useTimer from "./useTimer";


export default function Timer() {

  const {seconds, minutes, hours, start, reset, isRunning} = useTimer();  

  return <>
    <div className="digits">
        Time: {hours}:{minutes}:{seconds}
    </div>
    <button className="control-btn" onClick={start}>{isRunning ? 'Pause': 'Play'}</button>
    <button className="control-btn" onClick={reset}>Reset</button>
  </>
}