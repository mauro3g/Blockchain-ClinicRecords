import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Icon,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppDataContext } from "context";
import { Dayjs } from "dayjs";
import { useValues } from "hooks";
import { MARITAL_STATUS } from "lib/constants/inputs";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IMessageConfig } from "types/feedback";
import {
  IMedicalRequest,
  IPatient,
  IPatientRequest,
} from "../../types/UsersInformation";

interface Props {
  edit?: boolean;
  savedPatient: IPatient;
}

const initialFormValues = {
  name: "",
  identificationNumber: "",
  birthDate: 1,
  gender: "",
  maritalStatus: "",
  occupation: "",
  direction: "",
  contactPerson: "",
  phone: "",
};

const ContainerLarge = styled(Box)`
  min-width: 45vw;
  margin-top: 20px;
`;

const PatientsForm = (props: Props) => {
  const { edit, savedPatient } = props;
  const { requestRegisterPatientsInfo, getPatients } =
    React.useContext(AppDataContext);
  const [messageConfig, setMessageConfig] = React.useState<IMessageConfig>({
    open: false,
    message: "",
    severity: "info",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);

  const navigate = useNavigate();
  const {
    values,
    updateValue: handleChange,
    updateValues,
  } = useValues(initialFormValues);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const newPatient: IPatientRequest = {
        name: values["name"],
        identificationNumber: values["identificationNumber"],
        birthDate: values["birthDate"],
        gender: values["gender"],
        maritalStatus: values["maritalStatus"],
        occupation: values["occupation"],
        direction: values["direction"],
        contactPerson: values["contactPerson"],
        phone: values["phone"],
      };
      await requestRegisterPatientsInfo(newPatient);
      await getPatients();
      updateValues(initialFormValues);
      setMessageConfig({
        open: true,
        message: "Medico registrado!",
        severity: "success",
      });
      setLoading(false);
    } catch (error: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo registrar el usuario...\n ${error.message}`,
        severity: "error",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography variant="h6" noWrap className="flex-grow">
            {edit ? "Editar Paciente" : "Nuevo Paciente"}
          </Typography>
          <Tooltip title="Cerrar formulario" arrow>
            <IconButton onClick={() => navigate(-1)}>
              <Icon>close</Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
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
            flexWrap: "wrap",
            padding: 40,
            marginTop: 30,
          }}
        >
          <Grid container rowSpacing={0} columnSpacing={{ xs: 0 }}>
            <Grid item xs={12}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Nombres"}
                  onChange={(e) => handleChange("name", e.target.value)}
                  value={values["name"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Identificación"}
                  type={"number"}
                  onChange={(e) =>
                    handleChange("identificationNumber", e.target.value)
                  }
                  value={values["identificationNumber"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="w-full"
                    label="Fecha de nacimiento"
                    value={selectedDate}
                    onChange={(e) => {
                      handleChange(
                        "birthDate",
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
                  label={"Género"}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  value={values["gender"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <FormControl fullWidth>
                  <InputLabel id="marital-status-lbl">Estado civil</InputLabel>
                  <Select
                    labelId="marital-status-lbl"
                    id="marital-status-select"
                    value={MARITAL_STATUS.findIndex(
                      (ms) => ms === values["maritalStatus"]
                    )}
                    label="maritalStatus"
                    onChange={(e) =>
                      handleChange(
                        "maritalStatus",
                        MARITAL_STATUS[e.target.value]
                      )
                    }
                  >
                    {MARITAL_STATUS.map((status, index) => (
                      <MenuItem value={index}>{status}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Ocupación"}
                  onChange={(e) => handleChange("occupation", e.target.value)}
                  value={values["occupation"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Dirección"}
                  onChange={(e) => handleChange("direction", e.target.value)}
                  value={values["direction"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Contácto"}
                  onChange={(e) =>
                    handleChange("contactPerson", e.target.value)
                  }
                  value={values["contactPerson"]}
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Teléfono"}
                  type={"number"}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  value={values["phone"]}
                  required
                />
              </Box>
            </Grid>
          </Grid>
          <ContainerLarge className="w-full flex justify-center">
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
              ) : edit ? (
                "Editar"
              ) : (
                "Crear"
              )}
            </Button>
          </ContainerLarge>
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

export default PatientsForm;
