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
import { ICommentary, ICommentaryRequest } from "types/ClinicRecords";
import { IMessageConfig } from "types/feedback";

interface Props {
  patientIdentification: string;
  edit?: boolean;
  savedCommentary?: ICommentary;
}

const initialFormValues = {
  date: "",
  comment: "",
};

const CRCommentaryForm = (props: Props) => {
  const { patientIdentification, edit, savedCommentary } = props;
  const { requestRegisterCommentary, getCommentaryByIdentification } =
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
    console.log("handleSubmit register sickness");
    try {
      setLoading(true);
      const newCommentary: ICommentaryRequest = {
        date: new Date().getTime(),
        comment: values["comment"],
      };
      await requestRegisterCommentary(newCommentary, patientIdentification);
      await getCommentaryByIdentification(patientIdentification);
      updateValues(initialFormValues);
      setMessageConfig({
        open: true,
        message: "Comentario registrado!",
        severity: "success",
      });
      setLoading(false);
    } catch (error: any) {
      setMessageConfig({
        open: true,
        message: `No se pudo registrar comentario...\n ${error.message}`,
        severity: "error",
      });
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Typography variant="h6" noWrap className="flex-grow" sx={{ mt: 5 }}>
        {edit ? "Editar Comentario" : "Agregar Comentario"}
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
                  label={"Comentario"}
                  onChange={(e) => handleChange("comment", e.target.value)}
                  value={values["comment"]}
                  autoFocus
                  required
                  multiline
                  rows={12}
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

export default CRCommentaryForm;
