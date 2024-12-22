import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const QuickActions = () => {
  return (
    <div className="bg-white rounded-lg shadow  p-4 mt-2">
      <p className="text-xl text-[#333160] font-medium">
        Acceso rápido a herramientas
      </p>
      <Link
        to="../empresas/agregar"
        className="mt-4 flex  flex-row content-center items-center"
      >
        <FontAwesomeIcon
          className="text-4xl  p-4  bg-[#333160] text-white rounded-lg"
          icon={faPlus}
        />
        <p className="ms-4">Agregar una compañía</p>
      </Link>
      {/*  <div className="mt-4 flex  flex-row content-center items-center">
        <FontAwesomeIcon
          className="text-4xl  p-4  bg-[#333160] text-white rounded-lg"
          icon={faUser}
        />
        <p className="ms-4">Ver tu perfil</p>
      </div>
      <div className="mt-4 flex  flex-row content-center items-center">
        <FontAwesomeIcon
          className="text-[2.1rem]  p-4  bg-[#333160] text-white rounded-lg"
          icon={faGear}
        />
        <p className="ms-4">Configuración y Ajuste</p>
      </div> */}
    </div>
  );
};

export default QuickActions;
