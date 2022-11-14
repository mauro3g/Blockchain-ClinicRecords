import {
  Typography,
  Paper,
  Grid,
  Box,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { AppDataContext } from "context";
import { useValues } from "hooks";
import React from "react";
import {
  IPatologicalHistory,
  IPatologicalHistoryRequest,
} from "types/ClinicRecords";
import { IMessageConfig } from "types/feedback";

interface Props {
  patientIdentification: string;
  edit?: boolean;
  savedPatologicalHistory?: IPatologicalHistory;
}

const initialFormValues = {
  date: "",
  congenitalDiseases: "",
  childhoodDiseases: "",
  surgicals: "",
  transfusions: "",
  drugAllergy: "",
  harmfullHabits: "",
  hospitalizations: "",
  other: "",
};

const CRPatologicalHistoryForm = (props: Props) => {
  const { patientIdentification, edit, savedPatologicalHistory } = props;
  const {
    requestRegisterPatologicalHistory,
    getPatologicalHistoryByIdentification,
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
    console.log("handleSubmit register patologic history");
    try {
      setLoading(true);
      const newPatologicalHistory: IPatologicalHistoryRequest = {
        date: new Date().getTime(),
        congenitalDiseases: values["congenitalDiseases"],
        childhoodDiseases: values["childhoodDiseases"],
        surgicals: values["surgicals"],
        transfusions: values["transfusions"],
        drugAllergy: values["drugAllergy"],
        harmfullHabits: values["harmfullHabits"],
        hospitalizations: values["hospitalizations"],
        other: values["other"],
      };
      await requestRegisterPatologicalHistory(
        newPatologicalHistory,
        patientIdentification
      );
      await getPatologicalHistoryByIdentification(patientIdentification);
      updateValues(initialFormValues);
      setMessageConfig({
        open: true,
        message: "Antecedentes Patológicos registrada!",
        severity: "success",
      });
      setLoading(false);
    } catch (error: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo registrar antecedentes patológicos...\n ${error.message}`,
        severity: "error",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Typography variant="h6" noWrap className="flex-grow" sx={{ mt: 5 }}>
        {edit
          ? "Editar Antecedentes Patológicos"
          : "Agregar Antecedentes Patológicos"}
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
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Enfermedades congénitas"}
                  onChange={(e) =>
                    handleChange("congenitalDiseases", e.target.value)
                  }
                  value={values["congenitalDiseases"]}
                  autoFocus
                  required
                  multiline
                  rows={3}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Enfermedades infancia"}
                  onChange={(e) =>
                    handleChange("childhoodDiseases", e.target.value)
                  }
                  value={values["childhoodDiseases"]}
                  autoFocus
                  required
                  multiline
                  rows={3}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Cirujias"}
                  onChange={(e) => handleChange("surgicals", e.target.value)}
                  value={values["surgicals"]}
                  autoFocus
                  required
                  multiline
                  rows={3}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Transfusiones"}
                  onChange={(e) => handleChange("transfusions", e.target.value)}
                  value={values["transfusions"]}
                  autoFocus
                  required
                  multiline
                  rows={3}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Alergia a Medicamentos"}
                  onChange={(e) => handleChange("drugAllergy", e.target.value)}
                  value={values["drugAllergy"]}
                  autoFocus
                  required
                  multiline
                  rows={3}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Hábitos nocivos"}
                  onChange={(e) =>
                    handleChange("harmfullHabits", e.target.value)
                  }
                  value={values["harmfullHabits"]}
                  autoFocus
                  required
                  multiline
                  rows={3}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Hospitalizaciones"}
                  onChange={(e) =>
                    handleChange("hospitalizations", e.target.value)
                  }
                  value={values["hospitalizations"]}
                  autoFocus
                  required
                  multiline
                  rows={3}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Otros"}
                  onChange={(e) => handleChange("other", e.target.value)}
                  value={values["other"]}
                  autoFocus
                  required
                  multiline
                  rows={3}
                />
              </Box>
            </Grid>
          </Grid>
          <Button
            disabled={loading}
            disableElevation
            type="submit"
            variant="contained"
            color="primary"
            sx={{mt:2}}
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

export default CRPatologicalHistoryForm;
