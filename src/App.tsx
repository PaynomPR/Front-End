import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import OutLayout from "./layouts/OutLayout";
import InLayout from "./layouts/InLayout";

import Login from "./pages/out/Login";

import Dashboard from "./pages/Dashboard";
import Empresas from "./pages/company/Company";
import Empleados from "./pages/employee/Employee";
import AddCompany from "./pages/company/AddCompany";
import AddEmployee from "./pages/employee/AddEmployee";
import Process from "./pages/Process";
import Cargar from "./pages/process/Cargar";
import ForgotPassword from "./pages/out/ForgotPassword";
import PrivateRoutes from "./services/PrivateRoutes";
import PublicRoutes from "./services/PublicRoutes";
import EditCompany from "./pages/company/EditCompany";
import EditEmployee from "./pages/employee/EditEmployee";
import Taxes from "./pages/taxes/taxes";
import AddTaxes from "./pages/taxes/AddTaxes";
import EditTaxes from "./pages/taxes/EditTaxes";

import FixedTaxes from "./pages/fixedtaxes/taxes";
import AddFixedTaxes from "./pages/fixedtaxes/AddTaxes";
import EditFixedTaxes from "./pages/fixedtaxes/EditTaxes";

import OutEmployers from "./pages/outemployers/OutEmployers";
import AddOutEmployee from "./pages/outemployers/AddOutEmployers";
import EditOutEmployee from "./pages/outemployers/EditOutEmployers";
import OutEmployeHours from "./pages/process/OutEmployeHours";
import Accountants from "./pages/accountants/Accountants";
import AddCounter from "./pages/accountants/AddAccountants";
import EditAccountants from "./pages/accountants/EditAccountants";
import Codes from "./pages/code/Codes";
import AddCode from "./pages/code/AddCodes";
import EditCodes from "./pages/code/EditCodes";
import Profile from "./pages/profile/profile";
import Register from "./pages/out/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<OutLayout />}>
            <Route index element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />

             <Route path="registro" element={<Register />} />
            <Route path="recuperar" element={<ForgotPassword />} />
          </Route>
        </Route>
        <Route element={<PrivateRoutes />}>
        
          <Route path="/escritorio" element={<InLayout />}>
            <Route index path="dash" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="dash" replace />} />
           
            <Route path="empresas" element={<Empresas />} />
            <Route path="empresas/agregar" element={<AddCompany />} />
            <Route path="empresas/editar/:id" element={<EditCompany />} />

            <Route path="contadores" element={<Accountants />} />
            <Route path="contadores/agregar" element={<AddCounter />} />
            <Route path="contadores/editar/:id" element={<EditAccountants />} />

            <Route path="procesos" element={<Process />} />
            <Route
              path="procesos/:id_company/:id_employer/cargar"
              element={<Cargar />}
            />
            <Route path="empresas/:id/taxes" element={<Taxes />} />
            <Route path="empresas/:id/taxes/agregar" element={<AddTaxes />} />
            <Route
              path="empresas/:id/taxes/:id_taxes/editar"
              element={<EditTaxes />}
            />

            <Route path="fixed-taxes" element={<FixedTaxes />} />
            <Route path="fixed-taxes/agregar" element={<AddFixedTaxes />} />
            <Route
              path="fixed-taxes/:id_taxes/editar"
              element={<EditFixedTaxes />}
            />

            <Route path="empresas/:id/empleados" element={<Empleados />} />
            <Route
              path="empresas/:id/empleados/agregar"
              element={<AddEmployee />}
            />
            <Route
              path="empresas/:id/empleados/:id_employer/editar"
              element={<EditEmployee />}
            />

            <Route path="empresas/:id/terceros" element={<OutEmployers />} />
            <Route
              path="empresas/:id/terceros/horas/:id_employer"
              element={<OutEmployeHours />}
            />
            <Route
              path="empresas/:id/terceros/agregar"
              element={<AddOutEmployee />}
            />
            <Route
              path="empresas/:id/terceros/:id_employer/editar"
              element={<EditOutEmployee />}
            />
             <Route
              path="profile"
              element={<Profile />}
            />
            <Route path="codigos" element={<Codes />} />
            <Route path="codigos/agregar" element={<AddCode />} />
            <Route path="codigos/editar/:id" element={<EditCodes />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
