import {
  Typography,
  Paper,
  Grid,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { AppDataContext } from "context";
import { useValues } from "hooks";
import React from "react";
import {
  IClinicalAssessment,
  IClinicalAssessmentRequest,
} from "types/ClinicRecords";
import { IMessageConfig } from "types/feedback";

interface Props {
  patientIdentification: string;
  edit?: boolean;
  savedClinicalAssessment?: IClinicalAssessment;
}

const initialFormValues = {
  date: "",
  bath: "",
  dress: "",
  hygienicService: "",
  movilization: "",
  incontinence: "",
  feeding: "",
};

interface RadioProps {
  values: any;
  formValueName: string;
  handleChange: (key: string, value: any) => void;
}

const ClinicalAssessmnentRadio = (props: RadioProps) => {
  const { values, formValueName, handleChange } = props;
  const getRadioValue = (value: boolean): string => {
    if (value) {
      return "si";
    } else {
      return "no";
    }
  };

  const setRadioValue = (strValue: string) => {
    if (strValue === "si") {
      handleChange(formValueName, true);
    } else if (strValue === "no") {
      handleChange(formValueName, false);
    }
  };

  return (
    <RadioGroup
      row
      value={getRadioValue(values[formValueName])}
      onChange={(e) => setRadioValue(e.target.value)}
    >
      <FormControlLabel value={"no"} control={<Radio />} label="Dependiente" />
      <FormControlLabel
        value={"si"}
        control={<Radio />}
        label="Independiente"
      />
    </RadioGroup>
  );
};

const CRClinicalAssessmentForm = (props: Props) => {
  const { patientIdentification, edit, savedClinicalAssessment } = props;
  const {
    requestRegisterClinicalAssessment,
    getClinicalAssessmentByIdentification,
  } = React.useContext(AppDataContext);
  const [messageConfig, setMessageConfig] = React.useState<IMessageConfig>({
    open: false,
    message: "",
    severity: "info",
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    values,
    updateValue: handleChange,
    updateValues,
  } = useValues(initialFormValues);

  const handleSubmit = async () => {
    console.log("handleSubmit register ClinicalAssessment");
    try {
      setLoading(true);
      const newClinicalAssessment: IClinicalAssessmentRequest = {
        date: new Date().getTime(),
        bath: values["bath"],
        dress: values["dress"],
        hygienicService: values["hygienicService"],
        movilization: values["movilization"],
        incontinence: values["incontinence"],
        feeding: values["feeding"],
      };
      await requestRegisterClinicalAssessment(
        newClinicalAssessment,
        patientIdentification
      );
      await getClinicalAssessmentByIdentification(patientIdentification);
      updateValues(initialFormValues);
      setMessageConfig({
        open: true,
        message: "Valoración clínica registrada!",
        severity: "success",
      });
      setLoading(false);
    } catch (error: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo registrar valoración clínica...\n ${error.message}`,
        severity: "error",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Typography variant="h6" noWrap className="flex-grow" sx={{ mt: 5 }}>
        {edit ? "Editar Valoración clínica" : "Agregar Valoración clínica"}
      </Typography>
      <form
        className="flex-grow flex justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Paper
          elevation={4}
          className={"flex justify-center items-center"}
          style={{
            minWidth: 300,
            minHeight: "70vh",
            width: "50vw",
            padding: 40,
            flexWrap: "wrap",
            marginTop: 30,
          }}
        >
          <Grid container rowSpacing={0} columnSpacing={{ xs: 0 }}>
            <Grid item xs={6}>
              <Box sx={{ mx: 2, my: 1.5 }}>
                <FormControl required>
                  <FormLabel id="controlled-radio-buttons-group">
                    Bañarse
                  </FormLabel>
                  <ClinicalAssessmnentRadio
                    formValueName={"bath"}
                    values={values}
                    handleChange={handleChange}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 2, my: 1.5 }}>
                <FormControl required>
                  <FormLabel id="controlled-radio-buttons-group">
                    Vestirse
                  </FormLabel>
                  <ClinicalAssessmnentRadio
                    formValueName={"dress"}
                    values={values}
                    handleChange={handleChange}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 2, my: 1.5 }}>
                <FormControl required>
                  <FormLabel id="controlled-radio-buttons-group">
                    Uso del servicio higiénico
                  </FormLabel>
                  <ClinicalAssessmnentRadio
                    formValueName={"hygienicService"}
                    values={values}
                    handleChange={handleChange}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 2, my: 1.5 }}>
                <FormControl required>
                  <FormLabel id="controlled-radio-buttons-group">
                    Incontinencia
                  </FormLabel>
                  <ClinicalAssessmnentRadio
                    formValueName={"movilization"}
                    values={values}
                    handleChange={handleChange}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 2, my: 1.5 }}>
                <FormControl required>
                  <FormLabel id="controlled-radio-buttons-group">
                    Incontinencia
                  </FormLabel>
                  <ClinicalAssessmnentRadio
                    formValueName={"incontinence"}
                    values={values}
                    handleChange={handleChange}
                  />
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 2, my: 1.5 }}>
                <FormControl required>
                  <FormLabel id="controlled-radio-buttons-group">
                    Alimentacion
                  </FormLabel>
                  <ClinicalAssessmnentRadio
                    formValueName={"feeding"}
                    values={values}
                    handleChange={handleChange}
                  />
                </FormControl>
              </Box>
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            disableElevation
            type="submit"
            variant="contained"
            color="primary"
          >
            {loading ? (
              <CircularProgress
                style={{ color: "white" }}
                size={20}
                className="my-1"
                thickness={10}
              />
            ) : (
              "Guardar"
            )}
          </Button>
        </Paper>
      </form>
      <Snackbar
        open={messageConfig.open}
        autoHideDuration={6000}
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

export default CRClinicalAssessmentForm;
