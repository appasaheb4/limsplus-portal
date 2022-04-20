export class PatientManger {
  pId: number;
  mobileNo: string;
  birthDate: Date;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  sex: string;
  species: string;
  breed: string | undefined | null;
  usualDoctor: string;
  history: boolean;

  extraData: {
    address: string;
    postcode: string;
    city: string;
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
    enteredBy: string;
    status: string;
    environment: string;
  };
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this.pId = rawData.pId;
    this.mobileNo = rawData.mobileNo;
    this.birthDate = rawData.birthDate;
    this.title = rawData.title;
    this.firstName = rawData.firstName;
    this.middleName = rawData.middleName;
    this.lastName = rawData.lastName;
    this.sex = rawData.sex;
    this.species = rawData.species;
    this.breed = rawData.breed;
    this.usualDoctor = rawData.usualDoctor;
    this.history = rawData.history;
    this.extraData = rawData.extraData;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
