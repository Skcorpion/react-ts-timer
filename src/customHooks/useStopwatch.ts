import { useEffect } from "react";
import { useImmerReducer } from "use-immer";
import Time from "../utils/Time";
import { initialStopwatchState, stopwatchReducer } from "./stopwatchReducer";

export type UseStopwatchType = ReturnType<typeof useStopwatch>;

export default function useStopwatch() {
  const [state, dispatch] = useImmerReducer(
    stopwatchReducer,
    initialStopwatchState
  );
  const { fullTimeInSeconds, isRunning } = state;

  useEffect(() => {
    let timerInterval = 0;
    if (isRunning) {
      timerInterval = window.setInterval(() => {
        if (isRunning) {
          dispatch({ type: "increase" });
        }
      }, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isRunning]);

  function start() {
    dispatch({ type: "run" });
  }

  function reset() {
    dispatch({ type: "reset" });
  }

  return {
    time: { ...Time.getTimeFromSeconds(fullTimeInSeconds), fullTimeInSeconds },
    isRunning,
    start,
    reset,
  };
}
