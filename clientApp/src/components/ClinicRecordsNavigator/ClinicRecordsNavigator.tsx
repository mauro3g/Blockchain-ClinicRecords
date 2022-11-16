import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "react-datepicker/dist/react-datepicker.css";
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
import CRSickness from "../CRSickness/CRSickness";
import { ISickness } from "types/ClinicRecords";
import { SessionContext } from "context";
import { MODULE_IDENTIFICATOR, PERMISSION_TYPE } from "lib/constants/modules";

interface Props {
  selectedPatient: IPatient;
  activeDatePicker: boolean;
  startDate: Date;
  endDate: Date;
  selectedSickness: ISickness | undefined;
  setSelectedSicness: React.Dispatch<
    React.SetStateAction<ISickness | undefined>
  >;
  handleExamResult: () => void;
}

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

const ClinicRecordsNavigator = (props: Props) => {
  const {
    selectedPatient,
    activeDatePicker,
    startDate,
    endDate,
    selectedSickness,
    setSelectedSicness,
    handleExamResult,
  } = props;
  const { hasPermissions } = React.useContext(SessionContext);

  const [tableOption, setTableOption] = React.useState(0);

  const handleChangeTableOption = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTableOption(newValue);
  };

  return (
    <div>
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
          <Tab
            disabled={
              !hasPermissions(
                MODULE_IDENTIFICATOR.CR_SICKNESS,
                PERMISSION_TYPE.VISUALIZE
              )
            }
            label="Enfermedades"
            {...a11yProps(1)}
          />
          <Tab
            disabled={
              !hasPermissions(
                MODULE_IDENTIFICATOR.CR_BIOLOGIC_FUNCTIONS,
                PERMISSION_TYPE.VISUALIZE
              )
            }
            label="Funciones Biológicas"
            {...a11yProps(2)}
          />
          <Tab
            disabled={
              !hasPermissions(
                MODULE_IDENTIFICATOR.CR_PATOLOGICAL_HISTORY,
                PERMISSION_TYPE.VISUALIZE
              )
            }
            label="Antecedentes Patológicos"
            {...a11yProps(3)}
          />
          <Tab
            disabled={
              !hasPermissions(
                MODULE_IDENTIFICATOR.CR_PHYSYCAL_EXAM,
                PERMISSION_TYPE.VISUALIZE
              )
            }
            label="Exámen Físico"
            {...a11yProps(4)}
          />
          <Tab
            disabled={
              !hasPermissions(
                MODULE_IDENTIFICATOR.CR_SYNDROMES_GERIATRIC,
                PERMISSION_TYPE.VISUALIZE
              )
            }
            label="Síndromes/Problemas"
            {...a11yProps(5)}
          />
          <Tab
            disabled={
              !hasPermissions(
                MODULE_IDENTIFICATOR.CR_CLINICAL_ASSESSMENT,
                PERMISSION_TYPE.VISUALIZE
              )
            }
            label="Valoración Clínica"
            {...a11yProps(6)}
          />
          <Tab
            disabled={
              !hasPermissions(
                MODULE_IDENTIFICATOR.CR_COMMENTARY,
                PERMISSION_TYPE.VISUALIZE
              )
            }
            label="Comentarios"
            {...a11yProps(7)}
          />
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
              selectedSickness={selectedSickness}
              setSelectedSicness={setSelectedSicness}
              handleExamResult={handleExamResult}
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
    </div>
  );
};

export default ClinicRecordsNavigator;
