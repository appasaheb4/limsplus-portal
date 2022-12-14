export class ClientRegistration {
  _id: string;
  countryName: string;
  labId: number;
  registrationDate: Date;
  clientCode: string;
  clientName: string;
  patientName: string;
  age: number;
  ageUnits: string;
  sex: string;
  testName: string;
  testCode: string;
  sample: string;
  dueDate: Date;
  reportDate: Date;
  status: string;
  pdfReport: any;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.countryName = rawData.countryName;
    this.labId = rawData.labId;
    this.registrationDate = rawData.registrationDate;
    this.clientCode = rawData.clientCode;
    this.clientName = rawData.clientName;
    this.patientName = rawData.patientName;
    this.age = rawData.age;
    this.ageUnits = rawData.ageUnits;
    this.sex = rawData.sex;
    this.testName = rawData.testName;
    this.testCode = rawData.testCode;
    this.sample = rawData.sample;
    this.dueDate = rawData.dueDate;
    this.reportDate = rawData.reportDate;
    this.status = rawData.status;
    this.pdfReport = rawData.reportDate;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
