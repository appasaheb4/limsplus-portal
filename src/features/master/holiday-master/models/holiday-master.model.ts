export class HolidayMaster {
  _id: string;
  existsRecordId: string;
  code: string;
  lab: string;
  holidayOn: string;
  date: string;
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
    this.code = rawData.code;
    this.lab = rawData.lab;
    this.holidayOn = rawData.holidayOn;
    this.date = rawData.date;
    this.companyCode = rawData.companyCode;
    this.status = rawData.status;
    this.enteredBy = rawData.enteredBy;
    this.dateCreation = rawData.dateCreation;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
