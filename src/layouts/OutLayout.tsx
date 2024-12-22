import { Outlet } from "react-router-dom";

import top_bar from "../assets/imgs/Out/top_bar.png";
import icon from "../assets/imgs/Out/icon.png";
import Footer from "../components/nav/Footer";

const OutLayout = () => {
  return (
    <div className="h-screen">
      <div
        className="h-[30vh] grid content-center relative  align-middle bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${top_bar})` }}
      >
        <h2 className="text-white font-bold z-10 text-3xl md:text-4xl text-center">
          ¡Bienvenido a PaynomPR!
        </h2>
        <img
          className="absolute md:left-16 left-8 md:w-48 sm:w-14 w-28 -bottom-10 md:-bottom-1/4"
          src={icon}
        ></img>
      </div>
      <div className="bg-[#E1E1E1]  min-h-[64vh] mx-auto flex align-middle items-center">
        <div className=" md:container p-4 py-12 mx-auto">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OutLayout;
