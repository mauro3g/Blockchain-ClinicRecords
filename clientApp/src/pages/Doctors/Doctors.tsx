import {
  IconButton,
  Icon,
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AppDataContext, SessionContext } from "context";
import { PATH } from "lib/constants/routes";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IMessageConfig } from "types/feedback";
import { IUser } from "types/Session";
import { ROLE_IDENTIFICATOR } from "lib/constants/roles";
import { IMedical } from "../../types/UsersInformation";
import { Transition, UsersForm } from "components";
import MedicalForm from "../../components/MedicalForm/MedicalForm";

interface IDoctorTable {
  id: string;
  username: string;
  name: string;
  speciality: string;
  identificationNumber: string;
  birthDate: string;
  gender: string;
  options: string | undefined;
}

const Doctors = () => {
  const { users, userRoles, medicals, getMedicals, getUsers, getUserRoles } =
    React.useContext(AppDataContext);
  const { roles, sessionValuesActive, openNav } =
    React.useContext(SessionContext);
  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [selectedUser, setSelectedUser] = React.useState<IUser | undefined>(
    undefined
  );
  const [doctorsTable, setDoctorsTable] = React.useState<Array<IDoctorTable>>(
    []
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
    { field: "name", headerName: "Nombre y Apellido", width: 200 },
    { field: "speciality", headerName: "Especialidad", width: 150 },
    { field: "identificationNumber", headerName: "Identificación", width: 150 },
    { field: "birthDate", headerName: "Fecha de nacimiento", width: 150 },
    { field: "gender", headerName: "Género", width: 150 },
    {
      field: "options",
      headerName: "",
      minWidth: 50,
      filterable: false,
      sortable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        if (params.value) {
          return (
            <strong>
              <IconButton
                aria-label="open drawer"
                disabled={
                  medicals.findIndex((m) => m.userId === params.value) >= 0
                }
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
          );
        } else {
          return undefined;
        }
      },
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

  const handleCompleteInfo = () => {
    navigate(`${PATH.dashboard}${PATH.doctors}${PATH.medicalInfo}`);
  };

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

  React.useEffect(() => {
    const invoqueGetMedicals = async () => {
      try {
        const medicalUsers = users.filter((u) => {
          const role = searchRoleValues(u.id);
          return role?.id === ROLE_IDENTIFICATOR.DOCTOR;
        });
        if (Boolean(medicalUsers) && medicalUsers.length > 0) {
          await getMedicals();
        }
      } catch (error: any) {
        setMessageConfig({
          open: true,
          message: error.message,
          severity: "error",
        });
      }
    };
    if (users && users.length > 0) {
      invoqueGetMedicals();
    }
  }, [users]);

  React.useEffect(() => {
    const buildTableRows = (_medicals: any) => {
      const rows: Array<IDoctorTable> = [];
      users.forEach((user) => {
        const role = searchRoleValues(user.id);
        if (role?.id === ROLE_IDENTIFICATOR.DOCTOR) {
          let medicalInfo: IMedical | undefined = _medicals.find(
            (m) => m.userId === user.id
          );

          rows.push({
            id: user.id,
            username: user.username,
            name: medicalInfo?.personalInformation.name as string,
            speciality: medicalInfo?.speciality as string,
            identificationNumber: medicalInfo?.personalInformation
              .identificationNumber as string,
            birthDate: new Date(
              parseInt(medicalInfo?.personalInformation.birthDate as string)
            ).toLocaleDateString(),
            gender: medicalInfo?.personalInformation.gender as string,
            options: user.id,
          });
        }
      });
      console.log("rows ", rows);
      return rows;
    };
    setDoctorsTable(buildTableRows(medicals));
  }, [medicals]);

  return (
    <div>
      <div className="flex items-center">
        <div className="flex-grow flex items-center">
          <Typography variant="subtitle1" color="textSecondary">
            {"Doctores"}
          </Typography>
        </div>
      </div>
      <Box sx={{ height: 600, width: "100%", mt: 3 }}>
        <DataGrid
          rows={doctorsTable}
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
          <MenuItem onClick={handleCompleteInfo} dense>
            {"Completar información de Médico"}
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
          `${PATH.dashboard}${PATH.doctors}${PATH.medicalInfo}`
        )}
        onClose={() => navigate(-1)}
        TransitionComponent={Transition}
        style={{
          width: `calc(100vw - ${openNav ? "240px" : "0"})`,
          marginLeft: openNav ? 240 : 0,
        }}
        classes={{ paper: "dialog-paper-full-width" }}
      >
        <MedicalForm savedUser={selectedUser as IUser} />
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

export default Doctors;
