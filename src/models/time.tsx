import { PAYMENT_DATA, PAYMENT } from "../models/payment";
export const TIME_DATA = {
  id: 0,
  period: 0,
  regular_time: "00:00",

  over_time: "00:00",

  meal_time: "00:00",
  memo: "",
  tips: 0,
  salary: 0,
  medical_insurance : 0,
  others: 0,
  bonus: 0,
  accountant_id: 0,
  refund: 0,
  asume: 0,
  aflac: 0,
  donation: 0,
  vacation_acum_hours: "00:00",
  sicks_acum_hours: "00:00",

  regular_pay: 0,
  created_at: new Date(),
  pay_date: new Date(),
  payment: [PAYMENT_DATA],
  vacation_time: "00:00",
  period_id: 1,
  holiday_time: "00:00",

  inability: 0,
  medicare: 0,
  choferil: 0,
  secure_social: 0,
  social_tips: 0,
  tax_pr: 0,
  regular_amount: 0,
  over_amount: 0,
  meal_amount: 0,
  commissions: 0,
  concessions: 0,
  sick_time: "00:00",
  tax_pr_percent : 0,
  holyday_pay: 0,
  vacation_pay: 0,
  sick_pay: 0,
  meal_time_pay: 0,
  overtime_pay: 0,
};

export interface TIME {
  id: number;
  period: number;
  tips: number;
  accountant_id: number;
  period_id: number;
  inability: number;
  choferil: number;
  medical_insurance : number;
  salary: number;
  others: number;
  bonus: number;
  regular_amount: number;
  over_amount: number;
  meal_amount: number;
  refund: number;
  asume: number;
  aflac: number;
  donation: number;
  medicare: number;
  secure_social: number;
  social_tips: number;
  tax_pr: number;
  regular_pay: number;
  vacation_pay: number;
  meal_time_pay: number;
  holyday_pay: number;
  overtime_pay: number;
  commissions: number;
  concessions: number;
  sick_pay: number;
  created_at: Date;
  pay_date: Date;
  tax_pr_percent: number;
  payment: [PAYMENT];
  regular_time: string;
  memo: string;
  vacation_acum_hours: string;
  sicks_acum_hours: string;
  over_time: string;
  holiday_time: string;

  meal_time: string;

  vacation_time: string;
  sick_time: string;
}
