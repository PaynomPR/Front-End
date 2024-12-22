import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { faEdit, faBan } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalAlert from "../../components/dashboard/ModalAlert";
import FloatButton from "../../components/dashboard/FloatButton";

import CustomInputs from "../../components/forms/CustomInputs";
import {
  changeStatusAccountant,
  deleteAccountant,
  getAccountants,
} from "../../utils/requestOptions";
import { showError, showSuccess } from "../../utils/functions";
import { Link } from "react-router-dom";

const Accountants = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [row, setRow] = useState({ name: "", id: 0, is_deleted: false });
  const [isOpen2, setIsOpen2] = useState(false);
  const [loanding, setLoanding] = useState(false);

  const [data, setData] = useState([]);
  interface SwitchProps {
    isOn: boolean;
    handleToggle: () => void;
  }
  interface RowData {
    name: string;
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
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Correo",
      selector: (row: { email: string }) => row.email,
    },
    {
      name: "Teléfono",

      selector: (row: { phone: string }) => row.phone,
    },
    {
      name: "Editar",
      button: true,
      cell: (row: { id: string }) => (
        <Link to={`./editar/${row.id}`} rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEdit} className="text-2xl" />
        </Link>
      ),
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
      cell: (row: { name: string; id: number; is_deleted: boolean }) => (
        <>
          <a onClick={() => handleModalClick2(row)} rel="noopener noreferrer">
            <FontAwesomeIcon icon={faBan} className="text-2xl text-red-800" />
          </a>
        </>
      ),
      selector: (row: { year: any }) => row.year,
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  const handleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const deleteAccountantModal = () => {
    setLoanding(true);
    deleteAccountant(row.id)
      .then((data: any) => {
        data = data.data;
        setLoanding(false);

        // Data retrieval and processing
        if (data.ok) {
          showSuccess("Cambiando exitosamente");
          getData();
          handleModal2();
        } else {
          showError(data.msg);
          handleModal2();
        }
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  const handleModalClick2 = (data: {
    name: string;
    id: number;
    is_deleted: boolean;
  }) => {
    setRow(data);
    setIsOpen2(!isOpen2);
  };

  const getData = () => {
    setLoanding(true);
    getAccountants()
      .then((response) => {
        setLoanding(false);

        // Data retrieval and processing
        setData(response.data.result);
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        setLoanding(false);

        showError(error.response.data.detail);
      });
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const changeStatus = () => {
    changeStatusAccountant(row.id)
      .then(() => {
        // Data retrieval and processing
        showSuccess("Cambiando exitosamente");
        getData();
        handleModal();
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };

  const handleModalClick = (data: {
    name: string;
    id: number;
    is_deleted: boolean;
  }) => {
    setRow(data);
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Contadores</h3>
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
          } el empleado: ${row.name}?`}
        />
        <ModalAlert
          isOpen={isOpen2}
          show={loanding}
          action={deleteAccountantModal}
          setIsOpen={handleModal2}
          title={`Eliminar`}
          description={`¿Esta seguro que desea ELIMINAR
         al contador: ${row.name}?`}
        />
        <FloatButton to="agregar" />
      </div>
    </>
  );
};

export default Accountants;
