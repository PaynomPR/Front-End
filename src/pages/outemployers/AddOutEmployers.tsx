import { useNavigate, useParams } from "react-router-dom";

import { useState } from "react";
import { showError, showSuccess } from "../../utils/functions";
import { setOutEmployers } from "../../utils/requestOptions";

import ModalAlert from "../../components/dashboard/ModalAlert";
import OutEmployeerForm from "../../components/forms/OutmployeerForm";
import { OUT_EMPLOYER_DATA } from "../../models/outEmployers";

const AddOutEmployee = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loanding, setLoanding] = useState(false);
  const [formData, setFormData] = useState(OUT_EMPLOYER_DATA);

  const handleInputChange = (e: React.FormEvent<any>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: getValue(e),
    });
  };

  const getValue = (e: React.FormEvent<any>) => {
    if (e.currentTarget.type === "number")
      return parseInt(e.currentTarget.value);
    if (e.currentTarget.type === "checkbox") return e.currentTarget.checked;

    return e.currentTarget.value;
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleCreate = () => {
    if (formData.regular_pay > 0) {
      setLoanding;
      setOutEmployers(formData, Number(params.id))
        .then(() => {
          // Data retrieval and processing
          setLoanding(false);
          showSuccess("Creado exitosamente.");
          navigate(-1);
        })
        .catch((error) => {
          // If the query fails, an error will be displayed on the terminal.
          showError(error.response.data.detail);
        });
    } else {
      showError("Debe ingresar un monto de Hora a pagar.");
    }
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Crear Tercero</h3>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <OutEmployeerForm
            setFormData={setFormData}
            formData={formData}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleModal}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Guardar datos
          </button>
        </div>
      </div>
      <ModalAlert
        isOpen={isOpen}
        show={loanding}
        action={handleCreate}
        setIsOpen={handleModal}
        title={`Crear Usuario`}
        description={`¿Esta seguro que desea crear este usuario ${formData.first_name} ${formData.last_name}?`}
      />
    </>
  );
};

export default AddOutEmployee;
