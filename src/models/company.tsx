export const COMPANY_DATA = {
  name: "",
  commercial_register: "",
  jurisdiction: "",
  accountant_id: 1,
  email: "",
  contact: "",
  contact_number: "",
  website: "",
  postal_address: "",
  zipcode_postal_address: "",
  number_patronal: "",
  w2_first_control: "",
  w2_last_control: "",
  sp_first_control: "",
  sp_last_control: "",
  date_close: null,
  coml: null,
  special_contribution: "1.00%",
  country_postal_address: "",
  state_postal_addess: "",
  physical_address: "",
  zipcode_physical_address: "",
  country_physical_address: "",
  state_physical_address: "",
  phone_number: "",
  fax_number: "",
  industrial_code: "",
  payer: "",
  desem: "",
  disabled_percent: "0",
  vacation_hours: 0,
  choferil_number: "000000000000",
  vacation_date: 0,
  sicks_hours: 0,
  sicks_date: 0,
  unemployment_percentage: "",
  employed_contribution: "0.50",
  polize_number: "",
  driver_code: "0.30",
  driver_rate: ".80",
};

export interface COMPANY {
  name: string;
  commercial_register: string;
  jurisdiction: string;
  accountant_id: number;
  email: string;
  vacation_hours: number;
  vacation_date: number;
  sicks_hours: number;
  sicks_date: number;
  choferil_number: string;
  w2_first_control: string;
  w2_last_control: string;
  sp_first_control: string;
  sp_last_control: string;
  special_contribution: string;
  number_patronal: string;
  coml: any;
  date_close: any;
  contact: string;
  contact_number: string;
  website: string;
  postal_address: string;
  zipcode_postal_address: string;
  country_postal_address: string;
  state_postal_addess: string;
  physical_address: string;
  zipcode_physical_address: string;
  country_physical_address: string;
  state_physical_address: string;
  phone_number: string;
  fax_number: string;
  industrial_code: string;
  payer: string;
  desem: string;
  disabled_percent: string;
  unemployment_percentage: string;
  polize_number: string;
  employed_contribution: string;
  driver_code: string;
  driver_rate: string;
}
