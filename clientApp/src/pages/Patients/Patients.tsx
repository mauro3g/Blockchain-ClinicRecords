import {
  IconButton,
  Icon,
  Alert,
  Box,
  CircularProgress,
  Dialog,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { PatientsForm, Transition } from "components";
import MedicalForm from "components/MedicalForm/MedicalForm";
import { AppDataContext, SessionContext } from "context";
import { PATH } from "lib/constants/routes";
import { stringAvatar } from "lib/utils/avatar";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IMessageConfig } from "types/feedback";
import { IUser } from "types/Session";
import { IPatient } from "../../types/UsersInformation";

interface IPatientsTable {
  photo: string;
  id: string;
  name: string;
  identificationNumber: string;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  occupation: string;
  direction: string;
  contactPerson: string;
  phone: string;
  options: string | undefined;
}

const Patients = () => {
  const { patients, getPatients } = React.useContext(AppDataContext);
  const { sessionValuesActive, openNav } = React.useContext(SessionContext);
  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [selectedPatient, setSelectedPatient] = React.useState<
    IPatient | undefined
  >(undefined);
  const [patinetsTable, setPatientsTable] = React.useState<
    Array<IPatientsTable>
  >([]);
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
      renderCell: (params: GridRenderCellParams) => (
        <strong>
          <Avatar {...stringAvatar(params.value as string)} />
        </strong>
      ),
    },
    { field: "id", headerName: "N°", width: 50 },
    { field: "name", headerName: "Nombre y Apellido", width: 200 },
    { field: "identificationNumber", headerName: "Identificación", width: 150 },
    { field: "birthDate", headerName: "Fecha de nacimiento", width: 150 },
    { field: "gender", headerName: "Género", width: 150 },
    { field: "maritalStatus", headerName: "Estado civil", width: 150 },
    { field: "occupation", headerName: "Ocupación", width: 150 },
    { field: "direction", headerName: "Dirección", width: 150 },
    { field: "contactPerson", headerName: "Contácto", width: 150 },
    { field: "phone", headerName: "Teléfono", width: 150 },
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
                onClick={(e) => {
                  setSelectedPatient(
                    patients.find(
                      (u) =>
                        u.personalInformation.identificationNumber.toString() ===
                        (params.value as string)
                    )
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

  const handleNew = () => {
    navigate(`${PATH.dashboard}${PATH.patients}${PATH.new}`);
  };

  const handleViewClinicalRecords = (identification: string) => {
    navigate(`${PATH.dashboard}${PATH.clinicRecords}${identification}`);
  };

  React.useEffect(() => {
    const initializeData = () => {
      try {
        getPatients();
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
  }, []);

  React.useEffect(() => {
    const buildTableRows = () => {
      const rows: Array<IPatientsTable> = [];
      patients.forEach((patient, index) => {
        rows.push({
          photo: patient.personalInformation.name as string,
          id: (index + 1).toString(),
          name: patient.personalInformation.name as string,
          identificationNumber:
            patient.personalInformation.identificationNumber,
          birthDate: new Date(
            parseInt(patient.personalInformation.birthDate)
          ).toLocaleDateString(),
          gender: patient.personalInformation.gender,
          maritalStatus: patient.maritalStatus,
          occupation: patient.occupation,
          direction: patient.direction,
          contactPerson: patient.contactPerson,
          phone: patient.phone,
          options: patient.personalInformation.identificationNumber.toString(),
        });
      });
      console.log("rows ", rows);
      return rows;
    };
    setPatientsTable(buildTableRows());
  }, [patients]);

  return (
    <div>
      <div className="flex items-center">
        <div className="flex-grow flex items-center">
          <Typography variant="subtitle1" color="textSecondary">
            {"Pacientes"}
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
          rows={patinetsTable}
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
        {Boolean(selectedPatient) && !loadingOption ? (
          <MenuItem
            onClick={() =>
              handleViewClinicalRecords(
                selectedPatient?.personalInformation.identificationNumber.toString() as string
              )
            }
            dense
          >
            {"Ver historial médico"}
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
          `${PATH.dashboard}${PATH.patients}${PATH.new}`
        )}
        onClose={() => navigate(-1)}
        TransitionComponent={Transition}
        style={{
          width: `calc(100vw - ${openNav ? "240px" : "0"})`,
          marginLeft: openNav ? 240 : 0,
        }}
        classes={{ paper: "dialog-paper-full-width" }}
      >
        <PatientsForm savedPatient={selectedPatient as IPatient} />
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

export default Patients;
