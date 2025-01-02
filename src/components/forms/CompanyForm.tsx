import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import CustomSelect from "../../components/forms/CustomSelect";
import { COMPANY } from "../../models/company";
import { COUNTRY, JURISDICTION, PAYER } from "../../utils/consts";
import { NumericFormat, PatternFormat } from "react-number-format";

type Props = {
  formData: COMPANY;
  setFormData: Dispatch<SetStateAction<COMPANY>>;
  onChange: (e: React.ChangeEvent<any>) => void;
  errors: Record<string, string>;
};

const CompanyForm = (props: Props) => {
  const [sameAddress, setSameAddress] = useState(false);
  useEffect(() => {
    if (sameAddress)
      props.setFormData({
        ...props.formData,
        physical_address: sameAddress ? props.formData.postal_address : "",
        country_physical_address: sameAddress
          ? props.formData.country_postal_address
          : "",
        state_physical_address: sameAddress
          ? props.formData.state_postal_addess
          : "",
        zipcode_physical_address: sameAddress
          ? props.formData.zipcode_postal_address
          : "",
      });
  }, [sameAddress]);
  return (
    <>
      <div className="flex w-full xl:flex-col flex-col gap-4 ">
        <div className="flex w-full xl:flex-row flex-col gap-4 block">
          <div className="xl:w-1/2  w-full">
            <CustomInputs
              name="postal_address"
              onChange={props.onChange}
              value={props.formData.postal_address}
              class="w-full mx-auto  inline-block "
              label="Dirección postal *"
              error={props.errors.postal_address}  // Pass the error for this field
              placeholder="Dirección"
              type="text"
            />
            <CustomSelect
              name="country_postal_address"
              onChange={props.onChange}
              options={COUNTRY}
              value={props.formData.country_postal_address}
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              error={props.errors.country_postal_address}  // Pass the error for this field

              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              name="state_postal_addess"
              onChange={props.onChange}
              value={props.formData.state_postal_addess}
              error={props.errors.state_postal_addess}  // Pass the error for this field

              class="w-1/3 mx-auto ps-1 pe-1  inline-block "
              label=""
              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              name="zipcode_postal_address"
              onChange={props.onChange}
              value={props.formData.zipcode_postal_address}
              error={props.errors.zipcode_postal_address}  // Pass the error for this field

              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              placeholder="00820"
              type="text"
            />
            <label>
              <input
                type="checkbox"
                checked={sameAddress}
                onChange={() => setSameAddress(!sameAddress)}
              />{" "}
              Usar misma dirección Postal para la Física
            </label>

            <CustomInputs
              name="physical_address"
              onChange={props.onChange}
              value={props.formData.physical_address}
              class="w-full mx-auto  inline-block "
              label="Dirección física *"
              error={props.errors.physical_address}  // Pass the error for this field

              placeholder="404 Calle Ensada"
              type="text"
            />
            <CustomSelect
              name="country_physical_address"
              options={COUNTRY}
              onChange={props.onChange}
              error={props.errors.country_physical_address}  // Pass the error for this field

              value={props.formData.country_physical_address}
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              name="state_physical_address"
              onChange={props.onChange}
              value={props.formData.state_physical_address}
              class="w-1/3 mx-auto ps-1 pe-1  inline-block "
              label=""
              error={props.errors.state_physical_address}  // Pass the error for this field

              placeholder="Puerto Rico"
              type="text"
            />
            <CustomInputs
              name="zipcode_physical_address"
              onChange={props.onChange}
              value={props.formData.zipcode_physical_address}
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              error={props.errors.zipcode_physical_address}  // Pass the error for this field

              placeholder="00820"
              type="text"
            />

            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block">
              <span>Numero de teléfono *</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                value={props.formData.phone_number}
                
                onChange={props.onChange}
                name="phone_number"
                format="###-###-####"
              />
               {props.errors.phone_number && <span className="text-red-500 text-xs mt-1">{props.errors.phone_number}</span>} {/* Display error */}
              
            </label>

            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto ps-1  inline-block">
              <span>Fax</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                value={props.formData.fax_number}
                onChange={props.onChange}
                name="fax_number"
                format="###-###-####"
              />
              
            </label>
            <CustomInputs
              name="desem"
              onChange={props.onChange}
              value={props.formData.desem}
              class="w-1/2 mx-auto pe-1 inline-block "
              label="NUM DE DESEMPLEO/INCAPACIDAD *"
              error={props.errors.desem}  // Pass the error for this field

              placeholder="Puerto Rico"
              type="text"
            />

            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto ps-1  inline-block">
              <span>Número patronal *</span>
              <PatternFormat
                name="number_patronal"
                value={props.formData.number_patronal}
                onChange={props.onChange}
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                format="##-#######"
              />
               {props.errors.number_patronal && <span className="text-red-500 text-xs mt-1">{props.errors.number_patronal}</span>} {/* Display error */}

            </label>

            <label className=" mb-2  font-medium text-gray-700 w-1/3 mx-auto ps-1  inline-block">
              <span>% DE Desempleo *</span>
              <NumericFormat
                name="unemployment_percentage"
                allowNegative={false}
                max={100}
                maxLength={6}
                onChange={props.onChange}
                value={props.formData.unemployment_percentage}
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                suffix={"%"}
              />
               {props.errors.unemployment_percentage && <span className="text-red-500 text-xs mt-1">{props.errors.unemployment_percentage}</span>} {/* Display error */}

            </label>
            <label className=" mb-2  font-medium text-gray-700 w-1/3 mx-auto ps-1  inline-block">
              <span>% DE Incapacitados *</span>
              <NumericFormat
                name="disabled_percent"
                allowNegative={false}
                max={100}
                maxLength={6}
                onChange={props.onChange}
                value={props.formData.disabled_percent}
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                suffix={"%"}
              />
               {props.errors.disabled_percent && <span className="text-red-500 text-xs mt-1">{props.errors.disabled_percent}</span>} {/* Display error */}

            </label>

            <label className="block mb-2  font-medium text-gray-700 w-1/3 mx-auto ps-1  inline-block">
              <span>Registro Comerciante *</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                onChange={props.onChange}
                value={props.formData.commercial_register}
                name="commercial_register"
                format="#######-####"
              />
               {props.errors.commercial_register && <span className="text-red-500 text-xs mt-1">{props.errors.commercial_register}</span>} {/* Display error */}

            </label>
            <CustomInputs
              class="w-1/3 mx-auto  pe-1  inline-block "
              name="driver_code"
              onChange={props.onChange}
              value={props.formData.driver_code}
              label="Aportación Patronal *"
              error={props.errors.driver_code}  // Pass the error for this field

              placeholder=""
              type="text"
            />

            <CustomInputs
              name="driver_rate"
              onChange={props.onChange}
              value={props.formData.driver_rate}
              class="w-1/3 mx-auto ps-1  inline-block "
              label="Rate Choferil *"
              error={props.errors.driver_rate}  // Pass the error for this field

              placeholder="00820"
              type="text"
            />

            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              name="employed_contribution"
              onChange={props.onChange}
              value={props.formData.employed_contribution}
              label="Aportación Empleado *"
              error={props.errors.employed_contribution}  // Pass the error for this field

              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              name="special_contribution"
              onChange={props.onChange}
              value={props.formData.special_contribution}
              error={props.errors.special_contribution}  // Pass the error for this field

              label="Contribución Especial *"
              placeholder=""
              type="text"
            />
            <CustomInputs
              name="choferil_number"
              onChange={props.onChange}
              value={props.formData.choferil_number}
              error={props.errors.choferil_number}  // Pass the error for this field

              class="w-1/3 mx-auto pe-1  inline-block "
              label="# Choferil *"
              placeholder=""
              type="text"
            />
          </div>
          <div className="xl:w-1/2  w-full">
            <CustomInputs
              name="contact"
              onChange={props.onChange}
              value={props.formData.contact}
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Persona de Contacto *"
              placeholder=""
              error={props.errors.contact}  // Pass the error for this field

              type="text"
            />

            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto ps-1  inline-block">
              <span>Numero de teléfono *</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                value={props.formData.contact_number}
                onChange={props.onChange}
                
                name="contact_number"
                format="###-###-####"
              />
               {props.errors.contact_number && <span className="text-red-500 text-xs mt-1">{props.errors.contact_number}</span>} {/* Display error */}

            </label>
            <CustomInputs
              name="website"
              onChange={props.onChange}
              value={props.formData.website}
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Sitio web"
              placeholder="www.web.com"
              type="text"
            />
            <CustomInputs
              name="email"
              onChange={props.onChange}
              value={props.formData.email}
              error={props.errors.email}  // Pass the error for this field

              class="w-1/2 mx-auto ps-1  inline-block "
              label="Correo electrónico *"
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Fecha de inicio *"
              onChange={props.onChange}
              error={props.errors.coml}  // Pass the error for this field

              value={props.formData.coml}
              name="coml"
              type="date"
            />
            <CustomInputs
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Fecha de cierre *"
              onChange={props.onChange}
              value={props.formData.date_close}
              name="date_close"
              type="date"
            />

            <CustomSelect
              name="jurisdiction"
              onChange={props.onChange}
              value={props.formData.jurisdiction}
              class="w-1/2 mx-auto ps-1  inline-block "
              options={JURISDICTION}
              label="Jurisdicción *"
              placeholder=""
              type="text"
            />
            
            <CustomSelect
              name="payer"
              options={PAYER}
              onChange={props.onChange}
              value={props.formData.payer}
              error={props.errors.payer}  // Pass the error for this field

              class="w-1/2 mx-auto pe-1  inline-block "
              label="Pagador *"
              placeholder=""
              type="text"
            />

            <CustomInputs
              name="industrial_code"
              onChange={props.onChange}
              error={props.errors.industrial_code}  // Pass the error for this field

              value={props.formData.industrial_code}
              class="w-1/2 mx-auto pe-1  inline-block "
              label="Código Industrial *"
              placeholder=""
              type="text"
            />
            <CustomInputs
              name="polize_number"
              onChange={props.onChange}
              error={props.errors.polize_number}  // Pass the error for this field

              value={props.formData.polize_number}
              class="w-1/2 mx-auto inline-block "
              label="Numero de póliza de fondo *"
              placeholder="00820"
              type="text"
            />
            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block">
              <span>W-2 PRIMER # CONTROL *</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                value={props.formData.w2_first_control}
                onChange={props.onChange}
                name="w2_first_control"
                format="#########"
              />
               {props.errors.w2_first_control && <span className="text-red-500 text-xs mt-1">{props.errors.w2_first_control}</span>} {/* Display error */}

            </label>
            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto ps-1  inline-block">
              <span>W-2 ULTIMO # CONTROL *</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                value={props.formData.w2_last_control}
                onChange={props.onChange}
                name="w2_last_control"
                format="#########"
              />
               {props.errors.w2_last_control && <span className="text-red-500 text-xs mt-1">{props.errors.w2_last_control}</span>} {/* Display error */}

            </label>
            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block">
              <span>480.6 SP PRIMER #CONTROL *</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                value={props.formData.sp_first_control}
                onChange={props.onChange}
                name="sp_first_control"
                format="#########"
              />
               {props.errors.sp_first_control && <span className="text-red-500 text-xs mt-1">{props.errors.sp_first_control}</span>} {/* Display error */}

            </label>
            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto ps-1  inline-block">
              <span>480.6 SP ULTIMO #CONTROL *</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                value={props.formData.sp_last_control}
                onChange={props.onChange}
                name="sp_last_control"
                format="#########"
              />
               {props.errors.sp_last_control && <span className="text-red-500 text-xs mt-1">{props.errors.sp_last_control}</span>} {/* Display error */}
            </label>
          </div>
        </div>
        <div className="xl:w-full block  w-full">
          <CustomInputs
            class="xl:w-2/3 w-1/2 mx-auto pe-1  inline-block xl:inline-flex  justify-between items-center   "
            label="Las vacaciones se acumularan razon de"
            name="vacation_hours"
            error={props.errors.vacation_hours}  // Pass the error for this field

            inputCss="xl:inline-block xl:w-1/3  mt-0 "
            onChange={props.onChange}
            value={props.formData.vacation_hours}
            placeholder=""
            type="number"
          />

          <CustomInputs
            class="xl:w-1/3 w-1/2 mx-auto ps-2  inline-block xl:inline-flex  justify-between items-center  "
            label="Horas X Mes X"
            inputCss="xl:inline-block xl:w-1/3  mt-0"
            name="vacation_date"
            error={props.errors.vacation_date}  // Pass the error for this field

            onChange={props.onChange}
            value={props.formData.vacation_date}
            placeholder=""
            type="number"
          />

          <CustomInputs
            class="xl:w-2/3 w-1/2 mx-auto   inline-block xl:inline-flex  justify-between items-center   "
            label="Las enfermedades se acumularan razon de"
            placeholder=""
            inputCss="xl:inline-block xl:w-1/3  mt-0"
            onChange={props.onChange}
            error={props.errors.sicks_hours}  // Pass the error for this field

            value={props.formData.sicks_hours}
            name="sicks_hours"
            type="number"
          />
          <CustomInputs
            class="xl:w-1/3 w-1/2 mx-auto   ps-2 inline-block xl:inline-flex  justify-between items-center  "
            label="Horas X Mes X"
            error={props.errors.sicks_date}  // Pass the error for this field

            value={props.formData.sicks_date}
            name="sicks_date"
            inputCss="xl:inline-block xl:w-1/3  mt-0"
            onChange={props.onChange}
            placeholder=""
            type="number"
          />
        </div>
      </div>
    </>
  );
};

export default CompanyForm;
