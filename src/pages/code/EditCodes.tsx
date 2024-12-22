import { useEffect, useState } from "react";

import CustomInputs from "../../components/forms/CustomInputs";
import { showError, showSuccess } from "../../utils/functions";

import { useNavigate, useParams } from "react-router-dom";
import { editCode, getCode } from "../../services/code.services";
import { CODE } from "../../models/code";

const EditCodes = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [formData, setFormData] = useState(CODE);

  const handleAddCode = () => {
    editCode(formData, Number(params.id))
      .then(() => {
        // Data retrieval and processing
        showSuccess("Editado exitosamente.");
        navigate("../codigos");
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };

  useEffect(() => {
    getCode(Number(params.id))
      .then((response) => {
        setFormData(response.data.result);
        console.log(response);
        // Data retrieval and processing
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
        console.error(error);
      });
  }, []);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]:
        e.currentTarget.type === "number"
          ? parseInt(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Crear Código</h3>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <div className="xl:w-1/3 mx-auto  w-full">
            <CustomInputs
              class="w-full mx-auto  inline-block "
              label="Nombre"
              name="owner"
              onChange={handleInputChange}
              value={formData.owner}
              type="text"
            />
            <CustomInputs
              class="w-full mx-auto  inline-block "
              label="Correo electrónico"
              name="email"
              disabled={true}
              onChange={handleInputChange}
              value={formData.email}
              type="text"
            />
            <CustomInputs
              class="w-full mx-auto  inline-block "
              label="Numero de empresas"
              name="amount"
              onChange={handleInputChange}
              value={formData.amount}
              type="number"
            />

            <CustomInputs
              class="w-full pe-2 mx-auto  inline-block "
              label="Codigo"
              name="code"
              onChange={handleInputChange}
              value={formData.code}
              disabled={true}
              placeholder="00820"
              type="text"
            />
          </div>
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleAddCode}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Guardar datos
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCodes;
