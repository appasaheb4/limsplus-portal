export interface ReportToEmail {
  name: string;
  email: string;
}

export interface ReportToMobile {
  name: string;
  mobileNo: string;
}
export class PatientManger {
  pId: number;
  isPatientMobileNo: boolean;
  mobileNo: string;
  birthDate: Date;
  age: number;
  ageUnit: string;
  isBirthdateAvailabe: boolean;
  title: string;
  firstName: string;
  middleName: string | undefined | null;
  lastName: string;
  sex: string;
  species: string;
  breed: string | undefined | null;
  usualDoctor: string;
  history: boolean;
  diagnosis: string;
  disease: string;
  isVIP: boolean;
  isAddress: boolean;
  isCopyDoctor: boolean;
  reportToEmails: Array<ReportToEmail>;
  reportToMobiles: Array<ReportToMobile>;
  extraData: {
    address: string;
    postcode: string;
    area: string;
    city: string;
    district: string;
    state: string;
    country: string;
    email: string;
    isMobileAndWhatsApp: boolean;
    whatsappNumber: string;
    permanent: boolean;
    vip: boolean;
    confidental: boolean;
    photograph: any;
    signature: any;
    bloodGroup: string;
    height: string;
    weight: string;
    followUp: string;
    comments: string;
    fyiLine: string;
    balance: string;
    accountType: string;
    externalPid: string;
    enteredBy: string;
    status: string;
    environment: string;
  };

  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this.pId = rawData.pId;
    this.isPatientMobileNo = rawData.isPatientMobileNo;
    this.mobileNo = rawData.mobileNo;
    this.birthDate = rawData.birthDate;
    this.age = rawData.age;
    this.ageUnit = rawData.ageUnit;
    this.isBirthdateAvailabe = rawData.isBirthdateAvailabe;
    this.title = rawData.title;
    this.firstName = rawData.firstName;
    this.middleName = rawData.middleName;
    this.lastName = rawData.lastName;
    this.sex = rawData.sex;
    this.species = rawData.species;
    this.breed = rawData.breed;
    this.usualDoctor = rawData.usualDoctor;
    this.history = rawData.history;
    this.diagnosis = rawData.diagnosis;
    this.disease = rawData.disease;
    this.isVIP = rawData.isVIP;
    this.isAddress = rawData.isAddress;
    this.isCopyDoctor = rawData.isCopyDoctor;
    this.reportToEmails = rawData.reportTo;
    this.reportToMobiles = rawData.reportToMobiles;
    this.extraData = rawData.extraData;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
