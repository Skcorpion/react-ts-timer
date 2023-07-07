import { NumberTime, StringTime } from "./timeTypes";

export default class Time {
  static getTimeFromSeconds(totalSeconds: number) {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = totalSeconds % 60;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return Time.timeISO({ seconds, minutes, hours });
  }

  static timeISO(timeObj: NumberTime) {
    const stringTimeObj: StringTime = { seconds: "", minutes: "", hours: "" };

    for (const [key, value] of Object.entries(timeObj)) {
      value < 10
        ? (stringTimeObj[key as keyof NumberTime] = `0${value}`)
        : (stringTimeObj[key as keyof NumberTime] = `${value}`);
    }

    return stringTimeObj;
  }
}
