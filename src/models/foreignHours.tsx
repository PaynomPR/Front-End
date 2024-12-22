export const FOREIGN_DATA = {
  id: 0,
  paid: 0,
  regular_hours: "00",
  regular_min: "00",
  detained: 0,
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
  created_at: Date;
}
