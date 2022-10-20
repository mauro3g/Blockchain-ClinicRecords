export interface IPersonalInformation {
  name: string;
  identificationNumber: number;
  birthDate: number;
  gender: string;
}

export interface IPatient {
  personalInformation: IPersonalInformation;
  maritalStatus: string;
  occupation: string;
  direction: string;
  contactPerson: string;
  phone: string;
}

export interface IMedical {
  userId: string;
  personalInformation: IPersonalInformation;
  speciality: string;
}

export interface IMedicalRequest {
  sessionContractAddress: string;
  userId: number;
  name: string;
  identificationNumber: number;
  birthDate: number;
  gender: string;
  speciality: string;
}
