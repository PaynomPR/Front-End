export const OUT_EMPLOYER_DATA = {
  last_name: "",
  mother_last_name: "",
  first_name: "",
  middle_name: "",
  email: "",
  account_number: "",
  type_entity: 0,
  gender: 1,
  birthday: null,
  fax: "",
  website: "",
  withholding: "0",
  regular_pay: 0,
  merchant_register: "",
  employer_id: "",
  bank_account: "",
  address: "",
  address_state: "",
  address_country: "",
  address_number: "",
  phone_number: "",
  smartphone_number: "",
};

export interface OUT_EMPLOYEER {
  last_name: string;
  mother_last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
  account_number: string;
  regular_pay: number;
  type_entity: number;
  gender: number;
  birthday: any;
  fax: string;
  website: string;
  withholding: string;
  merchant_register: string;
  employer_id: string;
  bank_account: string;
  address: string;
  address_state: string;
  address_country: string;
  address_number: string;
  phone_number: string;
  smartphone_number: string;
}
