import { Dispatch, SetStateAction } from "react";
import CustomInputs from "../../components/forms/CustomInputs";

import { TAXES } from "../../models/taxes";
import CustomSelect from "./CustomSelect";
import { REQUIERED, TYPE_AMOUNT, TYPE_TAXE } from "../../utils/consts";
import { NumericFormat } from "react-number-format";

type Props = {
  formData: TAXES;
  setFormData: Dispatch<SetStateAction<TAXES>>;
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
          onChange={props.onChange}
          value={props.formData.name}
          type="text"
        />
        <CustomSelect
          name="required"
          options={REQUIERED}
          onChange={props.onChange}
          value={props.formData.required}
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Requerido/Opcional"
          placeholder=""
          type="text"
        />
        <CustomSelect
          name="type_taxe"
          options={TYPE_TAXE}
          onChange={props.onChange}
          value={props.formData.type_taxe}
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Descuento/Aumento"
          placeholder=""
          type="text"
        />
        <CustomSelect
          name="type_amount"
          options={TYPE_AMOUNT}
          onChange={props.onChange}
          value={props.formData.type_amount}
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Porcentual/Fijo"
          placeholder=""
          type="text"
        />
        {props.formData.type_amount == 2 ? (
          <CustomInputs
            class="w-full mx-auto  inline-block "
            label="Monto"
            name="amount"
            onChange={props.onChange}
            value={props.formData.amount}
            type="number"
          />
        ) : (
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
        )}
      </div>
    </>
  );
};

export default TaxesForm;
