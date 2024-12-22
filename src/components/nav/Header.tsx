import { useNavigate } from "react-router-dom";

import user from "../../assets/imgs/navbar/user.png";
import logo from "../../assets/imgs/Out/icon.png";
import search from "../../assets/imgs/navbar/search.png";
import notification from "../../assets/imgs/navbar/notification.png";
import { fetchName, setLogout } from "../../services/auth.services";
import { showSuccess } from "../../utils/functions";

interface SidebarProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    showSuccess("Hasta luego " + fetchName());
    setLogout();
    navigate("../../");
  };

  return (
    <div className="z-20 grid px-4 fixed w-full xl:fix  md:px-12 py-3 grid-cols-2 grid-flow-col gap-4 h-[8vh] bg-[#fdfdfd]">
      <div className=" flex content-start justify-start md:content-center items-center   ">
        <img onClick={toggleSidebar} src={logo} className="h-11" alt="" />
      </div>
      <div className="  flex content-end justify-end content-center items-center invisible   md:visible  ">
        <div className="p-3 rounded-lg bg-[#56325625] me-6 ">
          <img
            className="h-4 w-4 content-center items-center "
            src={notification}
            alt=""
          />
        </div>

        <img
          className="h-5 w-5 content-center items-center me-6"
          src={search}
          alt=""
        />
        <button
          onClick={() => handleLogout()}
          className=" flex rounded-lg px-4 py-2 font-bold bg-[#FED102] me-4 content-center items-center"
        >
          Cerrar sesión
        </button>
        <img className="h-11" src={user} alt="" />
      </div>
    </div>
  );
};

export default Header;
