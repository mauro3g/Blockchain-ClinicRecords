import React from "react";
import { styled } from "@mui/material/styles";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Icon,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useValues } from "hooks";
import { IMessageConfig } from "types/feedback";
import { SessionContext } from "context";

const Layout = styled(Box)`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const LoginPanel = styled(Box)`
  width: 50%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginPanelForm = styled(LoginPanel)`
  padding-top: 8vw;
  color: white;
  background-color: ${(props) => props.theme.palette.primary.main};
  justify-content: flex-start;
`;

const LoginPanelForm2 = styled(LoginPanel)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
}));

const LoginForm = styled(Box)`
  display: flex;
  flex-direction: column;
  padding-bottom: 4vh;
  width: 100%;
`;

const LoginTextField = styled(TextField)`
  & .MuiInputBase-root {
    color: white;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: white;
  }

  & .MuiFormLabel-root {
    color: white;
  }
`;

const initialFormValues = {
  username: "",
  password: "",
};

const Login = () => {
  const { login } = React.useContext(SessionContext);
  const { values: credentials, updateValue: handleChange } =
    useValues(initialFormValues);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [messageConfig, setMessageConfig] = React.useState<IMessageConfig>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await login(credentials["username"], credentials["password"]);
    } catch (e: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo iniciar sesión...\n ${e.message}`,
        severity: "error",
      });
    }
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Layout>
        <LoginPanelForm>
          <Box
            className="flex"
            sx={{ mb: 12, border: 3, padding: 2, borderRadius: 10 }}
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/images/health-icon.svg`}
              alt="clinic_record"
              height="40px"
            />
            <Typography variant="h4">{"Historial Clínico Geriátrico"}</Typography>
          </Box>
          <Typography variant="h5">{"Inicio de sesión"}</Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <LoginForm>
              <LoginTextField
                label={"Nombre de usuario"}
                value={credentials["username"]}
                onChange={(e) => handleChange("username", e.target.value)}
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />
              <LoginTextField
                label={"Contraseña"}
                type="password"
                value={credentials["password"]}
                onChange={(e) => handleChange("password", e.target.value)}
                fullWidth
                required
                variant="outlined"
                margin="normal"
              />
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disableElevation
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress
                    style={{ color: "white" }}
                    size={20}
                    className="my-1"
                    thickness={10}
                  />
                ) : (
                  "Ingresar"
                )}
              </Button>
            </LoginForm>
          </form>
        </LoginPanelForm>
        <LoginPanel>
          <img
            src={`${process.env.PUBLIC_URL}/assets/images/elderly-patient.jpg`}
            alt="clinic_record"
            width="90%"
            height="90%"
          />
        </LoginPanel>
      </Layout>
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
    </React.Fragment>
  );
};

export default Login;
