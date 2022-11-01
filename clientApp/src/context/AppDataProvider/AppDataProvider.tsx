import { EthNetworkContext } from "context";
import { MODULE_IDENTIFICATOR, PERMISSION_TYPE } from "lib/constants/modules";
import React from "react";
import {
  IBiologicFunctions,
  ISickness,
  IPhysicalExam,
  ICommentary,
  IClinicalAssessment,
  ISyndromesGeriatricProblems,
  IPatologicalHistory,
  IExam,
  IResult,
} from "types/ClinicRecords";
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
  crBiologicFunctions: IBiologicFunctions[];
  crSickness: ISickness[];
  crExams: IExam[];
  crResult: IResult[];
  crPhysicalExam: IPhysicalExam[];
  crPatologicalHistory: IPatologicalHistory[];
  crCommentary: ICommentary[];
  crSicknessCommentary: ICommentary[];
  crClinicalAssessment: IClinicalAssessment[];
  crSyndromesGeriatricProblems: ISyndromesGeriatricProblems[];
  getUsers: () => Promise<void>;
  getPatients: () => Promise<void>;
  getUserRoles: () => Promise<void>;
  getMedicals: () => void;
  requestRegisterUser: (newUser: IAddUser) => Promise<void>;
  requestDisableUser: (userAddress: string) => Promise<void>;
  requestEnableUser: (userAddress: string) => Promise<void>;
  requestRegisterMedicalsInfo: (newMedical: IMedicalRequest) => Promise<void>;
  requestRegisterPatientsInfo: (newMedical: IPatientRequest) => Promise<void>;
  getSicknessByIdentification: (identification: string) => Promise<void>;
  getBiologicFunctionsByIdentification: (
    identification: string
  ) => Promise<void>;
  getPatologicalHistoryByIdentification: (
    identification: string
  ) => Promise<void>;
  getPhysicalExamByIdentification: (identification: string) => Promise<void>;
  getSyndromesGeriatricProblemsByIdentification: (
    identification: string
  ) => Promise<void>;
  getClinicalAssessmentByIdentification: (
    identification: string
  ) => Promise<void>;
  getCommentaryByIdentification: (identification: string) => Promise<void>;
}

export const AppDataContext = React.createContext({} as Props);

const AppDataProvider = ({ children }) => {
  const {
    sessionContract,
    currentAccount,
    usersInformationContract,
    cRSyndromesGeriatricContract,
    cRSicknessContract,
    cRPhysicalExamContract,
    cRPatologicalHistoryContract,
    cRCommentaryContract,
    cRClinicalAssessmentContract,
    cRBiologicFunctionsContract,
  } = React.useContext(EthNetworkContext);
  const { hasPermissions } = React.useContext(SessionContext);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [patients, setPatiens] = React.useState<IPatient[]>([]);
  const [userRoles, setUserRoles] = React.useState<IUserRole[]>([]);
  const [medicals, setMedicals] = React.useState<IMedical[]>([]);
  const [crBiologicFunctions, setcrBiologicFunctions] = React.useState<
    IBiologicFunctions[]
  >([]);
  const [crSickness, setcrSickness] = React.useState<ISickness[]>([]);
  const [crExams, setcrExams] = React.useState<IExam[]>([]);
  const [crResult, setcrResult] = React.useState<IResult[]>([]);
  const [crPhysicalExam, setcrPhysicalExam] = React.useState<IPhysicalExam[]>(
    []
  );
  const [crPatologicalHistory, setcrPatologicalHistory] = React.useState<
    IPatologicalHistory[]
  >([]);
  const [crCommentary, setcrCommentary] = React.useState<ICommentary[]>([]);
  const [crSicknessCommentary, setcrSickcknessCommentary] = React.useState<
    ICommentary[]
  >([]);
  const [crClinicalAssessment, setcrClinicalAssessment] = React.useState<
    IClinicalAssessment[]
  >([]);
  const [crSyndromesGeriatricProblems, setcrSyndromesGeriatricProblems] =
    React.useState<ISyndromesGeriatricProblems[]>([]);

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

  const getSicknessByIdentification = async (identification: string) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_SICKNESS,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        let _sickness: ISickness[] = await cRSicknessContract.methods
          .getSicknessByIdentification(
            sessionContract.options.address.toString(),
            identification
          )
          .call({ from: currentAccount });
        console.log("_sickness ", _sickness);
        if (_sickness !== undefined) {
          console.log("obtained sickness ", _sickness);
          setcrSickness(_sickness);
        } else {
          console.log("no se pudieron obtener enfermedades");
        }
      } catch (e: any) {
        console.log("Error al consultar enfermedades");
        console.log(e.message);
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const getBiologicFunctionsByIdentification = async (
    identification: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_BIOLOGIC_FUNCTIONS,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        let _biologic: IBiologicFunctions[] =
          await cRBiologicFunctionsContract.methods
            .getBiologicFunctionsByIdentification(
              sessionContract.options.address.toString(),
              identification
            )
            .call({ from: currentAccount });
        console.log("_biologic ", _biologic);
        if (_biologic !== undefined) {
          console.log("obtained biologic ", _biologic);
          setcrBiologicFunctions(_biologic);
        } else {
          console.log("no se pudieron obtener funciones biologicas");
        }
      } catch (e: any) {
        console.log("Error al consultar funciones biologicas");
        console.log(e.message);
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const getPatologicalHistoryByIdentification = async (
    identification: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_PATOLOGICAL_HISTORY,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        let _ph: IPatologicalHistory[] =
          await cRPatologicalHistoryContract.methods
            .getPatologicalHistoryByIdentification(
              sessionContract.options.address.toString(),
              identification
            )
            .call({ from: currentAccount });
        console.log("_ph ", _ph);
        if (_ph !== undefined) {
          console.log("obtained patological history ", _ph);
          setcrPatologicalHistory(_ph);
        } else {
          console.log("no se pudieron obtener patological history");
        }
      } catch (e: any) {
        console.log("Error al consultar patological history");
        console.log(e.message);
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const getPhysicalExamByIdentification = async (identification: string) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_PHYSYCAL_EXAM,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        let _exams: IPhysicalExam[] = await cRPhysicalExamContract.methods
          .getPhysicalExamByIdentification(
            sessionContract.options.address.toString(),
            identification
          )
          .call({ from: currentAccount });
        console.log("_exams ", _exams);
        if (_exams !== undefined) {
          console.log("obtained exams ", _exams);
          setcrPhysicalExam(_exams);
        } else {
          console.log("no se pudieron obtener examenes fisicos");
        }
      } catch (e: any) {
        console.log("Error al consultar examenes fisicos");
        console.log(e.message);
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const getSyndromesGeriatricProblemsByIdentification = async (
    identification: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_SYNDROMES_GERIATRIC,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        let _sp: ISyndromesGeriatricProblems[] =
          await cRSyndromesGeriatricContract.methods
            .getSyndromesGeriatricProblemsByIdentification(
              sessionContract.options.address.toString(),
              identification
            )
            .call({ from: currentAccount });
        console.log("_sp ", _sp);
        if (_sp !== undefined) {
          console.log("obtained syndrome and problems ", _sp);
          setcrSyndromesGeriatricProblems(_sp);
        } else {
          console.log("no se pudieron obtener syndrome and problems");
        }
      } catch (e: any) {
        console.log("Error al consultar syndrome and problems");
        console.log(e.message);
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const getClinicalAssessmentByIdentification = async (
    identification: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_CLINICAL_ASSESSMENT,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        let _ca: IClinicalAssessment[] =
          await cRClinicalAssessmentContract.methods
            .getClinicalAssessmentByIdentification(
              sessionContract.options.address.toString(),
              identification
            )
            .call({ from: currentAccount });
        console.log("_ca ", _ca);
        if (_ca !== undefined) {
          console.log("obtained clinical assessments ", _ca);
          setcrClinicalAssessment(_ca);
        } else {
          console.log("no se pudieron obtener valoraciones clinicas");
        }
      } catch (e: any) {
        console.log("Error al consultar valoraciones clinicas");
        console.log(e.message);
      }
    } else {
      throw new Error("No tienes permisos para usar esta opción");
    }
  };

  const getCommentaryByIdentification = async (identification: string) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_COMMENTARY,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        let _commentary: ICommentary[] = await cRCommentaryContract.methods
          .getCommentaryByIdentification(
            sessionContract.options.address.toString(),
            identification
          )
          .call({ from: currentAccount });
        console.log("_commentary ", _commentary);
        if (_commentary !== undefined) {
          console.log("obtained commentary ", _commentary);
          setcrCommentary(_commentary);
        } else {
          console.log("no se pudieron obtener comentarios");
        }
      } catch (e: any) {
        console.log("Error al consultar comentarios");
        console.log(e.message);
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
        crBiologicFunctions,
        crSickness,
        crExams,
        crResult,
        crPhysicalExam,
        crPatologicalHistory,
        crCommentary,
        crSicknessCommentary,
        crClinicalAssessment,
        crSyndromesGeriatricProblems,
        getUsers,
        getUserRoles,
        getMedicals,
        getPatients,
        requestRegisterUser,
        requestDisableUser,
        requestEnableUser,
        requestRegisterMedicalsInfo,
        requestRegisterPatientsInfo,
        getSicknessByIdentification,
        getBiologicFunctionsByIdentification,
        getPatologicalHistoryByIdentification,
        getPhysicalExamByIdentification,
        getSyndromesGeriatricProblemsByIdentification,
        getClinicalAssessmentByIdentification,
        getCommentaryByIdentification,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;
