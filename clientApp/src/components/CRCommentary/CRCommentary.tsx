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
import { ICommentary } from "types/ClinicRecords";

interface Props {
  activeDatePicker: boolean;
  startDate: Date;
  endDate: Date;
}

interface ICommentaryTable {
  id: string;
  date: string;
  comment: string;
}

const CRCommentary = (props: Props) => {
  const { activeDatePicker, startDate, endDate } = props;
  const { crCommentary } = React.useContext(AppDataContext);

  const [crCommentaryFiltered, setcrCommentaryFiltered] = React.useState<
    ICommentary[]
  >([]);

  const [selected, setSelected] = React.useState<ICommentary | undefined>(
    undefined
  );
  const [commentaryTable, setCommentaryTable] = React.useState<
    Array<ICommentaryTable>
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
    { field: "comment", headerName: "Comentario", width: 500 },
  ];

  const handleNew = () => {
    navigate(`${PATH.dashboard}${PATH.clinicRecords}${PATH.new}`);
  };

  React.useEffect(() => {
    const filterCommentaries = () => {
      if (activeDatePicker) {
        const _crCommentary: ICommentary[] | undefined = crCommentary.filter(
          (sn) => {
            let registryDate: Date = new Date(sn.date);
            return registryDate >= startDate && registryDate <= endDate;
          }
        );
        setcrCommentaryFiltered(_crCommentary);
      } else {
        setcrCommentaryFiltered(crCommentary);
      }
    };
    filterCommentaries();
  }, [activeDatePicker, startDate, endDate, crCommentary]);

  React.useEffect(() => {
    const buildTableRows = () => {
      const rows: Array<ICommentaryTable> = [];
      crCommentaryFiltered.forEach((comment, index) => {
        rows.push({
          id: (index + 1).toString(),
          date: new Date(parseInt(comment.date)).toLocaleDateString(),
          comment: comment.comment,
        });
      });
      return rows;
    };
    setCommentaryTable(buildTableRows());
  }, [crCommentaryFiltered]);

  return (
    <div>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={commentaryTable}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[6]}
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default CRCommentary;
