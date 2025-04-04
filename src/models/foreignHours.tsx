export const FOREIGN_DATA = {
  id: 0,
  paid: 0,
  regular_hours: "00",
  regular_min: "00",
  detained: 0,
  year: 2025,
  pay_date: "", // Changed to string, will store YYYY-MM-DD
  regular_pay: 0,
  created_at: new Date(),
};

export interface FOREIGN_DATE {
  id: number;
  paid: number;
  regular_hours: string;
  regular_min: string;
  detained: number;
  regular_pay: number;
  year: number;
  created_at: Date;
  pay_date: string;

}
