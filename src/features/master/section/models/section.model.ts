export class Section {
  _id: string;
  departmentCode: string;
  code: string;
  name: string;
  shortName: string;
  sectionInCharge: string;
  mobileNo: string;
  contactNo: string;
  fyiLine: string;
  workLine: string;
  companyCode: string;
  status: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: { [key in string]: any }) {
    this._id = rawData._id;
    this.departmentCode = rawData.departmentCode;
    this.code = rawData.code;
    this.name = rawData.name;
    this.shortName = rawData.shortName;
    this.sectionInCharge = rawData.sectionInCharge;
    this.mobileNo = rawData.mobileNo;
    this.contactNo = rawData.contactNo;
    this.fyiLine = rawData.fyiLine;
    this.workLine = rawData.workLine;
    this.status = rawData.status;
    this.companyCode = rawData.companyCode;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
