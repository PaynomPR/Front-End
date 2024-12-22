import { TIME, TIME_DATA } from "./time";

export const PERIOD_DATA = {
  id: 0,

  times: [TIME_DATA],

  period_end: "2024-05-05",
  period_number: 18,
  period_start: "2024-04-29",
};

export interface PERIOD {
  id: number;

  times: [TIME];
  period_end: string;
  period_number: number;
  period_start: string;
}
