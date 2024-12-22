import { useState } from "react";

import { setFixedTaxe } from "../../utils/requestOptions";
import { showError, showSuccess } from "../../utils/functions";
import { useNavigate } from "react-router-dom";

import  TaxesForm  from "../../components/forms/FixedTaxesForm";
import { FIXEDTAXES_DATA } from "../../models/fixedTaxes";

const AddFixedTaxes = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState(FIXEDTAXES_DATA);

  const handleInputChange = (e: React.FormEvent<any>) => {

    setFormData({
      ...formData,
      [e.currentTarget.name]: getValue(e),
    });
  };

  const getValue = (e: React.FormEvent<any>) => {
    if (e.currentTarget.name == "amount") {
      e.currentTarget.value.replace("%", "");
      return parseFloat(e.currentTarget.value);
    }
    if (e.currentTarget.type === "number")
      return parseInt(e.currentTarget.value);

    return e.currentTarget.value;
  };

  const handleCreate = () => {
    setFixedTaxe(formData)
      .then((response) => {
        // Data retrieval and processing
        console.log(response);
        showSuccess("Creado exitosamente.");
        navigate(-1);
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Crear Taxes</h3>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <TaxesForm
            setFormData={setFormData}
            formData={formData}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleCreate}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
};

export default AddFixedTaxes;
