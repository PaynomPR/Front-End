import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CustomInputs from "../../components/forms/CustomInputs";
import { getFixedTaxes } from "../../utils/requestOptions";

import { Link } from "react-router-dom";

const FixedTaxes = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  // Componente Switch personalizado en TypeScript

  const columns: any = [
    {
      name: "Nombre",
      selector: (row: { name: string }) => row.name.toUpperCase(),
    },
    {
      name: "Porcentaje",
      selector: (row: { amount: string }) => row.amount,
    },
    {
      name: "Limite",
      selector: (row: { limit: string }) => row.limit,
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
  ];

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getFixedTaxes()
      .then((response) => {
        // Data retrieval and processing
        if (response.data.result) setData(response.data.result);
      })
      .catch(() => {});
  };

  const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <>
      <div className="text-[#EED102] bg-[#333160] p-6 rounded-lg text-center flex">
        <button className="flex-1">
          <h3 className="text-2xl">Taxes Fijos</h3>
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
      </div>
    </>
  );
};

export default FixedTaxes;
