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
  ISicknessRequest,
  IPatologicalHistoryRequest,
  IPhysicalExamRequest,
  ISyndromesGeriatricProblemsRequest,
  IClinicalAssessmentRequest,
  ICommentaryRequest,
  IExamRequest,
  IResultRequest,
} from "types/ClinicRecords";
import { IAddUser, IUser, IUserRole } from "types/Session";
import {
  IMedical,
  IMedicalRequest,
  IPatient,
  IPatientRequest,
} from "types/UsersInformation";
import { SessionContext } from "../SessionProvider/SessionProvider";
import { IBiologicFunctionsRequest } from "../../types/ClinicRecords";

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
  requestRegisterSickness: (
    newSickness: ISicknessRequest,
    patientIdentification: string
  ) => Promise<void>;
  getBiologicFunctionsByIdentification: (
    identification: string
  ) => Promise<void>;
  requestRegisterBiologicFunctions: (
    newBiologicFunctions: IBiologicFunctionsRequest,
    patientIdentification: string
  ) => Promise<void>;
  getPatologicalHistoryByIdentification: (
    identification: string
  ) => Promise<void>;
  requestRegisterPatologicalHistory: (
    newPatologicalHistory: IPatologicalHistoryRequest,
    patientIdentification: string
  ) => Promise<void>;
  getPhysicalExamByIdentification: (identification: string) => Promise<void>;
  requestRegisterPhysicalExam: (
    newPhysicalExam: IPhysicalExamRequest,
    patientIdentification: string
  ) => Promise<void>;
  getSyndromesGeriatricProblemsByIdentification: (
    identification: string
  ) => Promise<void>;
  requestRegisterSyndromesGeriatricProblems: (
    newSyndromesGeriatricProblems: ISyndromesGeriatricProblemsRequest,
    patientIdentification: string
  ) => Promise<void>;
  getClinicalAssessmentByIdentification: (
    identification: string
  ) => Promise<void>;
  requestRegisterClinicalAssessment: (
    newClinicalAssessment: IClinicalAssessmentRequest,
    patientIdentification: string
  ) => Promise<void>;
  getCommentaryByIdentification: (identification: string) => Promise<void>;
  requestRegisterCommentary: (
    newCommentary: ICommentaryRequest,
    patientIdentification: string
  ) => Promise<void>;
  getExamBysicknessIdentifier: (sicknessIdentifier: string) => Promise<void>;
  getResultBysicknessIdentifier: (sicknessIdentifier: string) => Promise<void>;
  requestRegisterExam: (
    newExam: IExamRequest,
    patientIdentification: string
  ) => Promise<void>;
  requestRegisterResult: (
    newResult: IResultRequest,
    patientIdentification: string
  ) => Promise<void>;
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

  const requestRegisterSickness = async (
    newSickness: ISicknessRequest,
    patientIdentification: string
  ) => {
    if (
      hasPermissions(MODULE_IDENTIFICATOR.CR_SICKNESS, PERMISSION_TYPE.CREATE)
    ) {
      try {
        console.log("requestRegisterSickness ", newSickness);
        const res = await cRSicknessContract.methods
          .addSickness(
            sessionContract.options.address.toString(),
            parseInt(patientIdentification),
            [
              newSickness.registerDate,
              newSickness.initialDate,
              newSickness.sicknessName,
              newSickness.diagnostic,
              newSickness.startWay,
              newSickness.course,
              newSickness.signsSymtoms,
              newSickness.treatment,
              newSickness.sicknessIdentifier,
            ]
          )
          .send({ from: currentAccount });
        console.log("sickness creation res: ", res);
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

  const requestRegisterBiologicFunctions = async (
    newBiologicFunctions: IBiologicFunctionsRequest,
    patientIdentification: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_BIOLOGIC_FUNCTIONS,
        PERMISSION_TYPE.CREATE
      )
    ) {
      try {
        console.log("requestRegisterBiologicFunctions ", newBiologicFunctions);
        const res = await cRBiologicFunctionsContract.methods
          .addBiologicFunctions(
            sessionContract.options.address.toString(),
            parseInt(patientIdentification),
            [
              newBiologicFunctions.date,
              newBiologicFunctions.urination,
              newBiologicFunctions.stools,
              newBiologicFunctions.appetite,
              newBiologicFunctions.thirst,
              newBiologicFunctions.sleep,
              newBiologicFunctions.other,
            ]
          )
          .send({ from: currentAccount });
        console.log("BiologicFunctions creation res: ", res);
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

  const requestRegisterPatologicalHistory = async (
    newPatologicalHistory: IPatologicalHistoryRequest,
    patientIdentification: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_PATOLOGICAL_HISTORY,
        PERMISSION_TYPE.CREATE
      )
    ) {
      try {
        console.log(
          "requestRegisterPatologicalHistory ",
          newPatologicalHistory
        );
        const res = await cRPatologicalHistoryContract.methods
          .addPatologicalHistory(
            sessionContract.options.address.toString(),
            parseInt(patientIdentification),
            [
              newPatologicalHistory.date,
              newPatologicalHistory.congenitalDiseases,
              newPatologicalHistory.childhoodDiseases,
              newPatologicalHistory.surgicals,
              newPatologicalHistory.transfusions,
              newPatologicalHistory.drugAllergy,
              newPatologicalHistory.harmfullHabits,
              newPatologicalHistory.hospitalizations,
              newPatologicalHistory.other,
            ]
          )
          .send({ from: currentAccount });
        console.log("requestRegisterPatologicalHistory creation res: ", res);
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

  const requestRegisterPhysicalExam = async (
    newPhysicalExam: IPhysicalExamRequest,
    patientIdentification: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_PHYSYCAL_EXAM,
        PERMISSION_TYPE.CREATE
      )
    ) {
      try {
        console.log("requestRegisterPhysicalExam ", newPhysicalExam);
        const res = await cRPhysicalExamContract.methods
          .addPhysicalExam(
            sessionContract.options.address.toString(),
            parseInt(patientIdentification),
            [
              newPhysicalExam.date,
              newPhysicalExam.bloodPressure,
              newPhysicalExam.heartRate,
              newPhysicalExam.breathingFrequency,
              newPhysicalExam.weight,
              newPhysicalExam.size,
              newPhysicalExam.imc,
              newPhysicalExam.skin,
              newPhysicalExam.headNeck,
              newPhysicalExam.oral,
              newPhysicalExam.chestLungs,
              newPhysicalExam.cardiovascular,
              newPhysicalExam.abdomen,
              newPhysicalExam.genitourinary,
              newPhysicalExam.rectalTract,
              newPhysicalExam.nervousSystem,
              newPhysicalExam.musculoskeletalSystem,
              newPhysicalExam.temperature,
            ]
          )
          .send({ from: currentAccount });
        console.log("requestRegisterPhysicalExam creation res: ", res);
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

  const requestRegisterSyndromesGeriatricProblems = async (
    newSyndromesGeriatricProblems: ISyndromesGeriatricProblemsRequest,
    patientIdentification: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_SYNDROMES_GERIATRIC,
        PERMISSION_TYPE.CREATE
      )
    ) {
      try {
        console.log(
          "requestRegisterSyndromesGeriatricProblems ",
          newSyndromesGeriatricProblems
        );
        const res = await cRSyndromesGeriatricContract.methods
          .addSyndromesGeriatricProblems(
            sessionContract.options.address.toString(),
            parseInt(patientIdentification),
            [
              newSyndromesGeriatricProblems.date,
              newSyndromesGeriatricProblems.delirium,
              newSyndromesGeriatricProblems.vertigo,
              newSyndromesGeriatricProblems.syncope,
              newSyndromesGeriatricProblems.incontinence,
              newSyndromesGeriatricProblems.hearingDeprivation,
              newSyndromesGeriatricProblems.chronicProtraction,
              newSyndromesGeriatricProblems.insomnia,
              newSyndromesGeriatricProblems.constipation,
              newSyndromesGeriatricProblems.falls,
              newSyndromesGeriatricProblems.prostatism,
              newSyndromesGeriatricProblems.chronicPain,
            ]
          )
          .send({ from: currentAccount });
        console.log(
          "requestRegisterSyndromesGeriatricProblems creation res: ",
          res
        );
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

  const requestRegisterClinicalAssessment = async (
    newClinicalAssessment: IClinicalAssessmentRequest,
    patientIdentification: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_CLINICAL_ASSESSMENT,
        PERMISSION_TYPE.CREATE
      )
    ) {
      try {
        console.log(
          "requestRegisterClinicalAssessment ",
          newClinicalAssessment
        );
        const res = await cRClinicalAssessmentContract.methods
          .addClinicalAssessment(
            sessionContract.options.address.toString(),
            parseInt(patientIdentification),
            [
              newClinicalAssessment.date,
              newClinicalAssessment.bath,
              newClinicalAssessment.dress,
              newClinicalAssessment.hygienicService,
              newClinicalAssessment.movilization,
              newClinicalAssessment.incontinence,
              newClinicalAssessment.feeding,
            ]
          )
          .send({ from: currentAccount });
        console.log("requestRegisterClinicalAssessment creation res: ", res);
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

  const requestRegisterCommentary = async (
    newCommentary: ICommentaryRequest,
    patientIdentification: string
  ) => {
    if (
      hasPermissions(MODULE_IDENTIFICATOR.CR_COMMENTARY, PERMISSION_TYPE.CREATE)
    ) {
      try {
        console.log("requestRegisterCommentary ", newCommentary);
        const res = await cRCommentaryContract.methods
          .addCommentary(
            sessionContract.options.address.toString(),
            parseInt(patientIdentification),
            [newCommentary.date, newCommentary.comment]
          )
          .send({ from: currentAccount });
        console.log("requestRegisterCommentary creation res: ", res);
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

  const getExamBysicknessIdentifier = async (sicknessIdentifier: string) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_EXAM_RESULT,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        let _exams: IExam[] = await cRSicknessContract.methods
          .getExamBysicknessIdentifier(
            sessionContract.options.address.toString(),
            sicknessIdentifier
          )
          .call({ from: currentAccount });
        console.log("_exams ", _exams);
        if (_exams !== undefined) {
          console.log("obtained _exams ", _exams);
          setcrExams(_exams);
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

  const requestRegisterExam = async (
    newExam: IExamRequest,
    sicknessIdentifier: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_EXAM_RESULT,
        PERMISSION_TYPE.CREATE
      )
    ) {
      try {
        console.log("requestRegisterExam ", newExam);
        const res = await cRSicknessContract.methods
          .addExam(
            sessionContract.options.address.toString(),
            sicknessIdentifier,
            [newExam.date, newExam.examName, newExam.examDetail]
          )
          .send({ from: currentAccount });
        console.log("requestRegisterExam creation res: ", res);
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

  const getResultBysicknessIdentifier = async (sicknessIdentifier: string) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_EXAM_RESULT,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      try {
        let _results: IResult[] = await cRSicknessContract.methods
          .getResultBysicknessIdentifier(
            sessionContract.options.address.toString(),
            sicknessIdentifier
          )
          .call({ from: currentAccount });
        console.log("_results ", _results);
        if (_results !== undefined) {
          console.log("obtained _results ", _results);
          setcrResult(_results);
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

  const requestRegisterResult = async (
    newResult: IResultRequest,
    sicknessIdentifier: string
  ) => {
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.CR_EXAM_RESULT,
        PERMISSION_TYPE.CREATE
      )
    ) {
      try {
        console.log("requestRegisterResult ", newResult);
        const res = await cRSicknessContract.methods
          .addResult(
            sessionContract.options.address.toString(),
            sicknessIdentifier,
            [newResult.date, newResult.examName, newResult.resultDetail]
          )
          .send({ from: currentAccount });
        console.log("requestRegisterResult creation res: ", res);
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
        requestRegisterSickness,
        getBiologicFunctionsByIdentification,
        requestRegisterBiologicFunctions,
        getPatologicalHistoryByIdentification,
        requestRegisterPatologicalHistory,
        getPhysicalExamByIdentification,
        requestRegisterPhysicalExam,
        getSyndromesGeriatricProblemsByIdentification,
        requestRegisterSyndromesGeriatricProblems,
        getClinicalAssessmentByIdentification,
        requestRegisterClinicalAssessment,
        getCommentaryByIdentification,
        requestRegisterCommentary,
        getExamBysicknessIdentifier,
        requestRegisterExam,
        getResultBysicknessIdentifier,
        requestRegisterResult,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;
