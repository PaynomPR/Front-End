import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {
  faBan,
  faCircleCheck,
  faEdit,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalAlert from "../../components/dashboard/ModalAlert";
import FloatButton from "../../components/dashboard/FloatButton";

import CustomInputs from "../../components/forms/CustomInputs";
import { changeStatusCode, deleteCode, getCodes } from "../../services/code.services";
import { showError, showSuccess } from "../../utils/functions";
import { Link } from "react-router-dom";

const Codes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [row, setRow] = useState({ owner: "", id: 0, is_deleted: false });
  const [loanding, setLoanding] = useState(false);

  const columns: any = [
    {
      name: "Dueño",
      cell: (row: { owner: string }) => row.owner,
    },
    {
      name: "Correo",
      cell: (row: { email: string }) => row.email,
    },
    {
      name: "Código",
      selector: (row: { code: string }) => row.code,
    },
    {
      name: "Amount",
      selector: (row: { amount: number }) => row.amount,
    },

    {
      name: "Editar",
      button: true,
      cell: (row: { id: string }) => (
        <Link to={`./editar/${row.id}`} rel="noopener noreferrer">
          <FontAwesomeIcon icon={faEdit} className="text-2xl" />
        </Link>
      ),
      selector: (row: { year: any }) => row.year,
    },
    {
      name: "Estado",
      button: true,
      cell: (row: { owner: string; id: number; is_deleted: boolean }) => (
        <>
          {!row.is_deleted ? (
            <a onClick={() => handleModalClick(row)} rel="noopener noreferrer">
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="text-2xl text-green-800"
              />
            </a>
          ) : (
            <a onClick={() => handleModalClick(row)} rel="noopener noreferrer">
              <FontAwesomeIcon icon={faBan} className="text-2xl text-red-800" />
            </a>
          )}
        </>
      ),
      selector: (row: { year: any }) => row.year,
    },
    {
      name: "Eliminar",
      button: true,
      cell: (row: { owner: string; id: number; is_deleted: boolean }) => (
        <>
          <a onClick={() => handleModalClick2(row)} rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTrash} className="text-2xl text-red-800" />
          </a>
        </>
      ),
      selector: (row: { is_deleted: any }) => row.is_deleted,
    }
  ];
  const [isOpen2, setIsOpen2] = useState(false);
  const handleModal2 = () => {
    setIsOpen2(!isOpen2);
  };

  const deleteCodeModal = () => {
    setLoanding(true);
    deleteCode(row.id)
      .then((data: any) => {
        data = data.data;
        setLoanding(false);

        // Data retrieval and processing
        if (data.ok) {
          showSuccess("Eliminado exitosamente");
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
    owner: string;
    id: number;
    is_deleted: boolean;
  }) => {
    setRow(data);
    setIsOpen2(!isOpen);
  };
  const getData = () => {
    getCodes()
      .then((response) => {
        // Data retrieval and processing
        setData(response.data.result);
      })
      .catch((error) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
        console.error(error);
      });
  };
  const changeStatus = () => {
    changeStatusCode(row.id)
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
    owner: string;
    id: number;
    is_deleted: boolean;
  }) => {
    setRow(data);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center">
        <h3 className="text-2xl">Códigos</h3>
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
            row.is_deleted ? "activar" : "desactivar"
          } el codigo de: ${row.owner}?`}
        />
         <ModalAlert
        isOpen={isOpen2}
        show={loanding}
        action={deleteCodeModal}
        setIsOpen={handleModal2}
        title={`Eliminar`}
        description={`¿Esta seguro que desea ELIMINAR
         el codigo de: ${row.owner}?`}
      />
        <FloatButton to="agregar" />
      </div>
    </>
  );
};

export default Codes;
