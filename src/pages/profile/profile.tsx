import { useState } from "react";
import CustomInputs from "../../components/forms/CustomInputs";
import { changePassword, setActive2FA, setVerify2FA } from "../../utils/requestOptions";
import QRCode from 'react-qr-code'; // Make sure you have this installed

import { showError, showSuccess } from "../../utils/functions";

import { CHANGEPASSWORD } from "../../models/changePassword";

const Profile = () => {
  const [formData, setFormData] = useState(CHANGEPASSWORD);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false); // Track 2FA status
  const [qrCode, setQrCode] = useState('');
  const [totpCode, setTotpCode] = useState('');


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
  const handleRegenerate2FA = () => {
    setActive2FA()
      .then((data : any) => {
        console.log(data.data.result);
        setQrCode(data.data.result);
        console.log(qrCode);
      })
      .catch((error) => {
        showError(error.response.data.detail);
      });
  };

  const   handleVerify2FA  = () => {
    var data = {"code" : totpCode}
    setVerify2FA(data)
      .then((data : any) => {
        showSuccess("Codigo Valido.");
        console.log(data);
       
      })
      .catch((error) => {
        showError("Codigo de validacion caduco.");
      });
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-4 rounded-lg text-center">
        <h3 className="text-2xl">Cambiar Contraseña</h3>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
        <div className="flex xl:flex-col flex-col gap-4">
         
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
     {/*  <div className="text-[#EED102] bg-[#333160] p-4 mt-4 rounded-lg text-center">
        <h3 className="text-2xl">Doble factor de seguridad</h3>
      </div>
      <div className="w-full  mt-4 bg-white rounded-lg shadow p-4 ">
      <div className="flex align-middle items-center justify-center xl:flex-row flex-col gap-4">
         
      {qrCode ? ( 
                    <>
                        <QRCode value={qrCode} size={256} />
                        <input 
                          className={` bg-gray-50 text-sm invalid:border-red-500 border mt-2  border-gray-300 text-gray-900  rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 `}
                            type="text" 
                            value={totpCode} 
                            onChange={e => setTotpCode(e.target.value)} 
                            placeholder="Enter TOTP code"
                        />
                        <div className="flex flex-row">
                        <button   className="w-auto mt-4 me-2 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center " onClick={handleVerify2FA}>Verify TOTP</button>
                        <button   className="w-auto mt-4 ms-2 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center " onClick={handleRegenerate2FA}>Regenerate QR Code</button>
   
                        </div>
                                         </>
                ) : (
                    <div className="w-full text-center">
                        <button onClick={handleRegenerate2FA}   className="w-auto mt-4 mx-auto bg-[#333160] py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-8 text-center ">Enable 2FA</button>
                    </div>
                )}
      </div>
      </div> */}
    </>
  );
};

export default Profile;
