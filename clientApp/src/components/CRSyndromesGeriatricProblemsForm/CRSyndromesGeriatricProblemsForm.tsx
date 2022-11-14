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
import { Dayjs } from "dayjs";
import { useValues } from "hooks";
import React from "react";
import {
  ISyndromesGeriatricProblems,
  ISyndromesGeriatricProblemsRequest,
} from "types/ClinicRecords";
import { IMessageConfig } from "types/feedback";

interface Props {
  patientIdentification: string;
  edit?: boolean;
  savedSyndromesGeriatricProblems?: ISyndromesGeriatricProblems;
}

const initialFormValues = {
  date: "",
  delirium: "",
  vertigo: "",
  syncope: "",
  incontinence: "",
  hearingDeprivation: "",
  chronicProtraction: "",
  insomnia: "",
  constipation: "",
  falls: "",
  prostatism: "",
  chronicPain: "",
};

const CRSyndromesGeriatricProblemsForm = (props: Props) => {
  const { patientIdentification, edit, savedSyndromesGeriatricProblems } =
    props;

  const {
    requestRegisterSyndromesGeriatricProblems,
    getSyndromesGeriatricProblemsByIdentification,
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
    console.log("handleSubmit register SyndromesGeriatricProblems");
    try {
      setLoading(true);
      const newSyndromes: ISyndromesGeriatricProblemsRequest = {
        date: new Date().getTime(),
        delirium: values["delirium"],
        vertigo: values["vertigo"],
        syncope: values["syncope"],
        incontinence: values["incontinence"],
        hearingDeprivation: values["hearingDeprivation"],
        chronicProtraction: values["chronicProtraction"],
        insomnia: values["insomnia"],
        constipation: values["constipation"],
        falls: values["falls"],
        prostatism: values["prostatism"],
        chronicPain: values["chronicPain"],
      };
      await requestRegisterSyndromesGeriatricProblems(
        newSyndromes,
        patientIdentification
      );
      await getSyndromesGeriatricProblemsByIdentification(
        patientIdentification
      );
      updateValues(initialFormValues);
      setMessageConfig({
        open: true,
        message: "Sind y prob. geriatricos registrados!",
        severity: "success",
      });
      setLoading(false);
    } catch (error: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo registrar Sind y prob. geriatricos...\n ${error.message}`,
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
          ? "Editar Síndromes y problemas geriátricos"
          : "Agregar Síndromes y problemas geriátricos"}
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
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Delirio"}
                  onChange={(e) => handleChange("delirium", e.target.value)}
                  value={values["delirium"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Vértigo"}
                  onChange={(e) => handleChange("vertigo", e.target.value)}
                  value={values["vertigo"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Sincope"}
                  onChange={(e) => handleChange("syncope", e.target.value)}
                  value={values["syncope"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Incontinencia"}
                  onChange={(e) => handleChange("incontinence", e.target.value)}
                  value={values["incontinence"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Deprivación auditiva"}
                  onChange={(e) => handleChange("hearingDeprivation", e.target.value)}
                  value={values["hearingDeprivation"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Protracción crónica"}
                  onChange={(e) => handleChange("chronicProtraction", e.target.value)}
                  value={values["chronicProtraction"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Insomnio"}
                  onChange={(e) => handleChange("insomnia", e.target.value)}
                  value={values["insomnia"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Estreñimiento"}
                  onChange={(e) => handleChange("constipation", e.target.value)}
                  value={values["constipation"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Caidas"}
                  onChange={(e) => handleChange("falls", e.target.value)}
                  value={values["falls"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Prostatismo"}
                  onChange={(e) => handleChange("prostatism", e.target.value)}
                  value={values["prostatism"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Dolor crónico"}
                  onChange={(e) => handleChange("chronicPain", e.target.value)}
                  value={values["chronicPain"]}
                  required
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

export default CRSyndromesGeriatricProblemsForm;
