export interface IBiologicFunctions {
    date: number;
    urination: string;
    stools: string;
    appetite: string;
    thirst: string;
    sleep: string;
    other: string;
}

export interface IClinicalAssessment {
    date: number;
    bath: boolean;
    dress: boolean;
    hygienicService: boolean;
    movilization: boolean;
    incontinence: boolean;
    feeding: boolean;
}

export interface ICommentary {
    date: number;
    comment:string;
}

export interface IPatologicalHistory {
    date: number;
    congenitalDiseases: string;
    childhoodDiseases: string;
    surgicals: string;
    transfusions: string;
    drugAllergy: string;
    harmfullHabits: string;
    hospitalizations: string;
    other: string;
}

export interface IPhysicalExam {
    date: number;
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

export interface ISickness {
    initialDate: number;
    sicknessName: string;
    diagnostic: string;
    startWay: string;
    course: string;
    signsSymtoms: string;
    treatment: string;
    sicknessIdentifier: string;
}

export interface IExam {
    date: number;
    examName: string;
    examDetail: string;
}

export interface IResult {
    date: number;
    examName: string;
    resultDetail: string;
}

export interface ISyndromesGeriatricProblems {
    date: number;
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