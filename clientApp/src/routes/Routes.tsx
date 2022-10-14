import { Nav } from "components";
import { EthNetworkContext } from "context";
import { ROLE_IDENTIFICATOR } from "lib/constants/roles";
import { PATH } from "lib/constants/routes";
import { ErrorPage, Users } from "pages";
import Login from "pages/Login/Login";
import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { SessionContext } from "../context/SessionProvider/SessionProvider";

const loginRouter = createBrowserRouter([
  {
    path: PATH.root,
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

const adminRouter = createBrowserRouter([
  {
    path: PATH.root,
    element: <Nav />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATH.dashboard,
        element: <Users/>,
      },
    ],
  },
]);

const Routes = () => {
  const { loggedUser } = React.useContext(SessionContext);
  const [router, setRouter] = React.useState(loginRouter);

  const changeRouter = () => {
    switch (loggedUser?.roleId) {
      case ROLE_IDENTIFICATOR.ADMIN.toString():
        setRouter(adminRouter);
        break;

      default:
        break;
    }
  };

  React.useEffect(() => {
    if (Boolean(loggedUser)) {
      changeRouter();
    }
  }, [loggedUser]);

  return <RouterProvider router={router} />;
};

export default Routes;
