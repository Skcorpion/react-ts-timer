export type NumberTime = {
  seconds: number;
  minutes: number;
  hours: number;
};

export type StringTime = {
  [Property in keyof NumberTime]: string;
};