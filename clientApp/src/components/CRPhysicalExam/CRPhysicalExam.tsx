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
import { IPhysicalExam } from "types/ClinicRecords";

interface Props {
  activeDatePicker: boolean;
  startDate: Date;
  endDate: Date;
}

interface IPhysicalExamTable {
  id: string;
  date: string;
  bloodPressure: string;
  heartRate: string;
  breathingFrequency: string;
  weight: string;
  size: string;
  imc: string;
  skin: string;
  headNeck: string;
  oral: string;
  chestLungs: string;
  cardiovascular: string;
  abdomen: string;
  genitourinary: string;
  rectalTract: string;
  nervousSystem: string;
  musculoskeletalSystem: string;
  temperature: string;
  options: string | undefined;
}

const CRPhysicalExam = (props: Props) => {
  const { activeDatePicker, startDate, endDate } = props;
  const { crPhysicalExam } = React.useContext(AppDataContext);
  const { sessionValuesActive, openNav } = React.useContext(SessionContext);
  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [crPhysicalExamFiltered, setcrPhysicalExamFiltered] = React.useState<
    IPhysicalExam[]
  >([]);

  const [selected, setSelected] = React.useState<IPhysicalExam | undefined>(
    undefined
  );
  const [physicalExamTable, setPhysicalExamTable] = React.useState<
    Array<IPhysicalExamTable>
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
    { field: "bloodPressure", headerName: "Presión arterial", width: 150 },
    { field: "heartRate", headerName: "Frec. Cardiaca", width: 150 },
    {
      field: "breathingFrequency",
      headerName: "Frec. Respiratoria",
      width: 150,
    },
    { field: "weight", headerName: "Peso", width: 150 },
    { field: "size", headerName: "Talla", width: 150 },
    { field: "imc", headerName: "Imc", width: 150 },
    { field: "skin", headerName: "Piel", width: 150 },
    { field: "headNeck", headerName: "Cabeza/Cuello", width: 150 },
    { field: "oral", headerName: "Cavidad Oral", width: 150 },
    { field: "chestLungs", headerName: "Pecho/Pulmones", width: 150 },
    { field: "cardiovascular", headerName: "Cardiovascular", width: 150 },
    { field: "abdomen", headerName: "Abdomen", width: 150 },
    { field: "genitourinary", headerName: "Genitourinario", width: 150 },
    { field: "rectalTract", headerName: "Cavidad rectal", width: 150 },
    { field: "nervousSystem", headerName: "Sistema nervioso", width: 150 },
    {
      field: "musculoskeletalSystem",
      headerName: "S. Musculoesquelético",
      width: 150,
    },
    { field: "temperature", headerName: "Temperatura", width: 150 },
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
                  setSelected(crPhysicalExamFiltered[params.value]);
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
    const filterPhysicalExam = () => {
      if (activeDatePicker) {
        const _crPhysicalExam: IPhysicalExam[] | undefined =
          crPhysicalExam.filter((sn) => {
            let registryDate: Date = new Date(sn.date);
            return registryDate >= startDate && registryDate <= endDate;
          });
        setcrPhysicalExamFiltered(_crPhysicalExam);
      } else {
        setcrPhysicalExamFiltered(crPhysicalExam);
      }
    };
    filterPhysicalExam();
  }, [activeDatePicker, startDate, endDate, crPhysicalExam]);

  React.useEffect(() => {
    const buildTableRows = () => {
      const rows: Array<IPhysicalExamTable> = [];
      crPhysicalExamFiltered.forEach((physical, index) => {
        rows.push({
          id: (index + 1).toString(),
          date: new Date(parseInt(physical.date)).toLocaleDateString(),
          bloodPressure: physical.bloodPressure,
          heartRate: physical.heartRate,
          breathingFrequency: physical.breathingFrequency,
          weight: physical.weight,
          size: physical.size,
          imc: physical.imc,
          skin: physical.skin,
          headNeck: physical.headNeck,
          oral: physical.oral,
          chestLungs: physical.chestLungs,
          cardiovascular: physical.cardiovascular,
          abdomen: physical.abdomen,
          genitourinary: physical.genitourinary,
          rectalTract: physical.rectalTract,
          nervousSystem: physical.nervousSystem,
          musculoskeletalSystem: physical.musculoskeletalSystem,
          temperature: physical.temperature,
          options: index.toString(),
        });
      });
      return rows;
    };
    setPhysicalExamTable(buildTableRows());
  }, [crPhysicalExamFiltered]);

  return (
    <div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={physicalExamTable}
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

export default CRPhysicalExam;
