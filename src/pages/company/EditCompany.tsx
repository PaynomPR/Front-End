import { useEffect, useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import {
  editCompanies,
  getAccountants,
  getCompanie,
} from "../../utils/requestOptions";
import { showError, showSuccess } from "../../utils/functions";
import { useNavigate, useParams } from "react-router-dom";
import { COMPANY, COMPANY_DATA } from "../../models/company";
import CompanyForm from "../../components/forms/CompanyForm";
import ModalAlert from "../../components/dashboard/ModalAlert";

const EditCompany = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loanding, setLoanding] = useState(false);
  const [accountants, setAccountants] = useState([]);

  const [formData, setFormData] = useState(COMPANY_DATA);

  const optionalFields: (keyof COMPANY)[] = [
    "date_close",
    "website",
    "fax_number",
  ];

  const initialErrors = Object.keys(COMPANY_DATA).reduce<Record<keyof COMPANY, string>>((acc, key) => {
    acc[key as keyof COMPANY] = ""; // or null
    return acc;
  }, {} as Record<keyof COMPANY, string>);

  const [errors, setErrors] = useState<Record<keyof COMPANY, string>>(initialErrors);

  const validateForm = (): boolean => {
    const newErrors: Record<keyof COMPANY, string> = { ...initialErrors }; // Correctly typed newErrors

   var count_error = 0;
    for (const key in COMPANY_DATA) {
      if (optionalFields.includes(key as keyof COMPANY)) {
        continue; // Skip optional fields
      }

      const value = formData[key as keyof COMPANY];

      if (typeof value === 'string') {
        if (!value.trim()) {
           newErrors[key as keyof COMPANY] = "Este campo es requerido.";
           count_error++;
        } else if (["first_name", "middle_name", "last_name", "mother_last_name"].includes(key)) {
          // Validate names for special characters.  /^[a-zA-Z\s]*$/ 
          if (!/^[a-zA-Z\s]*$/.test(value)) {
            newErrors[key as keyof COMPANY] = "Este campo no debe contener caracteres especiales.";
            count_error++;
          }
        }

      }else if (typeof value === 'number') {
         if(isNaN(value) || value === 0) {  //Check for NaN or 0 in number fields.
              newErrors[key as keyof COMPANY] = "Este campo es requerido.";
           count_error++;

         }
      }
      else if (typeof value === "object" && value === null) { //Check for null in date fields
          newErrors[key as keyof COMPANY] = "Este campo es requerido.";
          count_error++;

       }
    }


    if (Object.keys(newErrors).length > 0) {
      console.log(newErrors);
      setErrors(newErrors); // Set errors only if validation fails
      
    }
    if (count_error > 0)
      return false
    else
      return true;
  };
  useEffect(() => {
    getAccountants()
      .then((data) => {
        setAccountants(data.data.result);
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  }, []);
  useEffect(() => {
    getCompanie(Number(params.id))
      .then((response) => {
        setFormData(response.data.result);

        // Data retrieval and processing
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  }, []);
  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleInputChange = (e: React.FormEvent<any>) => {
    const value = e.currentTarget.value;

    setFormData({
      ...formData,
      [e.currentTarget.name]: value,
    });
  };

  const handleEdit = () => {
    setLoanding(true);
    if (validateForm()) {  // Call validation function. Errors set here if needed.
    editCompanies(formData, Number(params.id))
      .then(() => {
        // Data retrieval and processing
        setLoanding(false);

        showSuccess("Editado exitosamente.");
        navigate("../empresas");
      })
      .catch(() => {
        showError(
          "Ha ocurrido un error al procesar tus datos. Por favor, verifica la información ingresada y vuelve a intentarlo."
        );
        setLoanding(false);
      });
    } else {
      setLoanding(false);
      handleModal();
        showError("Debe llenar todos los campos para poder guardar los datos."); // Show a generic error message if needed
    }
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Editar Compañía</h3>

        <p className="text-white mt-4">
          Ingresa los datos de la compañía que deseas crear. ¡Empecemos por el
          nombre y su calificación!
        </p>
        <div className="w-1/5 mx-auto mt-4  inline-block "></div>
        <CustomInputs
          name="name"
          onChange={handleInputChange}
          value={formData.name}
          class="w-1/4 mx-auto mt-4 inline-block "
          label=""
          placeholder="* Nombre de la compañía"
          type="text"
        />
        <select
          name="accountant_id"
          onChange={handleInputChange}
          value={formData.accountant_id}
          style={{ color: "black" }}
          className={`w-1/4 bg-gray-50 border ms-1 inline-block  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-[0.7em]`}
        >
          <option value={-1}>Seleccione un/a Contador/a</option>
          {accountants
            .filter((item: any) => !item.is_deleted) // Filter out deleted accountants
            .map((item: any) => (
              <option className="text-gray-900" key={item.id} value={item.id}>
                {item.name + " " + item.first_last_name}
              </option>
            ))}
        </select>
        <div className="w-1/4 mx-auto mt-4 inline-block "></div>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
          <CompanyForm
            setFormData={setFormData}
            formData={formData}
            errors={errors}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full text-center">
          <button
            onClick={handleEdit}
            className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center "
          >
            Guardar datos
          </button>
        </div>
      </div>
      <ModalAlert
        isOpen={isOpen}
        show={loanding}
        action={handleEdit}
        setIsOpen={handleModal}
        title={`Editar Usuario`}
        description={`¿Esta seguro que desea editar este usuario ${formData.name}?`}
      />
    </>
  );
};

export default EditCompany;
