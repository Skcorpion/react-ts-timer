import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import useTimer from "../customHooks/useTimer";
import useStopwatch from "../customHooks/useStopwatch";

type ContextType = {
  timer: ReturnType<typeof useTimer>;
  stopWatch: ReturnType<typeof useStopwatch>;
};

function Root() {
  const timer = { ...useTimer(11) };
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
                {stopWatch.hours}:{stopWatch.minutes}:{stopWatch.seconds}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to="timer">
              Timer
              <span>
                {timer.hours}:{timer.minutes}:{timer.seconds}
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
