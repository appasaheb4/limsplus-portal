export class Methods {
  _id: string;
  methodsCode: string;
  methodsName: string;
  description: string;
  companyCode: string;
  status: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.methodsCode = rawData.methodsCode;
    this.methodsName = rawData.methodsName;
    this.description = rawData.description;
    this.companyCode = rawData.companyCode;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
