export class TatMaster {
  _id: string;
  existsRecordId: string;
  sNo: number;
  rLab: string;
  pLab: string;
  registrationLocation: string;
  tatStartTime: string;
  tat: string;
  tatValue: string;
  units: string;
  status: string;
  companyCode: string;
  enteredBy: string;
  dateCreation: Date;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.existsRecordId = rawData.existsRecordId;
    this.sNo = rawData.sNo;
    this.rLab = rawData.rLab;
    this.pLab = rawData.pLab;
    this.registrationLocation = rawData.registrationLocation;
    this.tatStartTime = rawData.tatStartTime;
    this.tat = rawData.tat;
    this.tatValue = rawData.tatValue;
    this.units = rawData.units;
    this.companyCode = rawData.companyCode;
    this.status = rawData.status;
    this.enteredBy = rawData.enteredBy;
    this.dateCreation = rawData.dateCreation;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
