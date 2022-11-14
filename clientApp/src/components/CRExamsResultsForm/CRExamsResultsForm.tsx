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
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AppDataContext } from "context";
import { Dayjs } from "dayjs";
import { useValues } from "hooks";
import React from "react";
import {
  IExam,
  IExamRequest,
  IResult,
  ISicknessRequest,
} from "types/ClinicRecords";
import { IMessageConfig } from "types/feedback";
import { IResultRequest } from "../../types/ClinicRecords";

interface Props {
  patientIdentification: string;
  edit?: boolean;
  savedExam?: IExam;
  savedResult?: IResult;
}

const initialFormValues = {
  date: "",
  examName: "",
  detail: "",
  type: "exam",
};

const CRExamsResultsForm = (props: Props) => {
  const { patientIdentification, edit, savedExam, savedResult } = props;
  const {
    crSickness,
    requestRegisterExam,
    requestRegisterResult,
    getExamBysicknessIdentifier,
    getResultBysicknessIdentifier,
  } = React.useContext(AppDataContext);
  const [messageConfig, setMessageConfig] = React.useState<IMessageConfig>({
    open: false,
    message: "",
    severity: "info",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedSicknessId, setSelectedSicknessId] =
    React.useState<string>("");
  const [selectSickness, setSelectSickness] = React.useState<number>(0);
  const [openSelectSickness, setOpenSelectSickness] = React.useState(false);

  const handleChangeSelectSickness = (
    event: SelectChangeEvent<typeof selectSickness>
  ) => {
    setSelectSickness(event.target.value as number);
  };

  const handleClose = () => {
    setOpenSelectSickness(false);
  };

  const handleOpen = () => {
    setOpenSelectSickness(true);
  };

  const {
    values,
    updateValue: handleChange,
    updateValues,
  } = useValues(initialFormValues);

  const handleSubmit = async () => {
    console.log("handleSubmit register exam result");
    const type: string = values["type"];
    if (type === "result") {
      try {
        setLoading(true);
        const newResult: IResultRequest = {
          date: new Date().getTime(),
          examName: values["examName"],
          resultDetail: values["detail"],
        };
        await requestRegisterResult(
          newResult,
          crSickness[selectSickness].sicknessIdentifier
        );
        await getResultBysicknessIdentifier(
          crSickness[selectSickness].sicknessIdentifier
        );
        updateValues(initialFormValues);
        setMessageConfig({
          open: true,
          message: "Resultado registrado!",
          severity: "success",
        });
        setLoading(false);
      } catch (error: any) {
        setMessageConfig({
          open: true,
          message: `No se pudo registrar resultado...\n ${error.message}`,
          severity: "error",
        });
        setLoading(false);
        console.log(error);
      }
    } else if (type === "exam") {
      try {
        setLoading(true);
        const newExam: IExamRequest = {
          date: new Date().getTime(),
          examName: values["examName"],
          examDetail: values["detail"],
        };
        await requestRegisterExam(
          newExam,
          crSickness[selectSickness].sicknessIdentifier
        );
        await getExamBysicknessIdentifier(
          crSickness[selectSickness].sicknessIdentifier
        );
        updateValues(initialFormValues);
        setMessageConfig({
          open: true,
          message: "Exámen registrado!",
          severity: "success",
        });
        setLoading(false);
      } catch (error: any) {
        setMessageConfig({
          open: true,
          message: `No se pudo registrar exámen...\n ${error.message}`,
          severity: "error",
        });
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <Typography variant="h6" noWrap className="flex-grow" sx={{ mt: 5 }}>
        {!edit && "Agregar Exámen/Resultado"}
        {savedExam && "Editar Exámen"}
        {savedResult && "Editar Exámen"}
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
                <FormControl
                  className="w-full"
                  sx={{ m: 1, minWidth: 120 }}
                  required
                >
                  <InputLabel id="controlled-open-select-label">
                    Enfermedad
                  </InputLabel>
                  <Select
                    labelId="controlled-open-select-label"
                    id="open-select"
                    open={openSelectSickness}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    value={selectSickness}
                    label="Sickness"
                    onChange={handleChangeSelectSickness}
                    required
                  >
                    {crSickness.map((sn, index) => {
                      return (
                        <MenuItem key={sn.sicknessName + index} value={index}>
                          {sn.sicknessName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mx: 2, my: 1.5 }}>
                <FormControl required>
                  <FormLabel id="controlled-radio-buttons-group">
                    Tipo de documento
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="controlled-radio-buttons-group"
                    name="radio-buttons-group"
                    value={values["type"]}
                    onChange={(e) => handleChange("type", e.target.value)}
                  >
                    <FormControlLabel
                      value={"exam"}
                      control={<Radio />}
                      label="Exámen"
                    />
                    <FormControlLabel
                      value={"result"}
                      control={<Radio />}
                      label="Resultado"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Nombre del exámen"}
                  onChange={(e) => handleChange("examName", e.target.value)}
                  value={values["examName"]}
                  autoFocus
                  required
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mx: 1, my: 1.5 }}>
                <TextField
                  className="w-full"
                  label={"Detalle"}
                  onChange={(e) => handleChange("detail", e.target.value)}
                  value={values["detail"]}
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

export default CRExamsResultsForm;
