export interface IBiologicFunctions {
    date: string;
    urination: string;
    stools: string;
    appetite: string;
    thirst: string;
    sleep: string;
    other: string;
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

export interface ICommentary {
    date: string;
    comment:string;
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

export interface IExam {
    date: string;
    examName: string;
    examDetail: string;
}

export interface IResult {
    date: string;
    examName: string;
    resultDetail: string;
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