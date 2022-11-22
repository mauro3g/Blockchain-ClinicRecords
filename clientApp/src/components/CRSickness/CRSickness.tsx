import {
  IconButton,
  Icon,
  Box,
  CircularProgress,
  Menu,
  MenuItem,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AppDataContext, SessionContext } from "context";
import { PATH } from "lib/constants/routes";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ISickness } from "types/ClinicRecords";

interface Props {
  activeDatePicker: boolean;
  startDate: Date;
  endDate: Date;
  selectedSickness: ISickness | undefined;
  setSelectedSicness: React.Dispatch<
    React.SetStateAction<ISickness | undefined>
  >;
  handleExamResult: () => void;
}

interface ISicknessTable {
  id: string;
  sicknessIdentifier: string;
  registerDate: string;
  initialDate: string;
  sicknessName: string;
  diagnostic: string;
  startWay: string;
  course: string;
  signsSymtoms: string;
  treatment: string;
  options: string | undefined;
}

const CRSickness = (props: Props) => {
  const {
    activeDatePicker,
    startDate,
    endDate,
    selectedSickness,
    setSelectedSicness,
    handleExamResult,
  } = props;
  const { crSickness } = React.useContext(AppDataContext);
  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [crSicknessFiltered, setcrSicknessFiltered] = React.useState<
    ISickness[]
  >([]);

  const [sicknessTable, setSicknessTable] = React.useState<
    Array<ISicknessTable>
  >([]);

  const navigate = useNavigate();
  const location = useLocation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "N°", width: 50 },
    { field: "sicknessIdentifier", headerName: "Id", width: 50 },
    { field: "registerDate", headerName: "Fecha de registro", width: 150 },
    {
      field: "initialDate",
      headerName: "Fecha inicio de enfermedad",
      width: 150,
    },
    { field: "sicknessName", headerName: "Nombre de enfermedad", width: 150 },
    { field: "diagnostic", headerName: "Diagnostico", width: 150 },
    { field: "startWay", headerName: "Forma de inicio", width: 150 },
    { field: "course", headerName: "Curso", width: 150 },
    { field: "signsSymtoms", headerName: "Signos y Sintomas", width: 150 },
    { field: "treatment", headerName: "Tratamiento", width: 150 },
    {
      field: "options",
      headerName: "",
      minWidth: 50,
      filterable: false,
      sortable: false,
      hideable: false,
      disableColumnMenu: true,
      renderCell: (params: GridRenderCellParams) => {
        if (params.value) {
          return (
            <strong>
              <IconButton
                aria-label="open drawer"
                onClick={(e) => {
                  setSelectedSicness(
                    crSicknessFiltered.find(
                      (sn) => sn.sicknessIdentifier === (params.value as string)
                    )
                  );
                  setActionsAnchorEl(e.currentTarget);
                }}
              >
                <Icon>more_vert</Icon>
              </IconButton>
            </strong>
          );
        } else {
          return undefined;
        }
      },
    },
  ];

  const handleNew = () => {
    navigate(`${PATH.dashboard}${PATH.clinicRecords}${PATH.new}`);
  };

  const handleViewDetail = () => {
    navigate(`${PATH.dashboard}${PATH.clinicRecords}${PATH.detail}`);
  };

  React.useEffect(() => {
    const filterSickness = () => {
      if (activeDatePicker) {
        const _crSicknessFiltered: ISickness[] | undefined = crSickness.filter(
          (sn) => {
            let registryDate: Date = new Date(parseInt(sn.registerDate));
            return registryDate >= startDate && registryDate <= endDate;
          }
        );
        setcrSicknessFiltered(_crSicknessFiltered);
      } else {
        setcrSicknessFiltered(crSickness);
      }
    };
    filterSickness();
  }, [activeDatePicker, startDate, endDate, crSickness]);

  React.useEffect(() => {
    const buildTableRows = () => {
      const rows: Array<ISicknessTable> = [];
      crSicknessFiltered.forEach((sickness, index) => {
        rows.push({
          id: (index + 1).toString(),
          sicknessIdentifier: sickness.sicknessIdentifier,
          registerDate: new Date(
            parseInt(sickness.registerDate)
          ).toLocaleDateString(),
          initialDate: new Date(
            parseInt(sickness.initialDate)
          ).toLocaleDateString(),
          sicknessName: sickness.sicknessName,

          diagnostic: sickness.diagnostic,
          startWay: sickness.startWay,
          course: sickness.course,
          signsSymtoms: sickness.signsSymtoms,
          treatment: sickness.treatment,
          options: sickness.sicknessIdentifier,
        });
      });
      return rows;
    };
    setSicknessTable(buildTableRows());
  }, [crSicknessFiltered]);

  return (
    <div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={sicknessTable}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[6]}
          disableSelectionOnClick
        />
      </Box>
      <Menu
        anchorEl={actionsAnchorEl}
        open={Boolean(actionsAnchorEl)}
        onClose={() => setActionsAnchorEl(null)}
      >
        <MenuItem onClick={() => handleViewDetail()} dense>
          {"Ver detalle"}
        </MenuItem>
        <MenuItem onClick={() => handleExamResult()} dense>
          {"Exámenes y Resultados"}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CRSickness;
