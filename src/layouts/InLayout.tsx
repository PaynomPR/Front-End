import Header from "../components/nav/Header";
import Sidebar from "../components/nav/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../components/nav/Footer";
import { useLocalStorage } from "../utils/UseLocalStorage";
import { useEffect } from "react";
import { getAccountants, getCurrentUser } from "../utils/requestOptions";
import { removeToken } from "../services/auth.services";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { blockPage } from "../utils/permision";

const InLayout = () => {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    "sidebar-expanded",
    "false"
  );
  const [role, setRole] = useLocalStorage("role", "3");

  const toggleSidebar = () => {
    if (window.innerWidth < 700) {
      if (sidebarOpen === "true") setSidebarOpen("false");
      else setSidebarOpen("true");
    }
  };
  useEffect(() => {
    getCurrentUser()
      .then((response) => {
        const data: any = response;
        setRole(data.data.user.role_id);
      })
      .catch(() => {
        removeToken();
        setRole("0");
        navigate("../");
        // If the query fails, an error will be displayed on the terminal.
      });
    getAccountants()
      .then((response) => {
        // TODO Declarar un modelo para user
        if (blockPage(response.data.result.length == 0)) {
          navigate("/escritorio/contadores/agregar");
        }
      })
      .catch(() => {
        // If the query fails, an error will be displayed on the terminal.
      });
  }, []);

  const toggleSidebarOption = () => {
    if (sidebarOpen === "true") setSidebarOpen("false");
    else setSidebarOpen("true");
  };

  const backButton = () => {
    navigate(-1);
  };

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className=" min-h-screen overflow-hidden">
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header toggleSidebar={toggleSidebar} />
          {/* <!-- ===== Header End ===== --> */}
          <div className="flex">
            {/* <!-- ===== Sidebar Start ===== --> */}
            <Sidebar
              sidebarOpen={sidebarOpen}
              role={role}
              toggleSidebar={toggleSidebar}
              toggleSidebarOption={toggleSidebarOption}
            />
            {/* <!-- ===== Sidebar End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}

            <div
              className={` transition-all duration-500 w-full mt-[88px] relative   sm:mt-[8vh]     bg-[#E1E1E1] overflow-auto h-[calc(100vh-8vh)]  ${
                sidebarOpen === "true"
                  ? "  md:ms-[25%] md:w-3/4 "
                  : " md:ms-[8.333333%] md:w-11/12 "
              } `}
            >
              <div className="container  mx-auto p-4  md:p-10 min-h-[calc(100vh-14vh)] ">
                <button
                  onClick={backButton}
                  className="flex-2 flex items-center align-middle text-[#333160] mb-4"
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faCaretLeft}
                    className="text-2xl text-[#333160] pe-2"
                  />{" "}
                  Volver
                </button>
                <Outlet />
              </div>
              <Footer sidebarOpen={sidebarOpen} />
            </div>
          </div>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>

        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default InLayout;
