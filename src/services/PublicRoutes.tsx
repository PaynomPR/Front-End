import { Outlet, Navigate } from "react-router-dom";
import { fetchToken } from "./auth.services";

const PublicRoutes = () => {
  let auth = { token: fetchToken() };
  return !auth.token ? <Outlet /> : <Navigate to="/escritorio/dash" />;
};

export default PublicRoutes;
