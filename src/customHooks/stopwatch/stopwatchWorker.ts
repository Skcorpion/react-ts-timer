const workercode = () => {
  self.onmessage = function (): void {
    setInterval(() => {      
      self.postMessage({ action: "TICK" });
    }, 1000);
  };
};

let code = workercode.toString();
code = code.substring(code.indexOf("{") + 1, code.lastIndexOf("}"));

const blob = new Blob([code], { type: "application/javascript" });
const stopwatchWorker = URL.createObjectURL(blob);

export default stopwatchWorker;
