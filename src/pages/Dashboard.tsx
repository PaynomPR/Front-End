import QuickActions from "../components/dashboard/QuickActions";
import CardText from "../components/dashboard/CardText";

import { fetchName } from "../services/auth.services";
import { getCompanies } from "../utils/requestOptions";
import { useEffect, useState } from "react";
import { COMPANY_DATA } from "../models/company";

const Dashboard = () => {
  const [data, setData] = useState([COMPANY_DATA]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getCompanies()
      .then((response) => {
        // Data retrieval and processing
        setData(response.data);
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  };
  //getTodo();
  return (
    <div className="flex md:flex-row flex-col    gap-4  ">
      <div className="md:w-1/2  w-full flex flex-col   gap-2  ">
        <div className="w-full bg-white rounded-lg shadow p-4		  ">
          <h3 className="text-2xl text-[#333160]">
            ¡Hola de nuevo, <strong> {fetchName()}</strong>
          </h3>
        </div>
        <div className="w-full 		 ">
          <QuickActions />
        </div>
      </div>
      <div className="md:w-1/2 w-full   ">
        <CardText items={data} />
      </div>
    </div>
  );
};

export default Dashboard;
