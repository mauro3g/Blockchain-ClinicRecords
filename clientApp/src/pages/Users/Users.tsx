import { AppDataContext, SessionContext } from "context";
import React from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from "@mui/x-data-grid";
import {
  Alert,
  Box,
  CircularProgress,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
} from "@mui/material";
import { IUser } from "types/Session";
import { IMessageConfig } from "types/feedback";

interface IUserTable {
  id: string;
  username: string;
  address: string;
  state: string;
  role: string;
  options: string;
}

const Users = () => {
  const { users, userRoles, getUsers, getUserRoles } =
    React.useContext(AppDataContext);

  const { roles, sessionValuesActive } = React.useContext(SessionContext);

  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const [selectedUser, setSelectedUser] = React.useState<IUser | undefined>(
    undefined
  );
  const [loadingOption, setLoadingOption] = React.useState(false);
  const [messageConfig, setMessageConfig] = React.useState<IMessageConfig>({
    open: false,
    message: "",
    severity: "info",
  });

  const columns: GridColDef[] = [
    {
      field: "photo",
      headerName: "",
      width: 55,
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <strong>
          <IconButton>
            <Icon>account_circle</Icon>
          </IconButton>
        </strong>
      ),
    },
    { field: "id", headerName: "Id", width: 150 },
    { field: "username", headerName: "Nombre de usuario", width: 200 },
    { field: "address", headerName: "Dirección ETH", width: 400 },
    { field: "state", headerName: "Estado", width: 150 },
    { field: "role", headerName: "Rol", width: 150 },
    {
      field: "options",
      headerName: "",
      minWidth: 50,
      filterable: false,
      sortable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          <IconButton
            aria-label="open drawer"
            onClick={(e) => {
              setSelectedUser(
                users.find((u) => u.id === (params.value as string))
              );
              setActionsAnchorEl(e.currentTarget);
            }}
          >
            <Icon>more_vert</Icon>
          </IconButton>
        </strong>
      ),
    },
  ];

  const searchRoleValues = (userId: string) => {
    const userRole = userRoles.find((ur) => ur.userId === userId);
    const role = roles.find((r) => r.id === userRole?.roleId);
    return role;
  };

  const buildTableRows = React.useMemo(() => {
    const rows: Array<IUserTable> = [];
    users.forEach((user) => {
      const role = searchRoleValues(user.id);
      rows.push({
        id: user.id,
        username: user.username,
        address: user.userAddress,
        state: user.state ? "Activo" : "Inactivo",
        role: role?.name as string,
        options: user.id,
      });
    });
    return rows;
  }, [users]);

  const handleChangeState = () => {};

  React.useEffect(() => {
    const initializeData = () => {
      try {
        getUsers();
        getUserRoles();
      } catch (error: any) {
        setMessageConfig({
          open: true,
          message: error.message,
          severity: "error",
        });
      }
    };

    if (sessionValuesActive) {
      initializeData();
    }
  }, [sessionValuesActive]);

  return (
    <div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={buildTableRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Box>
      <Menu
        anchorEl={actionsAnchorEl}
        open={Boolean(actionsAnchorEl)}
        onClose={() => setActionsAnchorEl(null)}
      >
        {Boolean(selectedUser) && !loadingOption ? (
          <MenuItem onClick={handleChangeState} dense>
            {selectedUser?.state ? "Desactivar usuario" : "Activar usuario"}
          </MenuItem>
        ) : (
          <MenuItem
            sx={{
              width: 215,
              height: 35,
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <CircularProgress sx={{ padding: 1 }} />{" "}
          </MenuItem>
        )}
      </Menu>
      <Snackbar
        open={messageConfig.open}
        autoHideDuration={8000}
        onClose={() => setMessageConfig({ ...messageConfig, open: false })}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Alert
          onClose={() => setMessageConfig({ ...messageConfig, open: false })}
          severity={messageConfig.severity}
        >
          {messageConfig.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Users;
