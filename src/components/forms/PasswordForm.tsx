import { useState } from "react";
import { Link } from "react-router-dom";

import CustomInputs from "./CustomInputs";
import { showSuccess } from "../../utils/functions";

const PasswordForm = () => {
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    setError(true);
    showSuccess("Verifique su correo");
  };
  return (
    <form>
      <CustomInputs
        label="Correo electrónico"
        disabled={false}
        placeholder="name@company.com"
        type="email"
      />
      <div className="flex content-center align-middle items-center justify-center gap-2 ">
        <Link
          to="../"
          type="button"
          className="w-1/2 mt-2  bg-transparent border border-gray-500 text-[#333160]  py-4 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Volver
        </Link>

        <button
          type="button"
          onClick={() => handleSubmit()}
          className="w-1/2 mt-2  bg-[#333160]  py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
        >
          Enviar
        </button>
      </div>

      {error && (
        <div className="p-4 bg-[#E43131] text-white w-6/12 mx-auto mt-4 rounded-lg text-center">
          Código invalido
        </div>
      )}
    </form>
  );
};

export default PasswordForm;
