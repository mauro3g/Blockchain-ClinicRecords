import { EthNetworkContext } from "context";
import { MODULE_IDENTIFICATOR, PERMISSION_TYPE } from "lib/constants/modules";
import React from "react";
import { IAddUser, IUser, IUserRole } from "types/Session";
import {
  IMedical,
  IMedicalRequest,
  IPatient,
  IPatientRequest,
} from "types/UsersInformation";
import { SessionContext } from "../SessionProvider/SessionProvider";

interface Props {
  users: IUser[];
  userRoles: IUserRole[];
  medicals: IMedical[];
  patients: IPatient[];
  getUsers: () => Promise<void>;
  getPatients: () => Promise<void>;
  getUserRoles: () => Promise<void>;
  getMedicals: () => void;
  requestRegisterUser: (newUser: IAddUser) => Promise<void>;
  requestDisableUser: (userAddress: string) => Promise<void>;
  requestEnableUser: (userAddress: string) => Promise<void>;
  requestRegisterMedicalsInfo: (newMedical: IMedicalRequest) => Promise<void>;
  requestRegisterPatientsInfo: (newMedical: IPatientRequest) => Promise<void>;
}

export const AppDataContext = React.createContext({} as Props);

const AppDataProvider = ({ children }) => {
  const { sessionContract, currentAccount, usersInformationContract } =
    React.useContext(EthNetworkContext);
  const { hasPermissions } = React.useContext(SessionContext);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [patients, setPatiens] = React.useState<IPatient[]>([]);
  const [userRoles, setUserRoles] = React.useState<IUserRole[]>([]);
  const [medicals, setMedicals] = React.useState<IMedical[]>([]);

  const requestRegisterUser = async (newUser: IAddUser) => {
    if (
      hasPermissions(MODULE_IDENTIFICATOR.USERS_MANAGE, PERMISSION_TYPE.CREATE)
    ) {
      try {
        console.log("requestRegisterUser");
        const res = await sessionContract.methods
          .addUser(
            newUser.userAddress,
            users.length + 1,
            newUser.username,
            newUser.password,
            newUser.roleType
          )
          .send({ from: currentAccount });
        console.log("user creation res: ", res);
      } catch (e: any) {
        if (e.message.includes("sender is not an admin")) {
          throw new Error("La dirección Ethereum ingresada no es válida");
        } else {
          if (e.message.includes("sender is not an admin")) {
            throw new Error("La dirección Ethereum ingresada no es válida");
          } else {
            console.log(e.message);
          }
        }
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const requestDisableUser = async (userAddress: string) => {
    if (
      hasPermissions(MODULE_IDENTIFICATOR.USERS_MANAGE, PERMISSION_TYPE.MODIFY)
    ) {
      try {
        console.log("requestDisableUser");
        const res = await sessionContract.methods
          .disableUser(userAddress)
          .send({ from: currentAccount });
      } catch (e: any) {
        if (e.message.includes("sender is not an admin")) {
          throw new Error("La dirección Ethereum ingresada no es válida");
        } else {
          if (e.message.includes("sender is not an admin")) {
            throw new Error("La dirección Ethereum ingresada no es válida");
          } else {
            console.log(e.message);
          }
        }
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const requestEnableUser = async (userAddress: string) => {
    if (
      hasPermissions(MODULE_IDENTIFICATOR.USERS_MANAGE, PERMISSION_TYPE.MODIFY)
    ) {
      try {
        console.log("requestDisableUser");
        const res = await sessionContract.methods
          .enableUser(userAddress)
          .send({ from: currentAccount });
      } catch (e: any) {
        if (e.message.includes("sender is not an admin")) {
          throw new Error("La dirección Ethereum ingresada no es válida");
        } else {
          if (e.message.includes("sender is not an admin")) {
            throw new Error("La dirección Ethereum ingresada no es válida");
          } else {
            console.log(e.message);
          }
        }
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const getUsers = async () => {
    console.log("Get Users from: ", currentAccount);
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.USERS_MANAGE,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        const _user = await sessionContract.methods
          .getUsers()
          .call({ from: currentAccount });
        if (_user !== undefined) {
          console.log("obtained users ", _user);
          setUsers(_user);
        } else {
          console.log("no se pudieron obtener usuarios");
        }
      } catch (e: any) {
        if (e.message.includes("sender is not an admin")) {
          throw new Error("La dirección Ethereum ingresada no es válida");
        } else {
          console.log(e.message);
        }
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const getUserRoles = async () => {
    const _userRoles: IUserRole[] = await sessionContract.methods
      .getUserRoles()
      .call();
    if (_userRoles !== undefined) {
      //console.log("obtained user roles ", _userRoles);
      setUserRoles(_userRoles);
    } else {
      console.log("no se pudieron obtener usuarios y roles");
    }
  };

  const getMedicals = async () => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.MEDICALS_INFO,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        let _medicals: IMedical[] = await usersInformationContract.methods
          .getMedicals(sessionContract.options.address.toString())
          .call({ from: currentAccount });
        console.log("_medicals ", _medicals);
        if (_medicals !== undefined) {
          console.log("obtained medicals ", _medicals);
          setMedicals(_medicals);
        } else {
          console.log("no se pudieron obtener usuarios");
        }
      } catch (e: any) {
        console.log("Error al consultar medicos");
        console.log(e.message);
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const getPatients = async () => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.PATIENTS_INFO,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        console.log();
        let _patients: IPatient[] = await usersInformationContract.methods
          .getPatients(sessionContract.options.address.toString())
          .call({ from: currentAccount });
        console.log("_patients ", _patients);
        if (_patients !== undefined) {
          console.log("obtained patients ", _patients);
          setPatiens(_patients);
        } else {
          console.log("no se pudieron obtener pacientes");
        }
      } catch (e: any) {
        if (e.message.includes("sender is not")) {
          throw new Error("La dirección Ethereum ingresada no es válida");
        } else {
          console.log("Error al consultar pacientes");
          console.log(e.message);
        }
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const requestRegisterMedicalsInfo = async (newMedical: IMedicalRequest) => {
    if (
      hasPermissions(MODULE_IDENTIFICATOR.MEDICALS_INFO, PERMISSION_TYPE.CREATE)
    ) {
      try {
        console.log("requestRegisterMedicalsInfo");
        const res = await usersInformationContract.methods
          .addMedical(
            sessionContract.options.address.toString(),
            newMedical.userId,
            newMedical.name,
            newMedical.identificationNumber,
            newMedical.birthDate,
            newMedical.gender,
            newMedical.speciality
          )
          .send({ from: currentAccount });
        console.log("medical creation res: ", res);
      } catch (e: any) {
        if (e.message.includes("sender is not an admin")) {
          throw new Error("La dirección Ethereum ingresada no es válida");
        } else {
          console.log(e.message);
        }
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const requestRegisterPatientsInfo = async (newPatient: IPatientRequest) => {
    if (
      hasPermissions(MODULE_IDENTIFICATOR.PATIENTS_INFO, PERMISSION_TYPE.CREATE)
    ) {
      try {
        console.log("requestRegisterPatientsInfo");
        const res = await usersInformationContract.methods
          .addPatient(
            sessionContract.options.address.toString(),
            newPatient.identificationNumber,
            newPatient.name,
            newPatient.birthDate,
            newPatient.gender,
            newPatient.maritalStatus,
            newPatient.occupation,
            newPatient.direction,
            newPatient.contactPerson,
            newPatient.phone
          )
          .send({ from: currentAccount });
        console.log("patient creation res: ", res);
      } catch (e: any) {
        if (e.message.includes("sender is not")) {
          throw new Error("La dirección Ethereum ingresada no es válida");
        } else {
          console.log(e.message);
        }
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        users,
        userRoles,
        medicals,
        patients,
        getUsers,
        getUserRoles,
        getMedicals,
        getPatients,
        requestRegisterUser,
        requestDisableUser,
        requestEnableUser,
        requestRegisterMedicalsInfo,
        requestRegisterPatientsInfo,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;
