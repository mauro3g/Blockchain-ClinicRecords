import React from "react";
import { styled } from "@mui/material/styles";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
  withTheme,
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
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginPanelForm = styled(LoginPanel)`
  padding: 2vw;
  color: white;
  background-color: ${(props) => props.theme.palette.primary.main};
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

const Login = () => {
  const { login } = React.useContext(SessionContext);
  const { values: credentials, updateValue: handleChange } = useValues();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [messageConfig, setMessageConfig] = React.useState<IMessageConfig>({
    open: false,
    message: "",
    severity: "info",
  });

  const handleSubmit = async () => {
    setLoading(true);
    await login(credentials["username"], credentials["password"]);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <Layout>
        <LoginPanelForm>
          <Typography className="py-8" variant="h4">
            {"Inicio de sesión"}
          </Typography>

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
            src={`${process.env.PUBLIC_URL}/assets/images/recordImg.jpg`}
            alt="clinic_record"
            width="350"
            height="350"
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
