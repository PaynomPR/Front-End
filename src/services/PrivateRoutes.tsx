import { Outlet, Navigate } from "react-router-dom";
import { fetchToken } from "./auth.services";

const PrivateRoutes = () => {
  let auth = { token: fetchToken() };

  return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
