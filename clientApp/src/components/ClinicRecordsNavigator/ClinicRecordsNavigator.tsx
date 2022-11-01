import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  FormControlLabel,
  FormGroup,
  Icon,
  Switch,
  TextField,
} from "@mui/material";
import {
  CRBiologicFunctions,
  CRClinicalAssessment,
  CRCommentary,
  CRPatologicalHistory,
  CRPersonalData,
  CRPhysicalExam,
  CRSyndromesGeriatricProblems,
} from "components";
import { IPatient } from "types/UsersInformation";
import { AppDataContext } from "context";
import CRSickness from "../CRSickness/CRSickness";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const ClinicRecordsNavigator = () => {
  const {
    patients,
    getSicknessByIdentification,
    getBiologicFunctionsByIdentification,
    getPatologicalHistoryByIdentification,
    getPhysicalExamByIdentification,
    getSyndromesGeriatricProblemsByIdentification,
    getClinicalAssessmentByIdentification,
    getCommentaryByIdentification,
  } = React.useContext(AppDataContext);

  const [identification, setIdentification] = React.useState("");
  const [tableOption, setTableOption] = React.useState(0);
  const [dateRange, setDateRange] = React.useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [activeDatePicker, setActiveDatePicker] = React.useState(false);

  const [selectedPatient, setSelectedPatient] = React.useState<
    IPatient | undefined
  >(undefined);

  const handleChangeTableOption = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTableOption(newValue);
  };

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

  return (
    <div>
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
          <div className="flex w-full items-center">
            <Icon sx={{ mt: 1.5, ml: 1, mr: 2 }}>badge</Icon>
            <TextField
              id="identification-input"
              label="Identificación"
              variant="standard"
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
            />
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
            <Button
              sx={{ ml: 10, mt: 1 }}
              variant="contained"
              endIcon={<Icon>search</Icon>}
              type="submit"
            >
              Buscar
            </Button>
          </div>
        </Box>
      </form>
      {selectedPatient ? (
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: "100%",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={tableOption}
            onChange={handleChangeTableOption}
            aria-label="clinic-records-tabs"
            sx={{ borderRight: 4, borderColor: "divider" }}
          >
            <Tab label="Datos Personales" {...a11yProps(0)} />
            <Tab label="Enfermedades" {...a11yProps(1)} />
            <Tab label="Funciones Biológicas" {...a11yProps(2)} />
            <Tab label="Antecedentes Patológicos" {...a11yProps(3)} />
            <Tab label="Exámen Físico" {...a11yProps(4)} />
            <Tab label="Síndromes/Problemas" {...a11yProps(5)} />
            <Tab label="Valoración Clínica" {...a11yProps(6)} />
            <Tab label="Comentarios" {...a11yProps(7)} />
          </Tabs>
          <TabPanel value={tableOption} index={0}>
            <CRPersonalData patient={selectedPatient} />
          </TabPanel>
          <TabPanel value={tableOption} index={1}>
            <Box sx={{ width: "70vw" }}>
              <CRSickness
                activeDatePicker={activeDatePicker}
                startDate={startDate}
                endDate={endDate}
              />
            </Box>
          </TabPanel>
          <TabPanel value={tableOption} index={2}>
            <Box sx={{ width: "70vw" }}>
              <CRBiologicFunctions
                activeDatePicker={activeDatePicker}
                startDate={startDate}
                endDate={endDate}
              />
            </Box>
          </TabPanel>
          <TabPanel value={tableOption} index={3}>
            <Box sx={{ width: "70vw" }}>
              <CRPatologicalHistory
                activeDatePicker={activeDatePicker}
                startDate={startDate}
                endDate={endDate}
              />
            </Box>
          </TabPanel>
          <TabPanel value={tableOption} index={4}>
            <Box sx={{ width: "70vw" }}>
              <CRPhysicalExam
                activeDatePicker={activeDatePicker}
                startDate={startDate}
                endDate={endDate}
              />
            </Box>
          </TabPanel>
          <TabPanel value={tableOption} index={5}>
            <Box sx={{ width: "70vw" }}>
              <CRSyndromesGeriatricProblems
                activeDatePicker={activeDatePicker}
                startDate={startDate}
                endDate={endDate}
              />
            </Box>
          </TabPanel>
          <TabPanel value={tableOption} index={6}>
            <Box sx={{ width: "70vw" }}>
              <CRClinicalAssessment
                activeDatePicker={activeDatePicker}
                startDate={startDate}
                endDate={endDate}
              />
            </Box>
          </TabPanel>
          <TabPanel value={tableOption} index={7}>
            <Box sx={{ width: "70vw" }}>
              <CRCommentary
                activeDatePicker={activeDatePicker}
                startDate={startDate}
                endDate={endDate}
              />
            </Box>
          </TabPanel>
        </Box>
      ) : (
        <div>No existe informacion disponible</div>
      )}
    </div>
  );
};

export default ClinicRecordsNavigator;
