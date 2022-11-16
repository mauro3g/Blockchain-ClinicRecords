import {
  Box,
  Typography,
  Icon,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch,
  Button,
  Alert,
  Dialog,
  Snackbar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { ClinicRecordsNavigator, CRExamsResults, Transition } from "components";
import { AppDataContext, SessionContext } from "context";
import React from "react";
import { IPatient } from "types/UsersInformation";
import DatePicker from "react-datepicker";
import ClinicRecordsAdd from "components/ClinicRecordsAdd/ClinicRecordsAdd";
import { PATH } from "lib/constants/routes";
import { IMessageConfig } from "types/feedback";
import { useLocation, useNavigate } from "react-router-dom";
import { ISickness } from "types/ClinicRecords";

const ClinicRecords = () => {
  const {
    patients,
    getPatients,
    getSicknessByIdentification,
    getBiologicFunctionsByIdentification,
    getPatologicalHistoryByIdentification,
    getPhysicalExamByIdentification,
    getSyndromesGeriatricProblemsByIdentification,
    getClinicalAssessmentByIdentification,
    getCommentaryByIdentification,
  } = React.useContext(AppDataContext);

  const { sessionValuesActive, openNav } = React.useContext(SessionContext);

  const [identification, setIdentification] = React.useState("");
  const [dateRange, setDateRange] = React.useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [activeDatePicker, setActiveDatePicker] = React.useState(false);
  const [selectedPatient, setSelectedPatient] = React.useState<
    IPatient | undefined
  >(undefined);
  const [selectedSickness, setSelectedSicness] = React.useState<
    ISickness | undefined
  >(undefined);

  const [messageConfig, setMessageConfig] = React.useState<IMessageConfig>({
    open: false,
    message: "",
    severity: "info",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    const searchPatient: IPatient | undefined = patients.find((p) => {
      return p.personalInformation.identificationNumber === identification;
    });
    if (Boolean(searchPatient)) {
      setSelectedPatient(searchPatient);
    } else {
      setSelectedPatient(undefined);
      console.log("Paciente no encontrado");
    }
  };

  const handleNew = () => {
    navigate(`${PATH.dashboard}${PATH.clinicRecords}${PATH.new}`);
  };

  const handleExamResult = () => {
    navigate(
      `${PATH.dashboard}${PATH.clinicRecords}${PATH.sickness}${PATH.examResult}`
    );
  };

  React.useEffect(() => {
    if (selectedPatient) {
      getSicknessByIdentification(
        selectedPatient.personalInformation.identificationNumber
      );
      getBiologicFunctionsByIdentification(
        selectedPatient.personalInformation.identificationNumber
      );
      getPatologicalHistoryByIdentification(
        selectedPatient.personalInformation.identificationNumber
      );
      getPhysicalExamByIdentification(
        selectedPatient.personalInformation.identificationNumber
      );
      getSyndromesGeriatricProblemsByIdentification(
        selectedPatient.personalInformation.identificationNumber
      );
      getClinicalAssessmentByIdentification(
        selectedPatient.personalInformation.identificationNumber
      );
      getCommentaryByIdentification(
        selectedPatient.personalInformation.identificationNumber
      );
    }
  }, [selectedPatient]);

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

    if (sessionValuesActive && patients.length === 0) {
      initializeData();
    }
  }, [patients, sessionValuesActive]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <Box
          sx={{
            mb: 8,
          }}
        >
          <Typography variant="h6" noWrap className="flex-grow">
            Historias Clinicas
          </Typography>
          <Box
            className="flex items-center justify-center"
            sx={{ width: "90vw" }}
          >
            <div className=" flex items-center">
              <Icon sx={{ mt: 1.5, ml: 1, mr: 2 }}>badge</Icon>
              <TextField
                id="identification-input"
                label="Identificación"
                variant="standard"
                value={identification}
                onChange={(e) => setIdentification(e.target.value)}
              />
              <IconButton sx={{ ml: 1, mt: 1 }} color="primary" type="submit">
                <Icon>search</Icon>
              </IconButton>
              <Icon sx={{ mt: 1.5, ml: 10, mr: 2 }}>date_range</Icon>
              <FormGroup sx={{ mt: 1.5 }}>
                <FormControlLabel
                  control={
                    <Switch
                      value={activeDatePicker}
                      onChange={() => {
                        setActiveDatePicker(!activeDatePicker);
                      }}
                    />
                  }
                  label={activeDatePicker ? "" : "Filtrar por fechas"}
                />
              </FormGroup>
              {activeDatePicker && (
                <Box>
                  <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => {
                      setDateRange(update);
                    }}
                    isClearable={true}
                  />
                </Box>
              )}
            </div>
            {selectedPatient && (
              <Tooltip title="Buscar">
                <Button
                  sx={{ ml: 15 }}
                  disableElevation
                  variant="contained"
                  color="primary"
                  onClick={handleNew}
                  size="medium"
                >
                  <Icon className="mr-2">add</Icon>
                  {"Agregar a la historia"}
                </Button>
              </Tooltip>
            )}
          </Box>
        </Box>
      </form>
      {selectedPatient ? (
        <ClinicRecordsNavigator
          activeDatePicker={activeDatePicker}
          selectedPatient={selectedPatient}
          startDate={startDate}
          endDate={endDate}
          selectedSickness={selectedSickness}
          setSelectedSicness={setSelectedSicness}
          handleExamResult={handleExamResult}
        />
      ) : (
        <Box
          className="flex items-center justify-center"
          sx={{ width: "90vw" }}
        >
          No existe informacion disponible
        </Box>
      )}
      <Dialog
        fullScreen
        open={location.pathname.includes(
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}`
        )}
        onClose={() => navigate(-1)}
        TransitionComponent={Transition}
        style={{
          width: `calc(103vw - ${openNav ? "240px" : "0"})`,
          marginLeft: openNav ? 200 : 0,
        }}
        classes={{ paper: "dialog-paper-full-width" }}
      >
        <ClinicRecordsAdd selectedPatient={selectedPatient} />
      </Dialog>
      <Dialog
        fullScreen
        open={location.pathname.includes(
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.sickness}${PATH.examResult}`
        )}
        onClose={() => navigate(-1)}
        TransitionComponent={Transition}
        style={{
          width: `calc(103vw - ${openNav ? "240px" : "0"})`,
          marginLeft: openNav ? 200 : 0,
        }}
        classes={{ paper: "dialog-paper-full-width" }}
      >
        {selectedSickness && (
          <CRExamsResults selectedSickness={selectedSickness} />
        )}
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
    </>
  );
};

export default ClinicRecords;
