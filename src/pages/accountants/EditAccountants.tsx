import { useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import { editAccountants, getAccountant } from "../../utils/requestOptions";

import { showError, showSuccess } from "../../utils/functions";
import { useNavigate, useParams } from "react-router-dom";
import { ACCOUNTANTS } from "../../models/accountants";
import CustomSelect from "../../components/forms/CustomSelect";
import { COUNTRY } from "../../utils/consts";
import { PatternFormat } from "react-number-format";

const EditAccountants = () => {
  const [formData, setFormData] = useState(ACCOUNTANTS);
  const navigate = useNavigate();
  const params = useParams();

  const handleInputChange = (e: React.FormEvent<any>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]:
        e.currentTarget.type === "number"
          ? parseInt(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };

  useEffect(() => {
    getAccountant(Number(params.id))
      .then((response) => {
        setFormData(response.data.result);

        // Data retrieval and processing
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
        console.error(error);
      });
  }, []);

  const handleAddAccountant = () => {
    editAccountants(formData, Number(params.id))
      .then(() => {
        // Data retrieval and processing
        showSuccess("Creado exitosamente.");
        navigate("../contadores");
      })
      .catch((error) => {
        showError(error.response.data.detail);
      });
  };
  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Editar Contador</h3>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="xl:w-full w-full ">
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Nombre"
              name="name"
              onChange={handleInputChange}
              value={formData.name}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              name="middle_name"
              onChange={handleInputChange}
              value={formData.middle_name}
              class="w-1/4 mx-auto ps-1 pe-1  inline-block "
              label="Inicial segundo nombre"
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              name="first_last_name"
              onChange={handleInputChange}
              value={formData.first_last_name}
              class="w-1/4 mx-auto ps-1 pe-1 inline-block "
              label="Apellido paterno"
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              name="second_last_name"
              onChange={handleInputChange}
              value={formData.second_last_name}
              class="w-1/4 mx-auto ps-1 pe-1 inline-block "
              label="Apellido materno"
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              name="company"
              onChange={handleInputChange}
              value={formData.company}
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Compañía"
              placeholder=""
              type="text"
            />
            <CustomInputs
              name="employer_insurance_number"
              onChange={handleInputChange}
              value={formData.employer_insurance_number}
              class="w-1/3 mx-auto pe-1  inline-block "
              label="Numero de seguro patronal"
              placeholder=""
              type="text"
            />
            <label className=" mb-2  font-medium text-gray-700 w-1/2 mx-auto pe-1  inline-block">
              <span>Numero de teléfono</span>
              <PatternFormat
                className="bg-gray-50 text-sm invalid:border-red-500 border mt-2 w-full border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 "
                value={formData.phone}
                onChange={handleInputChange}
                name="phone"
                format="###-###-####"
              />
            </label>
            <CustomInputs
              class="w-full mx-auto pe-1  inline-block "
              label="Dirección"
              name="address"
              onChange={handleInputChange}
              value={formData.address}
              placeholder="Dirección"
              type="text"
            />
            <CustomSelect
              class="w-1/3 mx-auto  inline-block "
              label=""
              name="country"
              options={COUNTRY}
              onChange={handleInputChange}
              value={formData.country}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              name="state"
              onChange={handleInputChange}
              value={formData.state}
              placeholder="San Juan"
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto pe-1  inline-block "
              label=""
              name="zip_code"
              onChange={handleInputChange}
              value={formData.zip_code}
              placeholder="Dirección"
              type="text"
            />
            <CustomInputs
              class="w-full mx-auto pe-1  inline-block "
              label="Dirección Física"
              name="physical_address"
              onChange={handleInputChange}
              value={formData.physical_address}
              placeholder=""
              type="text"
            />
            <CustomSelect
              class="w-1/3 mx-auto  inline-block "
              label=""
              name="physical_country"
              options={COUNTRY}
              onChange={handleInputChange}
              value={formData.physical_country}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              name="physical_state"
              onChange={handleInputChange}
              value={formData.physical_state}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/3 mx-auto ps-1  inline-block "
              label=""
              name="physical_zip_code"
              onChange={handleInputChange}
              value={formData.physical_zip_code}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Correo electrónico"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Identidad de usuario SSA PTN"
              placeholder=""
              name="identidad_ssa"
              onChange={handleInputChange}
              value={formData.identidad_ssa}
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Identidad de usuario BSO. Corrección W2"
              name="identidad_bso"
              onChange={handleInputChange}
              value={formData.identidad_bso}
              placeholder=""
              type="text"
            />
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Identidad de usuario Efile PR(SS sin lineas)"
              name="identidad_efile"
              onChange={handleInputChange}
              value={formData.identidad_efile}
              placeholder=""
              type="text"
            />
          </div>
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleAddAccountant}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Guardar datos
          </button>
        </div>
      </div>
    </>
  );
};

export default EditAccountants;
