import {
  AppBar,
  Box,
  Button,
  Grid,
  Icon,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { IPatient } from "types/UsersInformation";
import { useNavigate, useLocation } from "react-router-dom";
import { PATH } from "lib/constants/routes";
import {
  CRBiologicFunctionsForm,
  CRClinicalAssessmentForm,
  CRCommentaryForm,
  CRExamsResultsForm,
  CRPatologicalHistoryForm,
  CRPhysicalExamForm,
  CRSicknessForm,
  CRSyndromesGeriatricProblemsForm,
} from "components";
import { AppDataContext, SessionContext } from "context";
import { MODULE_IDENTIFICATOR, PERMISSION_TYPE } from "lib/constants/modules";

interface Props {
  selectedPatient: IPatient | undefined;
}

const ClinicRecordsAdd = (props: Props) => {
  const { selectedPatient } = props;
  const { crSickness } = React.useContext(AppDataContext);
  const { hasPermissions } = React.useContext(SessionContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNewSickness = () => {
    navigate(
      `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.sickness}`
    );
  };

  const handleNewExamResult = () => {
    navigate(
      `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.examResult}`
    );
  };

  const handleNewBiologicFunction = () => {
    navigate(
      `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.biologicFunctions}`
    );
  };

  const handleNewPatological = () => {
    navigate(
      `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.patologicalHistory}`
    );
  };

  const handleNewPhysicalExam = () => {
    navigate(
      `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.physicalExam}`
    );
  };

  const handleNewSindromeProblems = () => {
    navigate(
      `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.syndromesGeriatric}`
    );
  };

  const handleNewClinicalAssesment = () => {
    navigate(
      `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.clinicalAssessment}`
    );
  };

  const handleNewCommentary = () => {
    navigate(
      `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.commentary}`
    );
  };

  return (
    <div>
      <div className="w-full h-full flex flex-col items-center justify-center">
        <AppBar position="sticky" color="inherit">
          <Toolbar>
            <Typography variant="h6" noWrap className="flex-grow">
              {`Historial Clínico | ${selectedPatient?.personalInformation.name} ${selectedPatient?.personalInformation.identificationNumber}`}
            </Typography>
            <Tooltip title="Cerrar formulario" arrow>
              <IconButton
                onClick={() =>
                  navigate(`${PATH.dashboard}${PATH.clinicRecords}`)
                }
              >
                <Icon>close</Icon>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
        {location.pathname ===
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}` && (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Typography variant="h4" sx={{ mt: 15 }}>
              Agregar al historial clinico
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 5, fontSize: "1.54rem" }}>
              Seleccione una opcion
            </Typography>
            <Box sx={{ flexGrow: 1, mt: 8, mx: 10 }}>
              <Grid
                container
                spacing={{ md: 0 }}
                rowGap={{ md: 8 }}
                columns={{ md: 8 }}
              >
                <Grid item xs={2}>
                  <Button
                    sx={{ width: 250, height: 60 }}
                    variant="outlined"
                    size="large"
                    startIcon={<Icon>coronavirus</Icon>}
                    onClick={handleNewSickness}
                    disabled={
                      !hasPermissions(
                        MODULE_IDENTIFICATOR.CR_SICKNESS,
                        PERMISSION_TYPE.CREATE
                      )
                    }
                  >
                    Enfermedades
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{ width: 250, height: 60 }}
                    variant="outlined"
                    size="large"
                    startIcon={<Icon>monitor_heart</Icon>}
                    onClick={handleNewExamResult}
                    disabled={
                      crSickness.length === 0 ||
                      !hasPermissions(
                        MODULE_IDENTIFICATOR.CR_EXAM_RESULT,
                        PERMISSION_TYPE.CREATE
                      )
                    }
                  >
                    Exámenes/Resultados
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{ width: 250, height: 60 }}
                    variant="outlined"
                    size="large"
                    startIcon={<Icon>attribution</Icon>}
                    onClick={handleNewBiologicFunction}
                    disabled={
                      !hasPermissions(
                        MODULE_IDENTIFICATOR.CR_BIOLOGIC_FUNCTIONS,
                        PERMISSION_TYPE.CREATE
                      )
                    }
                  >
                    Funciones Biológicas
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{ width: 250, height: 60 }}
                    variant="outlined"
                    size="large"
                    startIcon={<Icon>work_history</Icon>}
                    onClick={handleNewPatological}
                    disabled={
                      !hasPermissions(
                        MODULE_IDENTIFICATOR.CR_PATOLOGICAL_HISTORY,
                        PERMISSION_TYPE.CREATE
                      )
                    }
                  >
                    Antecedentes Patológicos
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{ width: 250, height: 60 }}
                    variant="outlined"
                    size="large"
                    startIcon={<Icon>medical_information</Icon>}
                    onClick={handleNewPhysicalExam}
                    disabled={
                      !hasPermissions(
                        MODULE_IDENTIFICATOR.CR_PHYSYCAL_EXAM,
                        PERMISSION_TYPE.CREATE
                      )
                    }
                  >
                    Exámen Físico
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{ width: 250, height: 60 }}
                    variant="outlined"
                    size="large"
                    startIcon={<Icon>elderly</Icon>}
                    onClick={handleNewSindromeProblems}
                    disabled={
                      !hasPermissions(
                        MODULE_IDENTIFICATOR.CR_SYNDROMES_GERIATRIC,
                        PERMISSION_TYPE.CREATE
                      )
                    }
                  >
                    Síndromes/Problemas
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{ width: 250, height: 60 }}
                    variant="outlined"
                    size="large"
                    startIcon={<Icon>local_pharmacy</Icon>}
                    onClick={handleNewClinicalAssesment}
                    disabled={
                      !hasPermissions(
                        MODULE_IDENTIFICATOR.CR_CLINICAL_ASSESSMENT,
                        PERMISSION_TYPE.CREATE
                      )
                    }
                  >
                    Valoración Clínica
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    sx={{ width: 250, height: 60 }}
                    variant="outlined"
                    size="large"
                    startIcon={<Icon>comment</Icon>}
                    onClick={handleNewCommentary}
                    disabled={
                      !hasPermissions(
                        MODULE_IDENTIFICATOR.CR_COMMENTARY,
                        PERMISSION_TYPE.CREATE
                      )
                    }
                  >
                    Comentarios
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
        )}
        {location.pathname ===
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.sickness}` &&
          selectedPatient && (
            <CRSicknessForm
              patientIdentification={
                selectedPatient?.personalInformation.identificationNumber
              }
            />
          )}
        {location.pathname ===
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.examResult}` &&
          selectedPatient && (
            <CRExamsResultsForm
              patientIdentification={
                selectedPatient?.personalInformation.identificationNumber
              }
            />
          )}
        {location.pathname ===
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.biologicFunctions}` &&
          selectedPatient && (
            <CRBiologicFunctionsForm
              patientIdentification={
                selectedPatient?.personalInformation.identificationNumber
              }
            />
          )}
        {location.pathname ===
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.patologicalHistory}` &&
          selectedPatient && (
            <CRPatologicalHistoryForm
              patientIdentification={
                selectedPatient?.personalInformation.identificationNumber
              }
            />
          )}
        {location.pathname ===
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.physicalExam}` &&
          selectedPatient && (
            <CRPhysicalExamForm
              patientIdentification={
                selectedPatient?.personalInformation.identificationNumber
              }
            />
          )}
        {location.pathname ===
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.syndromesGeriatric}` &&
          selectedPatient && (
            <CRSyndromesGeriatricProblemsForm
              patientIdentification={
                selectedPatient?.personalInformation.identificationNumber
              }
            />
          )}
        {location.pathname ===
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.clinicalAssessment}` &&
          selectedPatient && (
            <CRClinicalAssessmentForm
              patientIdentification={
                selectedPatient?.personalInformation.identificationNumber
              }
            />
          )}
        {location.pathname ===
          `${PATH.dashboard}${PATH.clinicRecords}${PATH.new}${PATH.commentary}` &&
          selectedPatient && (
            <CRCommentaryForm
              patientIdentification={
                selectedPatient?.personalInformation.identificationNumber
              }
            />
          )}
      </div>
    </div>
  );
};

export default ClinicRecordsAdd;
