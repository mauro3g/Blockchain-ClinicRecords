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
import { IPhysicalExam, IPhysicalExamRequest } from "types/ClinicRecords";
import { IMessageConfig } from "types/feedback";

interface Props {
  patientIdentification: string;
  edit?: boolean;
  savedPhysicalExam?: IPhysicalExam;
}

const initialFormValues = {
  date: "",
  bloodPressure: "",
  heartRate: "",
  breathingFrequency: "",
  weight: "",
  size: "",
  imc: "",
  skin: "",
  headNeck: "",
  oral: "",
  chestLungs: "",
  cardiovascular: "",
  abdomen: "",
  genitourinary: "",
  rectalTract: "",
  nervousSystem: "",
  musculoskeletalSystem: "",
  temperature: "",
};

const CRPhysicalExamForm = (props: Props) => {
  const { patientIdentification, edit, savedPhysicalExam } = props;
  const { requestRegisterPhysicalExam, getPhysicalExamByIdentification } =
    React.useContext(AppDataContext);
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
    console.log("handleSubmit register physical exam");
    try {
      setLoading(true);
      const newPhysicalExam: IPhysicalExamRequest = {
        date: new Date().getTime(),
        bloodPressure: values["bloodPressure"],
        heartRate: values["heartRate"],
        breathingFrequency: values["breathingFrequency"],
        weight: values["weight"],
        size: values["size"],
        imc: values["imc"],
        skin: values["skin"],
        headNeck: values["headNeck"],
        oral: values["oral"],
        chestLungs: values["chestLungs"],
        cardiovascular: values["cardiovascular"],
        abdomen: values["abdomen"],
        genitourinary: values["genitourinary"],
        rectalTract: values["rectalTract"],
        nervousSystem: values["nervousSystem"],
        musculoskeletalSystem: values["musculoskeletalSystem"],
        temperature: values["temperature"],
      };
      await requestRegisterPhysicalExam(newPhysicalExam, patientIdentification);
      await getPhysicalExamByIdentification(patientIdentification);
      updateValues(initialFormValues);
      setMessageConfig({
        open: true,
        message: "Exámen Físico registrado!",
        severity: "success",
      });
      setLoading(false);
    } catch (error: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo registrar exámen físico...\n ${error.message}`,
        severity: "error",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Typography variant="h6" noWrap className="flex-grow" sx={{ mt: 5 }}>
        {edit ? "Editar Exámen Físico" : "Agregar Exámen Físico"}
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
            width: "60vw",
            padding: 40,
            flexWrap: "wrap",
            marginTop: 30,
          }}
        >
          <Grid container rowSpacing={0} columnSpacing={{ xs: 0 }}>
            <Grid item xs={12}>
              <Typography sx={{ mx: 1.2 }} variant="subtitle1">
                Sistema circulatorio:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Presión sanguinea"}
                  onChange={(e) =>
                    handleChange("bloodPressure", e.target.value)
                  }
                  value={values["bloodPressure"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Frecuencia cardiaca"}
                  onChange={(e) => handleChange("heartRate", e.target.value)}
                  value={values["heartRate"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Frecuencia respiratoria"}
                  onChange={(e) =>
                    handleChange("breathingFrequency", e.target.value)
                  }
                  value={values["breathingFrequency"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mx: 1.2 }} variant="subtitle1">
                Peso/talla/imc:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Peso"}
                  onChange={(e) => handleChange("weight", e.target.value)}
                  value={values["weight"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Talla"}
                  onChange={(e) => handleChange("size", e.target.value)}
                  value={values["size"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Índice masa corporal"}
                  onChange={(e) => handleChange("imc", e.target.value)}
                  value={values["imc"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={{ mx: 1.2 }} variant="subtitle1">
                Características físicas:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Piel"}
                  onChange={(e) => handleChange("skin", e.target.value)}
                  value={values["skin"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Cabeza/Cuello"}
                  onChange={(e) => handleChange("headNeck", e.target.value)}
                  value={values["headNeck"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Cavidad oral"}
                  onChange={(e) => handleChange("oral", e.target.value)}
                  value={values["oral"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Pecho/hombros"}
                  onChange={(e) => handleChange("chestLungs", e.target.value)}
                  value={values["chestLungs"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Cardiovascular"}
                  onChange={(e) =>
                    handleChange("cardiovascular", e.target.value)
                  }
                  value={values["cardiovascular"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Abdomen"}
                  onChange={(e) => handleChange("abdomen", e.target.value)}
                  value={values["abdomen"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Genitourinario"}
                  onChange={(e) =>
                    handleChange("genitourinary", e.target.value)
                  }
                  value={values["genitourinary"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Tracto rectal"}
                  onChange={(e) => handleChange("rectalTract", e.target.value)}
                  value={values["rectalTract"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Sistema nervioso"}
                  onChange={(e) =>
                    handleChange("nervousSystem", e.target.value)
                  }
                  value={values["nervousSystem"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Musculoesquelético"}
                  onChange={(e) =>
                    handleChange("musculoskeletalSystem", e.target.value)
                  }
                  value={values["musculoskeletalSystem"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Temperatura"}
                  onChange={(e) => handleChange("temperature", e.target.value)}
                  value={values["temperature"]}
                  autoFocus
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

export default CRPhysicalExamForm;
