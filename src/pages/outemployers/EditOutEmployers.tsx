import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { showError, showSuccess } from "../../utils/functions";
import { editOutEmployers, getOutEmployer } from "../../utils/requestOptions";
import ModalAlert from "../../components/dashboard/ModalAlert";
import OutEmployeerForm from "../../components/forms/OutmployeerForm";
import { OUT_EMPLOYER_DATA } from "../../models/outEmployers";

const EditOutEmployee = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loanding, setLoanding] = useState(false);

  const [formData, setFormData] = useState(OUT_EMPLOYER_DATA);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.FormEvent<any>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]: getValue(e),
    });
  };
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const getValue = (e: React.FormEvent<any>) => {
    if (e.currentTarget.type === "number")
      return parseInt(e.currentTarget.value);
    if (e.currentTarget.type === "checkbox") return e.currentTarget.checked;

    return e.currentTarget.value;
  };

  useEffect(() => {
    getOutEmployer(Number(params.id), Number(params.id_employer))
      .then((response) => {
        console.log(response.data.result);
        setFormData(response.data.result);

        // Data retrieval and processing
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  }, []);

  const handleCreate = () => {
    setLoanding(true);
    editOutEmployers(formData, Number(params.id_employer))
      .then(() => {
        setLoanding(false);
        showSuccess("Editado exitosamente.");
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
        <h3 className="text-2xl">Editar Terceros</h3>
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
        show={loanding}
        isOpen={isOpen}
        action={handleCreate}
        setIsOpen={handleModal}
        title={`Editar Usuario`}
        description={`¿Esta seguro que desea editar este usuario ${formData.first_name} ${formData.last_name}?`}
      />
    </>
  );
};

export default EditOutEmployee;
