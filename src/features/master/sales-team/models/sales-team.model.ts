export class SalesTeam {
  _id: string;
  existsVersionId: string;
  existsRecordId: string;
  salesTerritory: string;
  description: string;
  empCode: string;
  reportingTo: string;
  empName: string;
  salesHierarchy: Array<any>;
  targets: Array<any>;
  enteredBy: string;
  dateCreation: Date;
  dateActive: Date;
  dateExpire: Date;
  version: number;
  companyCode: string;
  status: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.existsVersionId = rawData.existsVersionId;
    this.existsRecordId = rawData.existsRecordId;
    this.salesTerritory = rawData.salesTerritory;
    this.description = rawData.description;
    this.empCode = rawData.empCode;
    this.reportingTo = rawData.reportingTo;
    this.empName = rawData.empName;
    this.salesHierarchy = rawData.salesHierarchy;
    this.targets = rawData.targets;
    this.enteredBy = rawData.enteredBy;
    this.dateCreation = rawData.dateCreation;
    this.dateActive = rawData.dateActive;
    this.dateExpire = rawData.dateExpire;
    this.version = rawData.version;
    this.companyCode = rawData.companyCode;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
