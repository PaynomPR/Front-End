export const BONUS = {
  max_employers: 20,
  percent_to_max: 6,
  amount_max: 600,
  min_employers: 20,
  percent_to_min: 3,
  amount_min: 300,
  reg: true,
  over: true,
  vacations: false,
  sick: false,
};

export interface BONUS {
  max_employers: Number;
  percent_to_max: Number;
  amount_max: Number;
  min_employers: 0;
  percent_to_min: Number;
  amount_min: Number;
  reg: Boolean;
  over: Boolean;
  vacations: Boolean;
  sick: Boolean;
}
