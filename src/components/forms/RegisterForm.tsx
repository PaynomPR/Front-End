import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CustomInputs from "./CustomInputs";
import { showError, showSuccess } from "../../utils/functions";
import { setRegister } from "../../services/auth.services";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    role_id: 2,
    user_code: "",
    password: "",
  });

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setFormData({
      ...formData,
      [e.currentTarget.name]: value,
    });
  };

  const handleRegister = () => {
    setRegister(formData)
      .then((response) => {
        // Data retrieval and processing
        if (response) {
          showSuccess("Cuenta creada exitosamente.");
          navigate("../");
        }
      })
      .catch((error) => {
        showError(error.response.data.detail);
      });
  };

  return (
    <form className="space-y-4 md:space-y-3">
      <CustomInputs
        onChange={handleInputChange}
        class="w-1/2 inline-block pe-2"
        label="Nombre"
        value={formData.name}
        name="name"
        disabled={false}
        placeholder="Nombre"
        type="text"
      />

      <CustomInputs
        onChange={handleInputChange}
        class="w-1/2 inline-block ps-2"
        label="Apellido"
        value={formData.lastname}
        name="lastname"
        disabled={false}
        placeholder="Apellido"
        type="text"
      />

      <CustomInputs
        onChange={handleInputChange}
        class="w-1/2 inline-block pe-2"
        label="Correo electrónico"
        name="email"
        value={formData.email}
        disabled={false}
        placeholder="name@company.com"
        type="email"
      />
      <CustomInputs
        onChange={handleInputChange}
        class="w-1/2 inline-block ps-2"
        label="Teléfono"
        name="phone"
        value={formData.phone}
        disabled={false}
        placeholder="+54 656546456"
        type="tel"
      />

      <CustomInputs
        onChange={handleInputChange}
        class="w-1/2 inline-block pe-2"
        label="Contraseña"
        name="password"
        value={formData.password}
        disabled={false}
        placeholder="*********"
        type="password"
      />

      <CustomInputs
        class="w-1/2 inline-block ps-2"
        label="Confirmar Contraseña"
        disabled={false}
        placeholder="*********"
        type="password"
      />
      <CustomInputs
        onChange={handleInputChange}
        class="w-full inline-block text-center text-xl"
        label="Código"
        name="user_code"
        value={formData.user_code}
        inputCss="text-xl text-center"
        disabled={false}
        placeholder=""
        type="text"
      />

      <button
        type="button"
        onClick={handleRegister}
        className="w-full bg-[#333160]   py-4 text-[#EED102] bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      >
        Siguiente paso
      </button>
      <div className="flex items-center justify-between">
        <p className="text-sm text-end font-light text-gray-500 ">
          ¿Eres miembro?{" "}
          <Link
            to="/"
            className="font-medium text-primary-600 hover:underline "
          >
            Ingresa
          </Link>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
