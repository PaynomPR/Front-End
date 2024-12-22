import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { faBan, faClock, faEdit } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalAlert from "../../components/dashboard/ModalAlert";
import FloatButton from "../../components/dashboard/FloatButton";

import CustomInputs from "../../components/forms/CustomInputs";
import {
  changeStatusEmployer,
  deleteEmployer,
  getEmployers,
} from "../../utils/requestOptions";

import { Link, useParams } from "react-router-dom";
import { showError, showSuccess } from "../../utils/functions";

const Empleados = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [loanding, setLoanding] = useState(false);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState({ first_name: "", id: 0, is_deleted: false });

  const [data, setData] = useState([]);
  const params = useParams();

  // Componente Switch personalizado en TypeScript
  interface SwitchProps {
    isOn: boolean;
    handleToggle: () => void;
  }
  interface RowData {
    first_name: string;
    id: number;
    is_deleted: boolean;
  }

  const Switch: React.FC<SwitchProps> = ({ isOn, handleToggle }) => {
    return (
      <span
        onClick={handleToggle}
        className={`${
          isOn ? "bg-red-500" : "bg-green-500"
        } relative inline-block w-12 h-6 transition duration-200 ease-linear rounded-full border-2 border-transparent outline-none cursor-pointer`}
      >
        <span
          className={`${
            isOn ? "translate-x-6" : "translate-x-0"
          } inline-block w-6 h-6 transition duration-100 ease-linear transform bg-white rounded-full shadow`}
        />
      </span>
    );
  };

  const columns: any = [
    {
      name: "Nombre",
      selector: (row: { first_name: string }) => row.first_name,
    },
    {
      name: "Numero Social",
      selector: (row: { social_security_number: string }) =>
        row.social_security_number,
    },
    {
      name: "Telefono",
      selector: (row: { smartphone_number: string }) => row.smartphone_number,
    },
    {
      name: "Tipo",
      selector: (row: { employee_type: string }) => row.employee_type,
    },

    {
      name: "Horas",
      button: true,
      cell: (row: { id: string }) => (
        <Link
          to={`../procesos/${Number(params.id)}/${row.id}/cargar`}
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon
            data-id={row.id}
            icon={faClock}
            className="text-2xl"
          />
        </Link>
      ),
      selector: (row: { year: any }) => row.year,
    },
    {
      name: "Editar",
      button: true,
      cell: (row: { id: string }) => (
        <Link to={`./${row.id}/editar`} rel="noopener noreferrer">
          <FontAwesomeIcon
            data-id={row.id}
            icon={faEdit}
            className="text-2xl"
          />
        </Link>
      ),
      selector: (row: { year: any }) => row.year,
    },
    {
      name: "Deshabilitar",
      button: true,
      cell: (row: RowData) => (
        <Switch
          isOn={row.is_deleted}
          handleToggle={() => handleModalClick(row)}
        />
      ),
      ignoreRowClick: true,
      allowOverflow: true,

      selector: (row: RowData) => row.is_deleted,
    },
    {
      name: "Eliminar",
      button: true,
      cell: (row: { first_name: string; id: number; is_deleted: boolean }) => (
        <>
          <a onClick={() => handleModalClick2(row)} rel="noopener noreferrer">
            <FontAwesomeIcon icon={faBan} className="text-2xl text-red-800" />
          </a>
        </>
      ),
      selector: (row: { year: any }) => row.year,
    },
  ];

  const changeStatus = () => {
    setLoanding(true);
    changeStatusEmployer(row.id)
      .then(() => {
        // Data retrieval and processing
        setLoanding(false);
        showSuccess("Cambiando exitosamente");
        getData();
        handleModal();
      })
      .catch((error: any) => {
        setLoanding(false);
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };
  const deleteEmployerModal = () => {
    setLoanding(true);
    deleteEmployer(row.id)
      .then((data: any) => {
        data = data.data;

        // Data retrieval and processing
        if (data.ok) {
          showSuccess("Cambiando exitosamente");
          getData();
          handleModal2();
        } else {
          showError(data.msg);
          handleModal2();
        }
        setLoanding(false);
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };
  const handleModalClick = (data: {
    first_name: string;
    id: number;
    is_deleted: boolean;
  }) => {
    setRow(data);
    setIsOpen(!isOpen);
  };
  const handleModalClick2 = (data: {
    first_name: string;
    id: number;
    is_deleted: boolean;
  }) => {
    setRow(data);
    setIsOpen2(!isOpen2);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoanding(true);
    getEmployers(Number(params.id))
      .then((response) => {
        // Data retrieval and processing
        if (response.data.result) setData(response.data.result);
        setLoanding(false);
      })
      .catch(() => {});
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  const handleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center flex">
        <button className="flex-1">
          <h3 className="text-2xl">Empleados</h3>
        </button>
      </div>
      <div className="flex md:flex-row flex-col    gap-4  ">
        <div className="md:w-full mt-4 w-full flex flex-col   gap-2  ">
          <div className="w-full bg-white rounded-lg shadow p-4		  ">
            <CustomInputs
              class="w-1/3 float-right mx-auto  ps-2 inline-block xl:inline-flex  justify-between items-center"
              label=""
              value={search}
              onChange={handleSearch}
              placeholder="Buscar"
              type="text"
            />
            <DataTable
              className="w-full"
              columns={columns}
              data={data}
              pagination
            />
          </div>
        </div>
        <ModalAlert
          isOpen={isOpen}
          show={loanding}
          action={changeStatus}
          setIsOpen={handleModal}
          title={`${row.is_deleted ? "Activar" : "Desactivar"}`}
          description={`¿Esta seguro que desea ${
            row.is_deleted ? "ACTIVAR" : "DESACTIVAR"
          } el empleado: ${row.first_name}?`}
        />
        <ModalAlert
          show={loanding}
          isOpen={isOpen2}
          action={deleteEmployerModal}
          setIsOpen={handleModal2}
          title={`Eliminar`}
          description={`¿Esta seguro que desea ELIMINAR el empleado: ${row.first_name}?`}
        />
        <FloatButton to="agregar" />
      </div>
    </>
  );
};

export default Empleados;
