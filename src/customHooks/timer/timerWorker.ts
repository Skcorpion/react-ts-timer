const workercode = () => {
  self.onmessage = function (event: MessageEvent): void {
    const { fullTimeInSeconds } = event.data as {
      fullTimeInSeconds: number;
    };

    if (fullTimeInSeconds > 0) {
      setTimeout(() => {
        self.postMessage({ action: "TICK" });
      }, 1000);
    } else {
      self.postMessage({ action: "TIMER_ENDED"});
    }
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const timerWorker = URL.createObjectURL(blob);

export default timerWorker;
