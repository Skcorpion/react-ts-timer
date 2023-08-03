import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import useTimer, { UseTimerType } from "../customHooks/timer/useTimer";
import useStopwatch, { UseStopwatchType } from "../customHooks/useStopwatch";

type ContextType = {
  timer: UseTimerType;
  stopWatch: UseStopwatchType;
};

function Root() {
  const timer = { ...useTimer(1) };
  const stopWatch = { ...useStopwatch() };

  return (
    <>
      <h1>Hi ᓚᘏᗢ</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="stopwatch">
              StopWatch
              <span>
                {stopWatch.time.hours}:{stopWatch.time.minutes}:
                {stopWatch.time.seconds}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="timer">
              Timer
              <span>
                {timer.time.hours}:{timer.time.minutes}:{timer.time.seconds}
              </span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Outlet
        context={
          {
            timer,
            stopWatch,
          } satisfies ContextType
        }
      />
    </>
  );
}

export default Root;

export function useTimerContext() {
  return useOutletContext<ContextType>();
}
