import styled from "@emotion/styled";
import {
  TextField,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Icon,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { AppDataContext } from "context";
import { useValues } from "hooks";
import { ROLES_ARRAY } from "lib/constants/roles";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IMessageConfig } from "types/feedback";
import { IUser, IAddUser } from "types/Session";
import { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { IMedicalRequest } from "types/UsersInformation";

interface Props {
  edit?: boolean;
  savedUser: IUser;
  isNurse: boolean;
}

const initialFormValues = {
  name: "",
  identificationNumber: "",
  birthDate: 1,
  gender: "",
  speciality: "",
};

const TextFieldLarge = styled(TextField)`
  min-width: 45vw;
  margin-top: 20px;
`;

const ContainerLarge = styled(Box)`
  min-width: 45vw;
  margin-top: 20px;
`;

const MedicalForm = (props: Props) => {
  const { edit, savedUser, isNurse } = props;
  const { requestRegisterMedicalsInfo, getMedicals } =
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

  const title = isNurse? "Enfermera": "Médico"

  const handleSubmit = async () => {
    console.log("handleSubmit register medical ", savedUser.id);
    try {
      setLoading(true);
      const newUser: IMedicalRequest = {
        userId: parseInt(savedUser.id),
        name: values["name"],
        identificationNumber: values["identificationNumber"],
        birthDate: values["birthDate"],
        gender: values["gender"],
        speciality: values["speciality"],
        sessionContractAddress: "",
      };

      await requestRegisterMedicalsInfo(newUser);
      await getMedicals();
      updateValues(initialFormValues);
      const message = isNurse ? "Enfermera registrada" : "Médico registrado!";
      setMessageConfig({
        open: true,
        message: message,
        severity: "success",
      });
      setLoading(false);
    } catch (error: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo registrar información...\n ${error.message}`,
        severity: "error",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <AppBar position="static" color="transparent">
        <Toolbar>
          <Typography variant="h6" noWrap className="flex-grow">
            {edit ? `Editar ${title}` : `Nuevo/a ${title}`}
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
            width: "calc(50vw - 12px)",
            padding: 8,
            flexWrap: "wrap",
          }}
        >
          <TextFieldLarge
            label={"Nombres"}
            onChange={(e) => handleChange("name", e.target.value)}
            value={values["name"]}
            autoFocus
            required
          />
          <TextFieldLarge
            label={"Identificación"}
            type={"number"}
            onChange={(e) =>
              handleChange("identificationNumber", e.target.value)
            }
            value={values["identificationNumber"]}
            required
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de nacimiento"
              value={selectedDate}
              onChange={(e) => {
                handleChange("birthDate", Date.parse(e?.toString() as string));
                setSelectedDate(e);
              }}
              renderInput={(params) => <TextFieldLarge {...params} />}
            />
          </LocalizationProvider>
          <TextFieldLarge
            label={"Género"}
            onChange={(e) => handleChange("gender", e.target.value)}
            value={values["gender"]}
            required
          />
          <TextFieldLarge
            label={"Especialidad Médica"}
            onChange={(e) => handleChange("speciality", e.target.value)}
            value={values["speciality"]}
            required
          />
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

export default MedicalForm;
