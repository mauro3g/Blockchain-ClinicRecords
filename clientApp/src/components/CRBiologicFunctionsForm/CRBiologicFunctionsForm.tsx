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
  IBiologicFunctions,
  IBiologicFunctionsRequest,
} from "types/ClinicRecords";
import { IMessageConfig } from "types/feedback";

interface Props {
  patientIdentification: string;
  edit?: boolean;
  savedBiologicFunction?: IBiologicFunctions;
}

const initialFormValues = {
  date: "",
  urination: "",
  stools: "",
  appetite: "",
  thirst: "",
  sleep: "",
  other: "",
};

const CRBiologicFunctionsForm = (props: Props) => {
  const { patientIdentification, edit, savedBiologicFunction } = props;
  const {
    requestRegisterBiologicFunctions,
    getBiologicFunctionsByIdentification,
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
    console.log("handleSubmit register biologic functions");
    try {
      setLoading(true);
      const newBiologicFunctions: IBiologicFunctionsRequest = {
        date: new Date().getTime(),
        urination: values["urination"],
        stools: values["stools"],
        appetite: values["appetite"],
        thirst: values["thirst"],
        sleep: values["sleep"],
        other: values["other"],
      };
      await requestRegisterBiologicFunctions(
        newBiologicFunctions,
        patientIdentification
      );
      await getBiologicFunctionsByIdentification(patientIdentification);
      updateValues(initialFormValues);
      setMessageConfig({
        open: true,
        message: "Funciones Biológicas registradas!",
        severity: "success",
      });
      setLoading(false);
    } catch (error: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo registrar funciones biológicas...\n ${error.message}`,
        severity: "error",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Typography variant="h6" noWrap className="flex-grow" sx={{ mt: 5 }}>
        {edit ? "Editar funciones biológicas" : "Agregar funciones biológicas"}
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
                  label={"Micción"}
                  onChange={(e) => handleChange("urination", e.target.value)}
                  value={values["urination"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Deposiciones"}
                  onChange={(e) => handleChange("stools", e.target.value)}
                  value={values["stools"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Apetito"}
                  onChange={(e) => handleChange("appetite", e.target.value)}
                  value={values["appetite"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Sed"}
                  onChange={(e) => handleChange("thirst", e.target.value)}
                  value={values["thirst"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Sueño"}
                  onChange={(e) => handleChange("sleep", e.target.value)}
                  value={values["sleep"]}
                  autoFocus
                  required
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
                  rows={6}
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

export default CRBiologicFunctionsForm;
