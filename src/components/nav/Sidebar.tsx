import { NavLink } from "react-router-dom";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  faBars,
  faHouse,
  faBuilding,
  faUsers,
  faBarcode,
  faMoneyBill,
  faDiagramProject,
  faUser
  
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { blockPage, ownerLevel } from "../../utils/permision";

interface SidebarProps {
  sidebarOpen: string;
  toggleSidebarOption: () => void;
  toggleSidebar: () => void;
  role: string;
}

const Sidebar = ({
  sidebarOpen,
  toggleSidebar,
  toggleSidebarOption,
  role,
}: SidebarProps) => {
  return (
    <div
      className={` transition-all  fixed  h-[calc(100vh-8vh)]  mt-[88px] md:mt-[8vh] md:opacity-100  xl:h-[calc(100vh-8vh)]  duration-500  bg-[#645c9f] h-[calc(100vh-14vh)]  ${
        sidebarOpen === "true"
          ? "w-2/3  left-0  opacity-100 bottom-0 md:w-1/4 z-20"
          : " w-0 md:w-1/12 justify-items-center opacity-0"
      }`}
    >
      {blockPage(true) && (
        <div
          className={`h-full p-6  transition-all  duration-300 grid ${
            sidebarOpen === "true"
              ? " ps-12   "
              : "  justify-items-center  hidden sm:grid ps-5"
          }`}
        >
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                onClick={toggleSidebar}
                to="/escritorio/dash"
                className={({ isActive }) =>
                  [
                    "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                    isActive ? " active group" : "",
                  ].join("")
                }
              >
                <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                  <FontAwesomeIcon
                    className="text-2xl fa-fw text-white"
                    icon={faHouse}
                  />
                </div>
                {sidebarOpen === "true" && (
                  <span className="ms-3 text-white">Escritorio</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleSidebar}
                to="/escritorio/contadores"
                className={({ isActive }) =>
                  [
                    "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                    isActive ? " active group" : "",
                  ].join("")
                }
              >
                <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                  <FontAwesomeIcon
                    className="text-2xl text-white fa-fw"
                    icon={faUsers}
                  />
                </div>
                {sidebarOpen === "true" && (
                  <span className="ms-3 text-white">Contadores</span>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                onClick={toggleSidebar}
                to="/escritorio/empresas"
                className={({ isActive }) =>
                  [
                    "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                    isActive ? " active group" : "",
                  ].join("")
                }
              >
                <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                  <FontAwesomeIcon
                    className="text-2xl fa-fw text-white"
                    icon={faBuilding}
                  />
                </div>
                {sidebarOpen === "true" && (
                  <span className="ms-3 text-white">Compañías</span>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink
                onClick={toggleSidebar}
                to="/escritorio/procesos"
                className={({ isActive }) =>
                  [
                    "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                    isActive ? " active group" : "",
                  ].join("")
                }
              >
                <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                  <FontAwesomeIcon
                    className="text-2xl fa-fw text-white"
                    icon={faDiagramProject}
                  />
                </div>
                {sidebarOpen === "true" && (
                  <span className="ms-3 text-white">Procesos</span>
                )}
              </NavLink>
            </li>

            {ownerLevel(role) && (
              <li>
                <NavLink
                  onClick={toggleSidebar}
                  to="fixed-taxes"
                  className={({ isActive }) =>
                    [
                      "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                      isActive ? " active group" : "",
                    ].join("")
                  }
                >
                  <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                    <FontAwesomeIcon
                      className="text-2xl fa-fw text-white"
                      icon={faMoneyBill}
                    />
                  </div>
                  {sidebarOpen === "true" && (
                    <span className="ms-3 text-white">Taxes fijos</span>
                  )}
                </NavLink>
              </li>
            )}
            {ownerLevel(role) && (
              <li>
                <NavLink
                  onClick={toggleSidebar}
                  to="/escritorio/codigos"
                  className={({ isActive }) =>
                    [
                      "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                      isActive ? " active group" : "",
                    ].join("")
                  }
                >
                  <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                    <FontAwesomeIcon
                      className="text-2xl fa-fw text-white"
                      icon={faBarcode}
                    />
                  </div>
                  {sidebarOpen === "true" && (
                    <span className="ms-3 text-white">Codigos</span>
                  )}
                </NavLink>
              </li>
            )}
<li>
              <NavLink
                onClick={toggleSidebar}
                to="/escritorio/profile"
                className={({ isActive }) =>
                  [
                    "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                    isActive ? " active group" : "",
                  ].join("")
                }
              >
                <div className="p-3 rounded-lg border-white border group-[.active]:bg-[#a29dc5ad]">
                  <FontAwesomeIcon
                    className="text-2xl fa-fw text-white"
                    icon={faUser}
                  />
                </div>
                {sidebarOpen === "true" && (
                  <span className="ms-3 text-white">Profile</span>
                )}
              </NavLink>
            </li>
            <li className=" block xl:hidden">
              <NavLink
                to="../"
                className={({ isActive }) =>
                  [
                    "flex items-center py-4 justify-items-center  text-gray-900 rounded-lg text-white ",
                    isActive ? " active group" : "",
                  ].join("")
                }
              >
                {sidebarOpen === "true" && (
                  <span
                    onClick={toggleSidebar}
                    className=" flex rounded-lg px-4 py-2 font-bold bg-[#FED102] me-4 content-center items-center"
                  >
                    {" "}
                    Cerrar sesión
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
          <ul className=" content-end grid font-medium 	">
            <li className="text-center">
              <button
                onClick={toggleSidebarOption}
                className="flex items-center  text-gray-900 rounded-lg text-center text-white"
              >
                <div className="p-3 px-4 rounded-full bg-[#EED102]">
                  {sidebarOpen === "true" ? (
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-2xl text-black"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faBars}
                      className="text-2xl text-black"
                    />
                  )}
                </div>

                {sidebarOpen === "true" && (
                  <span className="ms-3">Cerrar menú</span>
                )}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
