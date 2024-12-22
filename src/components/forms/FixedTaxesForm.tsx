import { Dispatch, SetStateAction } from "react";
import CustomInputs from "../../components/forms/CustomInputs";

import { FIXEDTAXES } from "../../models/fixedTaxes";

import { NumericFormat } from "react-number-format";

type Props = {
  formData: FIXEDTAXES;
  setFormData: Dispatch<SetStateAction<FIXEDTAXES>>;
  onChange: (e: React.ChangeEvent<any>) => void;
};

const TaxesForm = (props: Props) => {
  return (
    <>
      <div className="xl:w-2/5 m-auto w-full">
        <CustomInputs
          class="w-full mx-auto  inline-block "
          label="Titulo"
          name="name"
          disabled = {true}          
          value={props.formData.name}
          type="text"
        />

          <NumericFormat
            name="amount"
            allowNegative={false}
            max={100}
            maxLength={6}
            onChange={props.onChange}
            value={props.formData.amount}
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            suffix={"%"}
          />

        <CustomInputs
            class="w-full mx-auto  inline-block "
            label="Limite"
            name="limit"
            onChange={props.onChange}
            value={props.formData.limit}
            type="number"
          />
      </div>
    </>
  );
};

export default TaxesForm;
