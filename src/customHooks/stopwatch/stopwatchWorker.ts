const workercode = () => {
  let intervalId = 0;
  self.onmessage = function (event: MessageEvent): void {
    const { isRunning } = event.data as {
      isRunning: boolean;
    };
    if (isRunning) {
      intervalId = setInterval(() => {
        self.postMessage({ action: "TICK" });
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const stopwatchWorker = URL.createObjectURL(blob);

export default stopwatchWorker;
