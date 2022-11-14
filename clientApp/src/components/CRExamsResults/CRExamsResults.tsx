import { AppBar, Box, Icon, IconButton, Toolbar, Tooltip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AppDataContext } from "context";
import { PATH } from "lib/constants/routes";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IExam, IResult, ISickness } from "../../types/ClinicRecords";
import Typography from "@mui/material/Typography";

interface Props {
  selectedSickness: ISickness;
}

interface IExamResultTable {
  id: string;
  examName: string;
  registerDate: string;
  detail: string;
}

const CRExamsResults = (props: Props) => {
  const { selectedSickness } = props;
  const {
    crResult,
    crExams,
    getExamBysicknessIdentifier,
    getResultBysicknessIdentifier,
  } = React.useContext(AppDataContext);

  const [crExamsFiltered, setcrExamsFiltered] = React.useState<IExam[]>([]);
  const [crResultsFiltered, setcrResultsFiltered] = React.useState<IResult[]>(
    []
  );

  const [examsTable, setExamsTable] = React.useState<Array<IExamResultTable>>(
    []
  );
  const [resultsTable, setResultsTable] = React.useState<
    Array<IExamResultTable>
  >([]);

  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "id", headerName: "N°", width: 50 },
    { field: "examName", headerName: "Exámen", width: 200 },
    { field: "registerDate", headerName: "Fecha de registro", width: 200 },
    { field: "detail", headerName: "Detalle", width: 300 },
  ];

  const handleNew = () => {
    navigate(`${PATH.dashboard}${PATH.examResult}${PATH.new}`);
  };

  React.useEffect(() => {
    setcrExamsFiltered(crExams);
    setcrResultsFiltered(crResult);
  }, [crResult, crExams]);

  React.useEffect(() => {
    getExamBysicknessIdentifier(selectedSickness.sicknessIdentifier);
    getResultBysicknessIdentifier(selectedSickness.sicknessIdentifier);
  }, [selectedSickness]);

  React.useEffect(() => {
    const buildTableRows = () => {
      const rows: Array<IExamResultTable> = [];
      crExams.forEach((exam, index) => {
        rows.push({
          id: (index + 1).toString(),
          examName: exam.examName,
          registerDate: new Date(parseInt(exam.date)).toLocaleDateString(),
          detail: exam.examDetail,
        });
      });
      return rows;
    };
    setExamsTable(buildTableRows());
  }, [crExamsFiltered]);

  React.useEffect(() => {
    const buildTableRows = () => {
      const rows: Array<IExamResultTable> = [];
      crResult.forEach((result, index) => {
        rows.push({
          id: (index + 1).toString(),
          examName: result.examName,
          registerDate: new Date(parseInt(result.date)).toLocaleDateString(),
          detail: result.resultDetail,
        });
      });
      return rows;
    };
    setResultsTable(buildTableRows());
  }, [crResultsFiltered]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <AppBar position="absolute" color="inherit">
        <Toolbar>
          <Typography variant="h6" noWrap className="flex-grow">
            {`Exámenes y Resultados | ${selectedSickness.sicknessName}`}
          </Typography>
          <Tooltip title="Cerrar formulario" arrow>
            <IconButton onClick={() => navigate(-1)}>
              <Icon>close</Icon>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: 300, width: "85%", mt: 10 }}>
        <Typography variant="h6" noWrap className="flex-grow">
          Exámenes
        </Typography>
        <DataGrid
          rows={examsTable}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[6]}
          disableSelectionOnClick
        />
      </Box>
      <Box sx={{ height: 300, width: "85%", my: 10 }}>
        <Typography variant="h6" noWrap className="flex-grow">
          Resultados
        </Typography>
        <DataGrid
          rows={resultsTable}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[6]}
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default CRExamsResults;
