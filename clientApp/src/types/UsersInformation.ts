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

export interface Medical {
  personalInformation: IPersonalInformation;
  speciality: string;
}
