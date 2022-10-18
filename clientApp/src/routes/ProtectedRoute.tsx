import { Nav } from "components";
import { SessionContext } from "context";
import { PATH } from "lib/constants/routes";
import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROLE_IDENTIFICATOR } from '../lib/constants/roles';

interface Props {
  navigateTo: string;
}

const ProtectedRoute = (props: Props) => {
  const { navigateTo } = props;
  const { loggedUser } = React.useContext(SessionContext);

  return (
    <React.Fragment>
      {Boolean(loggedUser) ? (
        <Nav>
          <Outlet />
        </Nav>
      ) : (
        <Navigate to={navigateTo} />
      )}
    </React.Fragment>
  );
};

export default ProtectedRoute;
