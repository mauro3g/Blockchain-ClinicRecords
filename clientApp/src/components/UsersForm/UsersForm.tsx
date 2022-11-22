import React from "react";
import { IAddUser, IUser } from "types/Session";
import { useValues } from "hooks";
import { ROLES_ARRAY, ROLE_IDENTIFICATOR } from "lib/constants/roles";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Icon,
  Alert,
  Paper,
  Snackbar,
  TextField,
  Button,
  CircularProgress,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { IMessageConfig } from "types/feedback";
import { AppDataContext } from "../../context/AppDataProvider/AppDataProvider";

interface Props {
  edit?: boolean;
  savedUser?: IUser & { role: string };
}

const initialFormValues = {
  userAddress: "",
  username: "",
  role: "",
};

const TextFieldLarge = styled(TextField)`
  min-width: 35vw;
  margin-top: 20px;
`;

const ContainerLarge = styled(Box)`
  min-width: 35vw;
  margin-top: 20px;
`;

const UsersForm = (props: Props) => {
  const { edit, savedUser } = props;
  const { requestRegisterUser, getUsers } = React.useContext(AppDataContext);
  const [messageConfig, setMessageConfig] = React.useState<IMessageConfig>({
    open: false,
    message: "",
    severity: "info",
  });
  const [loading, setLoading] = React.useState<boolean>(false);

  const navigate = useNavigate();
  const {
    values,
    updateValue: handleChange,
    updateValues,
  } = useValues(initialFormValues);

  const handleSubmit = async () => {
    console.log("handleSubmit register user");
    try {
      setLoading(true);
      const newUser: IAddUser = {
        userAddress: values["userAddress"],
        id: "",
        username: values["username"],
        password: "1234",
        roleType: values["role"],
      };
      await requestRegisterUser(newUser);
      await getUsers();
      updateValues(initialFormValues);
      setMessageConfig({
        open: true,
        message: "Usuario registrado!",
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
    <Box
      sx={{ backgroundColor: "#81B9D9" }}
      className="h-full w-full flex flex-col items-center justify-center"
    >
      <AppBar position="static" sx={{ backgroundColor: "white", color: "black"}}>
        <Toolbar>
          <Typography variant="h6" noWrap className="flex-grow">
            {edit ? "Editar usuario" : "Nuevo usuario"}
          </Typography>
          <Tooltip title="Cerrar formulario" arrow>
            <IconButton onClick={() => navigate(-1)}>
              <Icon>close</Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box className="flex flex-grow items-center justify-around">
        <Box>
          <Paper
            elevation={8}
            sx={{ height: "50vh", mx: 10, borderRadius: 50 }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/doc-user.jpg`}
              alt="clinic_record"
            />
          </Paper>
        </Box>
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
              minWidth: 250,
              width: "calc(40vw - 12px)",
              padding: 8,
              flexWrap: "wrap",
            }}
          >
            <TextFieldLarge
              label={"Dirección ETH"}
              onChange={(e) => handleChange("userAddress", e.target.value)}
              value={values["userAddress"]}
              autoFocus
              required
            />
            <TextFieldLarge
              label={"Nombre de usuario"}
              onChange={(e) => handleChange("username", e.target.value)}
              value={values["username"]}
              autoFocus
              required
            />
            <ContainerLarge>
              <FormControl fullWidth>
                <InputLabel id="role-select">Rol</InputLabel>
                <Select
                  labelId="role-select"
                  id="role-select"
                  value={values["role"]}
                  label="role"
                  onChange={(e) => handleChange("role", e.target.value)}
                >
                  {ROLES_ARRAY.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </ContainerLarge>
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
      </Box>
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
    </Box>
  );
};

export default UsersForm;
