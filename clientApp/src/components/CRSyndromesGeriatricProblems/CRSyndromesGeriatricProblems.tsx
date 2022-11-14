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
import { ISyndromesGeriatricProblems } from "types/ClinicRecords";

interface Props {
  activeDatePicker: boolean;
  startDate: Date;
  endDate: Date;
}

interface ISyndromesGeriatricProblemsTable {
  id: string;
  date: string;
  delirium: string;
  vertigo: string;
  syncope: string;
  incontinence: string;
  hearingDeprivation: string;
  chronicProtraction: string;
  insomnia: string;
  constipation: string;
  falls: string;
  prostatism: string;
  chronicPain: string;
  options: string | undefined;
}

const CRSyndromesGeriatricProblems = (props: Props) => {
  const { activeDatePicker, startDate, endDate } = props;
  const { crSyndromesGeriatricProblems } = React.useContext(AppDataContext);
  const { sessionValuesActive, openNav } = React.useContext(SessionContext);
  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [
    crSyndromesGeriatricProblemsFiltered,
    setcrSyndromesGeriatricProblemsFiltered,
  ] = React.useState<ISyndromesGeriatricProblems[]>([]);

  const [selected, setSelected] = React.useState<
    ISyndromesGeriatricProblems | undefined
  >(undefined);
  const [syndromesGeriatricProblemsTable, setSyndromesGeriatricProblemsTable] =
    React.useState<Array<ISyndromesGeriatricProblemsTable>>([]);

  const navigate = useNavigate();
  const location = useLocation();

  const columns: GridColDef[] = [
    { field: "id", headerName: "N°", width: 50 },
    {
      field: "date",
      headerName: "Fecha de registro",
      width: 150,
    },
    { field: "delirium", headerName: "Delirio", width: 150 },
    { field: "vertigo", headerName: "Vértigo", width: 150 },
    { field: "syncope", headerName: "Síncope", width: 150 },
    { field: "incontinence", headerName: "Incontinencia", width: 150 },
    {
      field: "hearingDeprivation",
      headerName: "Deprivacion auditiva",
      width: 150,
    },
    {
      field: "chronicProtraction",
      headerName: "Protracción crónica",
      width: 150,
    },
    { field: "insomnia", headerName: "Insomnio", width: 150 },
    { field: "constipation", headerName: "Estreñimiento", width: 150 },
    { field: "falls", headerName: "Caídas", width: 150 },
    { field: "prostatism", headerName: "Prostatismo", width: 150 },
    { field: "chronicPain", headerName: "Dolor crónico", width: 150 },
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
                  setSelected(
                    crSyndromesGeriatricProblemsFiltered[params.value]
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
    const filterBiologicFunctions = () => {
      if (activeDatePicker) {
        const _crSyndromesGeriatricProblems:
          | ISyndromesGeriatricProblems[]
          | undefined = crSyndromesGeriatricProblems.filter((sn) => {
          let registryDate: Date = new Date(sn.date);
          return registryDate >= startDate && registryDate <= endDate;
        });
        setcrSyndromesGeriatricProblemsFiltered(_crSyndromesGeriatricProblems);
      } else {
        setcrSyndromesGeriatricProblemsFiltered(crSyndromesGeriatricProblems);
      }
    };
    filterBiologicFunctions();
  }, [activeDatePicker, startDate, endDate, crSyndromesGeriatricProblems]);

  React.useEffect(() => {
    const buildTableRows = () => {
      const rows: Array<ISyndromesGeriatricProblemsTable> = [];
      crSyndromesGeriatricProblemsFiltered.forEach((syndrome, index) => {
        rows.push({
          id: (index + 1).toString(),
          date: new Date(parseInt(syndrome.date)).toLocaleDateString(),
          delirium: syndrome.delirium,
          vertigo: syndrome.vertigo,
          syncope: syndrome.syncope,
          incontinence: syndrome.incontinence,
          hearingDeprivation: syndrome.hearingDeprivation,
          chronicProtraction: syndrome.chronicProtraction,
          insomnia: syndrome.insomnia,
          constipation: syndrome.constipation,
          falls: syndrome.falls,
          prostatism: syndrome.prostatism,
          chronicPain: syndrome.chronicPain,
          options: index.toString(),
        });
      });
      return rows;
    };
    setSyndromesGeriatricProblemsTable(buildTableRows());
  }, [crSyndromesGeriatricProblemsFiltered]);

  return (
    <div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={syndromesGeriatricProblemsTable}
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

export default CRSyndromesGeriatricProblems;
