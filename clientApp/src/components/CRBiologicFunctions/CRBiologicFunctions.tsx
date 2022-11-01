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
import { IBiologicFunctions } from "types/ClinicRecords";

interface Props {
  activeDatePicker: boolean;
  startDate: Date;
  endDate: Date;
}

interface IBiologicFunctionsTable {
  id: string;
  date: string;
  urination: string;
  stools: string;
  appetite: string;
  thirst: string;
  sleep: string;
  other: string;
  options: string | undefined;
}

const CRBiologicFunctions = (props: Props) => {
  const { activeDatePicker, startDate, endDate } = props;
  const { crBiologicFunctions } = React.useContext(AppDataContext);
  const { sessionValuesActive, openNav } = React.useContext(SessionContext);
  const [actionsAnchorEl, setActionsAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const [crBiologicFunctionsFiltered, setcrBiologicFunctionsFiltered] =
    React.useState<IBiologicFunctions[]>([]);

  const [selected, setSelected] = React.useState<
    IBiologicFunctions | undefined
  >(undefined);
  const [biologicFunctionsTable, setBiologicFunctionsTable] = React.useState<
    Array<IBiologicFunctions>
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
    { field: "urination", headerName: "Micción", width: 150 },
    { field: "stools", headerName: "Deposiciones", width: 150 },
    { field: "appetite", headerName: "Apetito", width: 150 },
    { field: "thirst", headerName: "Sed", width: 150 },
    { field: "sleep", headerName: "Sueño", width: 150 },
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
                  setSelected(crBiologicFunctionsFiltered[params.value]);
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
        const _crBiologicFunctions: IBiologicFunctions[] | undefined =
          crBiologicFunctions.filter((sn) => {
            let registryDate: Date = new Date(parseInt(sn.date));
            return registryDate >= startDate && registryDate <= endDate;
          });
        setcrBiologicFunctionsFiltered(_crBiologicFunctions);
      } else {
        setcrBiologicFunctionsFiltered(crBiologicFunctions);
      }
    };
    filterBiologicFunctions();
  }, [activeDatePicker, startDate, endDate, crBiologicFunctions]);

  React.useEffect(() => {
    const buildTableRows = () => {
      const rows: Array<IBiologicFunctionsTable> = [];
      crBiologicFunctionsFiltered.forEach((biologic, index) => {
        rows.push({
          id: (index + 1).toString(),
          date: new Date(parseInt(biologic.date)).toLocaleDateString(),
          urination: biologic.urination,
          stools: biologic.stools,
          appetite: biologic.appetite,
          thirst: biologic.thirst,
          sleep: biologic.sleep,
          other: biologic.other,
          options: index.toString(),
        });
      });
      return rows;
    };
    setBiologicFunctionsTable(buildTableRows());
  }, [crBiologicFunctionsFiltered]);

  return (
    <div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={biologicFunctionsTable}
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

export default CRBiologicFunctions;
