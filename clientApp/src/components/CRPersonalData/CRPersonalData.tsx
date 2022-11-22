import { Box, Icon } from "@mui/material";
import React from "react";
import { IPatient } from "../../types/UsersInformation";

interface Props {
  patient: IPatient;
}

const localeDate = (savedDate: string) => {
  let fd = new Date(parseInt(savedDate));
  return fd.toLocaleDateString();
};

const CRPersonalData = (props: Props) => {
  const { patient } = props;
  return (
    <div className="flex w-50 justify-around">
      <div>
        <div>
          <Box className="flex items-center">
            <Icon>person</Icon>
            <Box sx={{ fontStyle: "italic", fontWeight: "bold", ml: 2 }}>
              Nombres:
            </Box>
          </Box>
          <Box sx={{ px: 5, py: 1 }}>{patient.personalInformation.name}</Box>
        </div>
        <div>
          <Box className="flex items-center">
            <Icon>badge</Icon>
            <Box sx={{ fontStyle: "italic", fontWeight: "bold", ml: 2 }}>
              Identificación:
            </Box>
          </Box>
          <Box sx={{ px: 5, py: 1 }}>
            {patient.personalInformation.identificationNumber}
          </Box>
        </div>
        <div>
          <Box className="flex items-center">
            <Icon>event</Icon>
            <Box sx={{ fontStyle: "italic", fontWeight: "bold", ml: 2 }}>
              Fecha de nacimiento:
            </Box>
          </Box>
          <Box sx={{ px: 5, py: 1 }}>
            {localeDate(patient.personalInformation.birthDate)}
          </Box>
        </div>
        <div>
          <Box className="flex items-center">
            <Icon>man</Icon>
            <Box sx={{ fontStyle: "italic", fontWeight: "bold", ml: 2 }}>
              Género:
            </Box>
          </Box>
          <Box sx={{ px: 5, py: 1 }}>{patient.personalInformation.gender}</Box>
        </div>
        <div>
          <Box className="flex items-center">
            <Icon>receipt_long</Icon>
            <Box sx={{ fontStyle: "italic", fontWeight: "bold", ml: 2 }}>
              Estado civil:
            </Box>
          </Box>
          <Box sx={{ px: 5, py: 1 }}>{patient.maritalStatus}</Box>
        </div>
      </div>
      <div>
        <div>
          <Box className="flex items-center">
            <Icon>work</Icon>
            <Box sx={{ fontStyle: "italic", fontWeight: "bold", ml: 2 }}>
              Ocupación:
            </Box>
          </Box>
          <Box sx={{ px: 5, py: 1 }}>{patient.occupation}</Box>
        </div>
        <div>
          <Box className="flex items-center">
            <Icon>home</Icon>
            <Box sx={{ fontStyle: "italic", fontWeight: "bold", ml: 2 }}>
              Dirección:
            </Box>
          </Box>
          <Box sx={{ px: 5, py: 1 }}>{patient.direction}</Box>
        </div>
        <div>
          <Box className="flex items-center">
            <Icon>perm_contact_calendar</Icon>
            <Box sx={{ fontStyle: "italic", fontWeight: "bold", ml: 2 }}>
              Contácto:
            </Box>
          </Box>
          <Box sx={{ px: 5, py: 1 }}>{patient.contactPerson}</Box>
        </div>
        <div>
          <Box className="flex items-center">
            <Icon>call</Icon>
            <Box sx={{ fontStyle: "italic", fontWeight: "bold", ml: 2 }}>
              Teléfono:
            </Box>
          </Box>
          <Box sx={{ px: 5, py: 1 }}>{patient.phone}</Box>
        </div>
      </div>
    </div>
  );
};

export default CRPersonalData;
