import { useState } from "react";

import CustomInputs from "../../components/forms/CustomInputs";
import { makeid, showSuccess } from "../../utils/functions";

import { useNavigate } from "react-router-dom";
import { setCode } from "../../services/code.services";
import { CODE } from "../../models/code";

const AddCode = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(CODE);

  const handleAddCode = () => {
    setCode(formData)
      .then(() => {
        // Data retrieval and processing
        showSuccess("Editado exitosamente.");
        navigate("../codigos");
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]:
        e.currentTarget.type === "number"
          ? parseInt(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };
  const handleCode = () => {
    setFormData({
      code: makeid(6),
      amount: formData.amount,
      owner: formData.owner,
      email: formData.email,
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
              class="w-1/2 pe-2 mx-auto  inline-block "
              label="Codigo"
              name="code"
              onChange={handleInputChange}
              value={formData.code}
              disabled={true}
              placeholder="00820"
              type="text"
            />
            <div className="ps-2 w-1/2  inline-block">
              <button
                onClick={handleCode}
                className=" w-full  bg-[#333160] py-3  text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
              >
                Generar Código
              </button>
            </div>
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

export default AddCode;
