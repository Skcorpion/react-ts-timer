import { FC } from 'react';
import './Control.css';
import useStopwatch from '../customHooks/useStopwatch';

const Control : FC<ReturnType<typeof useStopwatch>> = ({hours, minutes, seconds, isRunning, start, reset}) => (
  <>
    <div className="digits">
      Time: {hours}:{minutes}:{seconds}
    </div>
    <button className="control-btn" onClick={start}>
      {isRunning ? "Pause" : "Play"}
    </button>
    <button className="control-btn" onClick={reset}>
      Reset
    </button>
  </>
);

export default Control;
