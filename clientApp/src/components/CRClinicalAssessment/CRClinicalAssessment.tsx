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
import { IClinicalAssessment } from "types/ClinicRecords";

interface Props {
  activeDatePicker: boolean;
  startDate: Date;
  endDate: Date;
}

interface IClinicalAssessmentTable {
  id: string;
  date: string;
  bath: string;
  dress: string;
  hygienicService: string;
  movilization: string;
  incontinence: string;
  feeding: string;
  options: string | undefined;
}

const CRClinicalAssessment = (props: Props) => {
  const { activeDatePicker, startDate, endDate } = props;
  const { crClinicalAssessment } = React.useContext(AppDataContext);
  const { sessionValuesActive, openNav } = React.useContext(SessionContext);
  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [crClinicalAssessmentFiltered, setcrClinicalAssessmentFiltered] =
    React.useState<IClinicalAssessment[]>([]);

  const [selected, setSelected] = React.useState<
    IClinicalAssessment | undefined
  >(undefined);
  const [clinicalAssessmentTable, setClinicalAssessmentTable] = React.useState<
    Array<IClinicalAssessmentTable>
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
    { field: "bath", headerName: "Bañarse", width: 150 },
    { field: "dress", headerName: "Vestirse", width: 150 },
    { field: "hygienicService", headerName: "Servicio Higienico", width: 150 },
    { field: "movilization", headerName: "Movilización", width: 150 },
    { field: "incontinence", headerName: "Incontinencia", width: 150 },
    { field: "feeding", headerName: "Alimentación", width: 150 },
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
                  setSelected(crClinicalAssessmentFiltered[params.value]);
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
        const _crClinicalAssessment: IClinicalAssessment[] | undefined =
          crClinicalAssessment.filter((sn) => {
            let registryDate: Date = new Date(parseInt(sn.date));
            return registryDate >= startDate && registryDate <= endDate;
          });
        setcrClinicalAssessmentFiltered(_crClinicalAssessment);
      } else {
        setcrClinicalAssessmentFiltered(crClinicalAssessment);
      }
    };
    filterBiologicFunctions();
  }, [activeDatePicker, startDate, endDate, crClinicalAssessment]);

  React.useEffect(() => {
    const buildTableRows = () => {
      const rows: Array<IClinicalAssessmentTable> = [];
      crClinicalAssessmentFiltered.forEach((clinical, index) => {
        rows.push({
          id: (index + 1).toString(),
          date: new Date(parseInt(clinical.date)).toLocaleDateString(),
          bath: clinical.bath ? "Si" : "No",
          dress: clinical.dress ? "Si" : "No",
          hygienicService: clinical.hygienicService ? "Si" : "No",
          movilization: clinical.movilization ? "Si" : "No",
          incontinence: clinical.incontinence ? "Si" : "No",
          feeding: clinical.feeding ? "Si" : "No",
          options: index.toString(),
        });
      });
      return rows;
    };
    setClinicalAssessmentTable(buildTableRows());
  }, [crClinicalAssessmentFiltered]);

  return (
    <div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={clinicalAssessmentTable}
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

export default CRClinicalAssessment;
