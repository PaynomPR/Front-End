import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
type Props = {
  items: any[];
};

const CardText = (props: Props) => {
  const getRoute = (id: string) => {
    return "../../escritorio/empresas/" + id + "/empleados";
  };

  return (
    <div className="bg-white rounded-lg shadow  p-4 ">
      <p className="text-xl text-[#333160] font-medium">
        Compañías visitadas desde la ultima sesión
      </p>
      {props.items.slice(0, 3).map((item, i) => (
        <div
          key={i}
          className="mt-4 flex  flex-row content-center items-center"
        >
          <p className="ms-4 flex-1">{item.name}</p>
          <Link
            to={`../../escritorio/empresas/editar/${item.id}`}
            rel="noopener noreferrer"
            className="flex-1 text-center"
          >
            <FontAwesomeIcon icon={faEdit} className="text-2xl " />
          </Link>
          <Link className="px-1" to={getRoute(item.id)}>
            <button className="  rounded-lg px-4 py-3 font-bold bg-[#FED102]  content-center items-center">
              Empleados
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CardText;
