export class SalesTeam {
  _id: string;
  salesTerritory: string;
  description: string;
  empCode: string;
  empName: string;
  salesHierarchy: Array<any>;
  target: Array<any>;
  enteredBy: string;
  dateCreation: Date;
  dateActive: Date;
  dateExpire: Date;
  version: number;
  status: string;
  environment: string;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.salesTerritory = rawData.salesTerritory;
    this.description = rawData.description;
    this.empCode = rawData.empCode;
    this.empName = rawData.empName;
    this.salesHierarchy = rawData.salesHierarchy;
    this.target = rawData.target;
    this.enteredBy = rawData.enteredBy;
    this.dateCreation = rawData.dateCreation;
    this.dateActive = rawData.dateActive;
    this.dateExpire = rawData.dateExpire;
    this.version = rawData.version;
    this.status = rawData.status;
    this.environment = rawData.environment;
  }
}
