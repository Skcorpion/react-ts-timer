import { useEffect, useRef } from "react";
import { useImmerReducer } from "use-immer";
import Time from "../../utils/Time";
import { initialStopwatchState, stopwatchReducer } from "./stopwatchReducer";
import stopwatchWorker from "./stopwatchWorker";

export type UseStopwatchType = ReturnType<typeof useStopwatch>;

export default function useStopwatch() {
  const [state, dispatch] = useImmerReducer(
    stopwatchReducer,
    initialStopwatchState
  );
  const { fullTimeInSeconds, isRunning } = state;
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(stopwatchWorker);

    workerRef.current.onmessage = (event) => {
      const { action } = event.data;

      switch (action) {
        case "TICK":
          dispatch({ type: "increase" });
          break;
        default:
          break;
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [isRunning]);

  useEffect(() => {
    if (isRunning) {
      workerRef.current?.postMessage({});
    }
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
