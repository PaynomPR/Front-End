export const PAYMENT_DATA = {
  id: 0,
  name: "",
  amount: 0,
  required: 0,
  type_taxe: 0,
  is_active: false,
  value: 0,
  type_amount: 0,
};

export interface PAYMENT {
  id: number;
  name: string;
  amount: number;
  value: number;
  required: number;
  is_active: boolean;

  type_taxe: number;
  type_amount: number;
}
