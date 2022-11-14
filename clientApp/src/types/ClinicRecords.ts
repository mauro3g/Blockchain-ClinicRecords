export interface IBiologicFunctions {
  date: string;
  urination: string;
  stools: string;
  appetite: string;
  thirst: string;
  sleep: string;
  other: string;
}

export interface IBiologicFunctionsRequest
  extends Omit<IBiologicFunctions, "date"> {
  date: number;
}

export interface IClinicalAssessment {
  date: string;
  bath: boolean;
  dress: boolean;
  hygienicService: boolean;
  movilization: boolean;
  incontinence: boolean;
  feeding: boolean;
}

export interface IClinicalAssessmentRequest
  extends Omit<IClinicalAssessment, "date"> {
  date: number;
}

export interface ICommentary {
  date: string;
  comment: string;
}

export interface ICommentaryRequest extends Omit<ICommentary, "date"> {
  date: number;
}

export interface IPatologicalHistory {
  date: string;
  congenitalDiseases: string;
  childhoodDiseases: string;
  surgicals: string;
  transfusions: string;
  drugAllergy: string;
  harmfullHabits: string;
  hospitalizations: string;
  other: string;
}

export interface IPatologicalHistoryRequest
  extends Omit<IPatologicalHistory, "date"> {
  date: number;
}

export interface IPhysicalExam {
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
}

export interface IPhysicalExamRequest extends Omit<IPhysicalExam, "date"> {
  date: number;
}

export interface ISickness {
  registerDate: string;
  initialDate: string;
  sicknessName: string;
  diagnostic: string;
  startWay: string;
  course: string;
  signsSymtoms: string;
  treatment: string;
  sicknessIdentifier: string;
}

export interface ISicknessRequest
  extends Omit<ISickness, "registerDate" | "initialDate"> {
  registerDate: number;
  initialDate: number;
}

export interface IExam {
  date: string;
  examName: string;
  examDetail: string;
}

export interface IExamRequest extends Omit<IExam, "date"> {
  date: number;
}

export interface IResult {
  date: string;
  examName: string;
  resultDetail: string;
}

export interface IResultRequest extends Omit<IResult, "date"> {
  date: number;
}

export interface ISyndromesGeriatricProblems {
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
}

export interface ISyndromesGeriatricProblemsRequest
  extends Omit<ISyndromesGeriatricProblems, "date"> {
  date: number;
}
