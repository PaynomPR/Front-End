import { useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import { changePassword } from "../../utils/requestOptions";

import { showError, showSuccess } from "../../utils/functions";

import { CHANGEPASSWORD } from "../../models/changePassword";

const Profile = () => {
  const [formData, setFormData] = useState(CHANGEPASSWORD);

  const handleInputChange = (e: React.FormEvent<any>) => {
    setFormData({
      ...formData,
      [e.currentTarget.name]:
        e.currentTarget.type === "number"
          ? parseInt(e.currentTarget.value)
          : e.currentTarget.value,
    });
  };

  const handleAddAccountant = () => {
    changePassword(formData)
      .then(() => {
        // Data retrieval and processing
        showSuccess("Contraseña cambiada exitosamente.");
       
      })
      .catch((error) => {
        showError(error.response.data.detail);
      });
  };
  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Cambiar Contraseña</h3>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-row flex-col gap-4">
         
            <CustomInputs
              class="w-1/4 mx-auto pe-1  inline-block "
              label="Contraseña Actual"
              name="current_password"
              onChange={handleInputChange}
              value={formData.current_password}
              placeholder="Contraseña Actual"
              type="password"
            />
            <CustomInputs
              name="new_password"
              onChange={handleInputChange}
              value={formData.new_password}
              class="w-1/4 mx-auto ps-1 pe-1  inline-block "
              label="Nueva Contraseña"
              placeholder="Nueva Contraseña"
              type="password"
            />
           
          
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

export default Profile;
