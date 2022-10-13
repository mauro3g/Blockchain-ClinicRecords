import { IMenuOption } from "types/navigation";
import { MODULE_IDENTIFICATOR } from "./modules";
import { PATH } from "./routes";

export const MENU_NAVIGATION: IMenuOption[] = [
  {
    moduleId: MODULE_IDENTIFICATOR.USERS_MANAGE,
    navigation: {
      text: "Usuarios",
      to: `${PATH.dashboard}${PATH.users}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.DOCTORS_MANAGE,
    navigation: {
      text: "Doctores",
      to: `${PATH.dashboard}${PATH.doctors}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.NURSE_MANAGE,
    navigation: {
      text: "Enfermeras",
      to: `${PATH.dashboard}${PATH.users}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.MEDICALS_INFO,
    navigation: {
      text: "Información médica",
      to: `${PATH.dashboard}${PATH.medicalInfo}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.PATIENTS_INFO,
    navigation: {
      text: "Historias Clinicas",
      to: `${PATH.dashboard}${PATH.clinicRecords}`,
      icon: "card_membership",
    },
  },
];

export const CLINIC_RECORD_OPTIONS: IMenuOption[] = [
  {
    moduleId: MODULE_IDENTIFICATOR.CR_SICKNESS,
    navigation: {
      text: "Enfermedades",
      to: `${PATH.dashboard}${PATH.clinicRecords}${PATH.sickness}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.CR_EXAM_RESULT,
    navigation: {
      text: "Exámen/Resultado",
      to: `${PATH.dashboard}${PATH.clinicRecords}${PATH.examResult}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.CR_BIOLOGIC_FUNCTIONS,
    navigation: {
      text: "Funciones Biológicas",
      to: `${PATH.dashboard}${PATH.clinicRecords}${PATH.biologicFunctions}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.CR_PATOLOGICAL_HISTORY,
    navigation: {
      text: "Historial Patológico",
      to: `${PATH.dashboard}${PATH.clinicRecords}${PATH.patologicalHistory}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.CR_PHYSYCAL_EXAM,
    navigation: {
      text: "Exámen Físico",
      to: `${PATH.dashboard}${PATH.clinicRecords}${PATH.physicalExam}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.CR_SYNDROMES_GERIATRIC,
    navigation: {
      text: "Síndromes y problemas geriátricos",
      to: `${PATH.dashboard}${PATH.clinicRecords}${PATH.syndromesGeriatric}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.CR_CLINICAL_ASSESSMENT,
    navigation: {
      text: "Ficha Clínica",
      to: `${PATH.dashboard}${PATH.clinicRecords}${PATH.clinicalAssessment}`,
      icon: "card_membership",
    },
  },
  {
    moduleId: MODULE_IDENTIFICATOR.CR_COMMENTARY,
    navigation: {
      text: "Comentarios",
      to: `${PATH.dashboard}${PATH.clinicRecords}${PATH.commentary}`,
      icon: "card_membership",
    },
  },
];
