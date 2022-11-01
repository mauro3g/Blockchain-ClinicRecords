import {
  IconButton,
  Icon,
  Box,
  Menu,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { GridColDef, GridRenderCellParams, DataGrid } from "@mui/x-data-grid";
import { AppDataContext, SessionContext } from "context";
import { PATH } from "lib/constants/routes";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IPatologicalHistory } from "types/ClinicRecords";

interface Props {
  activeDatePicker: boolean;
  startDate: Date;
  endDate: Date;
}

interface IPatologicalHistoryTable {
  id: string;
  date: string;
  congenitalDiseases: string;
  childhoodDiseases: string;
  surgicals: string;
  transfusions: string;
  drugAllergy: string;
  harmfullHabits: string;
  hospitalizations: string;
  other: string;
  options: string | undefined;
}

const CRPatologicalHistory = (props: Props) => {
  const { activeDatePicker, startDate, endDate } = props;
  const { crPatologicalHistory } = React.useContext(AppDataContext);
  const { sessionValuesActive, openNav } = React.useContext(SessionContext);
  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [crPatologicalHistoryFiltered, setcrPatologicalHistoryFiltered] =
    React.useState<IPatologicalHistory[]>([]);

  const [selected, setSelected] = React.useState<
    IPatologicalHistory | undefined
  >(undefined);
  const [patologicalHistoryTable, setPatologycalHistoryTable] = React.useState<
    Array<IPatologicalHistory>
  >([]);

  const navigate = useNavigate();
  const location = useLocation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "N°", width: 50 },
    {
      field: "date",
      headerName: "Fecha de registro",
      width: 150,
    },
    { field: "congenitalDiseases", headerName: "Enf. congénitas", width: 150 },
    {
      field: "childhoodDiseases",
      headerName: "Enf. infancia y adolescencia",
      width: 150,
    },
    {
      field: "surgicals",
      headerName: "Intervenciones quirurjicas",
      width: 150,
    },
    { field: "transfusions", headerName: "Transfusiones", width: 150 },
    { field: "drugAllergy", headerName: "Alergia Medicamentos", width: 150 },
    { field: "harmfullHabits", headerName: "Hábitos Nocivos", width: 150 },
    { field: "hospitalizations", headerName: "Hospitalizaciones", width: 150 },
    { field: "other", headerName: "Otros", width: 150 },
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
                  setSelected(crPatologicalHistoryFiltered[params.value]);
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
    const filterPatologicalHistory = () => {
      if (activeDatePicker) {
        const _crPatologicalHistory: IPatologicalHistory[] | undefined =
          crPatologicalHistory.filter((ph) => {
            let registryDate: Date = new Date(parseInt(ph.date));
            return registryDate >= startDate && registryDate <= endDate;
          });
        setcrPatologicalHistoryFiltered(_crPatologicalHistory);
      } else {
        setcrPatologicalHistoryFiltered(crPatologicalHistory);
      }
    };
    filterPatologicalHistory();
  }, [activeDatePicker, startDate, endDate, crPatologicalHistory]);

  React.useEffect(() => {
    const buildTableRows = () => {
      const rows: Array<IPatologicalHistoryTable> = [];
      crPatologicalHistoryFiltered.forEach((patological, index) => {
        rows.push({
          id: (index + 1).toString(),
          date: new Date(parseInt(patological.date)).toLocaleDateString(),
          congenitalDiseases: patological.congenitalDiseases,
          childhoodDiseases: patological.childhoodDiseases,
          surgicals: patological.surgicals,
          transfusions: patological.transfusions,
          drugAllergy: patological.drugAllergy,
          harmfullHabits: patological.harmfullHabits,
          hospitalizations: patological.hospitalizations,
          other: patological.other,
          options: index.toString(),
        });
      });
      return rows;
    };
    setPatologycalHistoryTable(buildTableRows());
  }, [crPatologicalHistoryFiltered]);
  return (
    <div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={patologicalHistoryTable}
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
        {Boolean(selected) ? (
          <MenuItem onClick={() => handleViewDetail()} dense>
            {"Ver detalle"}
          </MenuItem>
        ) : (
          <MenuItem
            sx={{
              width: 215,
              height: 35,
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <CircularProgress sx={{ padding: 1 }} />{" "}
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default CRPatologicalHistory;
