export const TAXES_DATA = {
  id: 0,
  name: "",
  amount: 0,
  value: 0,
  required: 0,
  type_taxe: 0,
  is_active: false,
  edited: false,
  type_amount: 0,
};

export interface TAXES {
  id: number;
  name: string;
  amount: number;
  value: number;
  is_active: boolean;
  required: number;
  type_taxe: number;
  edited: boolean;
  type_amount: number;
}
