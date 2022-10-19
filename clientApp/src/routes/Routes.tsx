import { Nav } from "components";
import { EthNetworkContext } from "context";
import { ROLE_IDENTIFICATOR } from "lib/constants/roles";
import { PATH } from "lib/constants/routes";
import { Doctors, ErrorPage, Nurses, Users } from "pages";
import Login from "pages/Login/Login";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { SessionContext } from "../context/SessionProvider/SessionProvider";
import ClinicRecords from "../pages/ClinicRecords/ClinicRecords";
import ProtectedRoute from "./ProtectedRoute";

const Routes = () => {
  const { loggedUser } = React.useContext(SessionContext);
  const router = React.useMemo(
    () =>
      createBrowserRouter([
        {
          path: PATH.root,
          element: (
            <Navigate
              to={Boolean(loggedUser) ? PATH.dashboard : PATH.login}
              replace={true}
            />
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: PATH.login,
          element: (
            <React.Fragment>
              {Boolean(!loggedUser) ? (
                <>
                  <Login />
                </>
              ) : (
                <Navigate to={`${PATH.dashboard}`} />
              )}
            </React.Fragment>
          ),
          errorElement: <ErrorPage />,
        },
        {
          path: `${PATH.dashboard}`,
          element: <ProtectedRoute navigateTo={`${PATH.login}`} />,
          errorElement: <ErrorPage />,
          children: [
            {
              index: true,
              element: (
                <Navigate
                  to={
                    loggedUser?.roleId === ROLE_IDENTIFICATOR.ADMIN
                      ? `${PATH.dashboard}${PATH.users}`
                      : `${PATH.dashboard}${PATH.clinicRecords}`
                  }
                />
              ),
            },
            {
              path: `${PATH.dashboard}${PATH.clinicRecords}`,
              element: <ClinicRecords />,
            },
            {
              path: `${PATH.dashboard}${PATH.users}`,
              element: <Users />,
              children: [
                {
                  path: `${PATH.dashboard}${PATH.users}${PATH.new}`,
                },
              ],
            },
            {
              path: `${PATH.dashboard}${PATH.doctors}`,
              element: <Doctors />,
              children: [
                {
                  path: `${PATH.dashboard}${PATH.doctors}${PATH.new}`,
                },
              ],
            },
            {
              path: `${PATH.dashboard}${PATH.nurses}`,
              element: <Nurses />,
              children: [
                {
                  path: `${PATH.dashboard}${PATH.nurses}${PATH.new}`,
                },
              ],
            },
          ],
        },
      ]),
    [loggedUser]
  );

  React.useEffect(() => {
    console.log(loggedUser);
  }, [loggedUser]);

  return <RouterProvider router={router} />;
};

export default Routes;
