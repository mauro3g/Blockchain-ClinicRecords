import {
  Typography,
  Paper,
  Snackbar,
  Alert,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { AppDataContext } from "context";
import { useValues } from "hooks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ISickness, ISicknessRequest } from "types/ClinicRecords";
import { IMessageConfig } from "types/feedback";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";

interface Props {
  patientIdentification: string;
  edit?: boolean;
  savedSickness?: ISickness;
}

const initialFormValues = {
  registerDate: "",
  initialDate: "",
  sicknessName: "",
  diagnostic: "",
  startWay: "",
  course: "",
  signsSymtoms: "",
  treatment: "",
  sicknessIdentifier: "",
};

const CRSicknessForm = (props: Props) => {
  const { patientIdentification, edit, savedSickness } = props;
  const { crSickness, requestRegisterSickness, getSicknessByIdentification } =
    React.useContext(AppDataContext);
  const [messageConfig, setMessageConfig] = React.useState<IMessageConfig>({
    open: false,
    message: "",
    severity: "info",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  const {
    values,
    updateValue: handleChange,
    updateValues,
  } = useValues(initialFormValues);

  const handleSubmit = async () => {
    console.log("handleSubmit register sickness");
    try {
      setLoading(true);
      const newSickness: ISicknessRequest = {
        registerDate: new Date().getTime(),
        initialDate: values["initialDate"],
        sicknessName: values["sicknessName"],
        diagnostic: values["diagnostic"],
        startWay: values["startWay"],
        course: values["course"],
        signsSymtoms: values["signsSymtoms"],
        treatment: values["treatment"],
        sicknessIdentifier:
          patientIdentification +
          "_" +
          values["sicknessName"] +
          crSickness.length,
      };
      await requestRegisterSickness(newSickness, patientIdentification);
      await getSicknessByIdentification(patientIdentification);
      updateValues(initialFormValues);
      setMessageConfig({
        open: true,
        message: "Enfermedad registrada!",
        severity: "success",
      });
      setLoading(false);
    } catch (error: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo registrar enfermedad...\n ${error.message}`,
        severity: "error",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Typography variant="h6" noWrap className="flex-grow" sx={{ mt: 5 }}>
        {edit ? "Editar enfermedad" : "Agregar enfermedad"}
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
            <Grid item xs={12}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Nombre de la enfermedad"}
                  onChange={(e) => handleChange("sicknessName", e.target.value)}
                  value={values["sicknessName"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="w-full"
                    label="Fecha de inicio de la enfermedad"
                    value={selectedDate}
                    onChange={(e) => {
                      handleChange(
                        "initialDate",
                        Date.parse(e?.toString() as string)
                      );
                      setSelectedDate(e);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Diagnostico"}
                  onChange={(e) => handleChange("diagnostic", e.target.value)}
                  value={values["diagnostic"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Forma de inicio"}
                  onChange={(e) => handleChange("startWay", e.target.value)}
                  value={values["startWay"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Curso"}
                  onChange={(e) => handleChange("course", e.target.value)}
                  value={values["course"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Signos y síntomas"}
                  onChange={(e) => handleChange("signsSymtoms", e.target.value)}
                  value={values["signsSymtoms"]}
                  autoFocus
                  required
                  multiline
                  rows={6}
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Tratamientos"}
                  onChange={(e) => handleChange("treatment", e.target.value)}
                  value={values["treatment"]}
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

export default CRSicknessForm;
