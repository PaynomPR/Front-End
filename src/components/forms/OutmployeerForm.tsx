import { Dispatch, SetStateAction } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";
import { COUNTRY, GENDER, ENTITY } from "../../utils/consts";
import { NumericFormat, PatternFormat } from "react-number-format";
import { OUT_EMPLOYEER } from "../../models/outEmployers";

type Props = {
  formData: OUT_EMPLOYEER;
  setFormData: Dispatch<SetStateAction<OUT_EMPLOYEER>>;
  onChange: (e: React.ChangeEvent<any>) => void;
};

const OutEmployeerForm = (props: Props) => {
  return (
    <>
      <div className="xl:w-1/2 w-full ">
        <CustomInputs
          class="w-1/2 mx-auto pe-1  inline-block "
          label="Apellido paterno"
          name="last_name"
          onChange={props.onChange}
          value={props.formData.last_name}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/2 mx-auto ps-1  inline-block "
          label="Apellido materno"
          name="mother_last_name"
          onChange={props.onChange}
          value={props.formData.mother_last_name}
          type="text"
        />
        <CustomInputs
          class="w-1/2 mx-auto pe-1  inline-block "
          label="Nombre"
          name="first_name"
          onChange={props.onChange}
          value={props.formData.first_name}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/2 mx-auto ps-1  inline-block "
          label="Inicial de segundo nombre"
          name="middle_name"
          onChange={props.onChange}
          value={props.formData.middle_name}
          type="text"
        />
        <CustomInputs
          class="w-full mx-auto pe-1  inline-block "
          label="Dirección"
          name="address"
          onChange={props.onChange}
          value={props.formData.address}
          placeholder=""
          type="text"
        />
        <CustomSelect
          class="w-1/3 mx-auto pe-1  inline-block "
          label=""
          name="address_country"
          options={COUNTRY}
          onChange={props.onChange}
          value={props.formData.address_country}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label=""
          name="address_state"
          onChange={props.onChange}
          value={props.formData.address_state}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label=""
          name="address_number"
          onChange={props.onChange}
          value={props.formData.address_number}
          placeholder=""
          type="text"
        />
        <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block">
          <span>Numero de teléfono</span>
          <PatternFormat
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            value={props.formData.phone_number}
            name="phone_number"
            onChange={props.onChange}
            format="###-###-####"
          />
        </label>

        <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block">
          <span>Numero de teléfono celular</span>
          <PatternFormat
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            name="smartphone_number"
            onChange={props.onChange}
            value={props.formData.smartphone_number}
            format="###-###-####"
          />
        </label>
      </div>
      <div className="xl:w-1/2 w-full">
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Website"
          name="website"
          onChange={props.onChange}
          value={props.formData.website}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Email"
          name="email"
          onChange={props.onChange}
          value={props.formData.email}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Numero cuenta IRA"
          name="account_number"
          onChange={props.onChange}
          value={props.formData.account_number}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Cuenta bancaria"
          name="bank_account"
          onChange={props.onChange}
          value={props.formData.bank_account}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Regular Pay"
          name="regular_pay"
          onChange={props.onChange}
          value={props.formData.regular_pay}
          placeholder=""
          type="text"
        />

        <label className="block mb-2  font-medium text-gray-700 w-1/3 mx-auto ps-1  inline-block">
          <span>Registro Comerciante</span>
          <PatternFormat
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            onChange={props.onChange}
            value={props.formData.merchant_register}
            name="merchant_register"
            format="#######-####"
          />
        </label>

        <CustomSelect
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Tipo de Entidad"
          name="type_entity"
          options={ENTITY}
          onChange={props.onChange}
          value={props.formData.type_entity}
          placeholder=""
          type="text"
        />
        {props.formData.type_entity != 1 ? (
          <label className=" mb-2  font-medium text-gray-700 w-1/3 mx-auto ps-1  inline-block">
            <span>#SS O #PATRONAL</span>
            <PatternFormat
              name="employer_id"
              value={props.formData.employer_id}
              onChange={props.onChange}
              className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
              format="##-#######"
            />
          </label>
        ) : (
          <label className=" mb-2  font-medium text-gray-700 w-1/3 mx-auto ps-1  inline-block">
            <span>#SS O #PATRONAL</span>
            <PatternFormat
              name="employer_id"
              value={props.formData.employer_id}
              onChange={props.onChange}
              className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
              format="###-##-####"
            />
          </label>
        )}

        <label className=" mb-2  font-medium text-gray-700 w-1/3 xl:w-1/3 mx-auto pe-1  inline-block">
          <span>% de Retención</span>

          <NumericFormat
            name="withholding"
            allowNegative={false}
            max={100}
            maxLength={6}
            onChange={props.onChange}
            value={props.formData.withholding}
            className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
            suffix={"%"}
          />
        </label>
        <CustomSelect
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Género"
          name="gender"
          options={GENDER}
          onChange={props.onChange}
          value={props.formData.gender}
          placeholder=""
          type="text"
        />
        <CustomInputs
          class="w-1/3 mx-auto pe-1  inline-block "
          label="Fecha de nacimiento"
          name="birthday"
          onChange={props.onChange}
          value={props.formData.birthday}
          placeholder=""
          type="date"
        />
      </div>
    </>
  );
};

export default OutEmployeerForm;
