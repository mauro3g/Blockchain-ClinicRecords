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
  Button,
  CircularProgress,
  Dialog,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import { IUser } from "types/Session";
import { IMessageConfig } from "types/feedback";
import { PATH } from "lib/constants/routes";
import { Transition, UsersForm } from "components";
import { useLocation, useNavigate } from "react-router-dom";

interface IUserTable {
  id: string;
  username: string;
  address: string;
  state: string;
  role: string;
  options: string;
}

const Users = () => {
  const {
    users,
    userRoles,
    getUsers,
    getUserRoles,
    requestDisableUser,
    requestEnableUser,
  } = React.useContext(AppDataContext);
  const { roles, sessionValuesActive, openNav } =
    React.useContext(SessionContext);
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

  const navigate = useNavigate();
  const location = useLocation();

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

  const searchRoleValues = React.useCallback(
    (userId: string) => {
      const userRole = userRoles.find((ur) => ur.userId === userId);
      const role = roles.find((r) => r.id === userRole?.roleId);
      return role;
    },
    [userRoles, roles]
  );

  const handleChangeState = async () => {
    try {
      let message = "";
      if (selectedUser?.state) {
        await requestDisableUser(selectedUser.userAddress);
        message = "Usuario desactivado";
      } else {
        await requestEnableUser(selectedUser?.userAddress as string);
        message = "Usuario activado";
      }
      await getUsers();
      setMessageConfig({
        open: true,
        message: message,
        severity: "success",
      });
    } catch (error: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo registrar el usuario...\n ${error.message}`,
        severity: "error",
      });
      console.log(error);
    }
  };

  const handleNew = () => {
    navigate(`${PATH.dashboard}${PATH.users}${PATH.new}`);
  };

  const buildTableRows = React.useCallback(() => {
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
  }, [users, searchRoleValues]);

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
      <div className="flex items-center">
        <div className="flex-grow flex items-center">
          <Typography variant="subtitle1" color="textSecondary">
            {"Usuarios"}
          </Typography>
        </div>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          onClick={handleNew}
          size="small"
        >
          <Icon className="mr-2">add</Icon>
          {"Nuevo"}
        </Button>
      </div>
      <Box sx={{ height: 600, width: "100%", mt: 3 }}>
        <DataGrid
          rows={buildTableRows()}
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
      <Dialog
        fullScreen
        open={location.pathname.includes(
          `${PATH.dashboard}${PATH.users}${PATH.new}`
        )}
        onClose={() => navigate(-1)}
        TransitionComponent={Transition}
        style={{
          width: `calc(100vw - ${openNav ? "240px" : "0"})`,
          marginLeft: openNav ? 240 : 0,
        }}
        classes={{ paper: "dialog-paper-full-width" }}
      >
        <UsersForm />
      </Dialog>
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
