import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { faBan, faClock, faEdit } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ModalAlert from "../../components/dashboard/ModalAlert";
import FloatButton from "../../components/dashboard/FloatButton";

import CustomInputs from "../../components/forms/CustomInputs";
import {
  changeStatusOutEmployer,
  deleteOutEmployer,
  getOutCounterFoilbyDateRange,
  getOutEmployers,
} from "../../utils/requestOptions";
import {
  faCalendarCheck,
  
} from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import { showError, showSuccess } from "../../utils/functions";
import { DateRangePicker } from "react-date-range";

const OutEmployers = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [loanding, setLoanding] = useState(false);
  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const [search, setSearch] = useState("");
  const [row, setRow] = useState({ first_name: "", id: 0, is_deleted: false });

  const [data, setData] = useState([]);
  const params = useParams();
  const handleSelect = (ranges: any) => {
    setSelectionRange(ranges.selection);
  };
  // Componente Switch personalizado en TypeScript
  interface SwitchProps {
    isOn: boolean;
    handleToggle: () => void;
  }

  const downloadFile = () => {
    const { startDate, endDate } = selectionRange;
    getOutCounterFoilbyDateRange(Number(params.id),startDate, endDate)
            .then(() => {
              // Data retrieval and processing
              setLoanding(false);
    
              showSuccess("Creado exitosamente.");
            })
            .catch((error) => {
              setLoanding(false);
    
              // If the query fails, an error will be displayed on the terminal.
              showError(error.response.data.detail);
            });
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
      name: "Telefono",
      selector: (row: { smartphone_number: string }) => row.smartphone_number,
    },

    {
      name: "Horas",
      button: true,
      cell: (row: { id: string }) => (
        <Link to={`./horas/${row.id}`} rel="noopener noreferrer">
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
    changeStatusOutEmployer(row.id)
      .then(() => {
        setLoanding(false);

        // Data retrieval and processing
        showSuccess("Cambiando exitosamente");
        getData();
        handleModal();
      })
      .catch((error: any) => {
        // If the query fails, an error will be displayed on the terminal.
        showError(error.response.data.detail);
      });
  };
  const deleteEmployerModal = () => {
    setLoanding(true);
    deleteOutEmployer(row.id)
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
    getOutEmployers(Number(params.id))
      .then((response) => {
        // Data retrieval and processing
        setLoanding(false);
        if (response.data.result) setData(response.data.result);
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
          <h3 className="text-2xl">Reporte de Salarios</h3>
        </button>
      </div>
      <div className="w-full bg-white rounded-lg shadow p-4 mt-4	flex align-middle justify-center	  ">
       <div className="mt-4 text-center">
                      <DateRangePicker
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                      />
                    </div>
                    <button
                              onClick={downloadFile}
                              className={`xl:w-1/3 w-full shadow-xl  mx-auto bg-white rounded-lg shadow p-4 py-6	text-center}`}
                            >
                              <FontAwesomeIcon
                                icon={faCalendarCheck}
                                className="text-6xl text-[#333160]"
                              />
                              <h3 className="text-[#333160] text-xl font-bold mt-4">
                                Descargar Archivo
                              </h3>
                            </button>
                    </div>
      <div className="text-[#EED102] bg-[#333160] p-6 mt-4 rounded-lg text-center flex">
        <button className="flex-1">
          <h3 className="text-2xl">Servicio Profesionales</h3>
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

export default OutEmployers;
