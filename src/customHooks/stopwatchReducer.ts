export const initialStopwatchState = {
  fullTimeInSeconds: 0,
  isRunning: false,
};

export function stopwatchReducer(
  draft: typeof initialStopwatchState,
  action: { type: string }
) {
  switch (action.type) {
    case "run": {
      draft.isRunning = !draft.isRunning
      break;
    }
    case "reset": {
      draft.fullTimeInSeconds = 0;
      draft.isRunning = false;
      break;
    }
    case "increase": {
      draft.fullTimeInSeconds += 1;
      break;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
