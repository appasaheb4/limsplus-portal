export class PatientReport {
  _id: string;
  acStatus: string;
  age: number;
  ageUnits: string;
  collectionDate: string;
  firstName: string;
  labId: number;
  lastName: string;
  patientResultList: Array<any>;
  rLabCity: string;
  rLabCode: string;
  rLabName: string;
  refBy: string;
  registrationDate: string;
  reportStatus: string;
  reportTemplate: string;
  sex: string;
  title: string;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.acStatus = rawData.acStatus;
    this.age = rawData.age;
    this.ageUnits = rawData.ageUnits;
    this.collectionDate = rawData.collectionDate;
    this.firstName = rawData.firstName;
    this.labId = rawData.labId;
    this.lastName = rawData.lastName;
    this.patientResultList = rawData.patientResultList;
    this.rLabCity = rawData.rLabCity;
    this.rLabCode = rawData.rLabCode;
    this.rLabName = rawData.rLabName;
    this.refBy = rawData.refBy;
    this.registrationDate = rawData.registrationDate;
    this.reportStatus = rawData.reportStatus;
    this.reportTemplate = rawData.reportTemplate;
    this.sex = rawData.sex;
    this.title = rawData.title;
  }
}
