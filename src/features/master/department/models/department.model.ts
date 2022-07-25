export class Department {
  _id: string;
  lab: string;
  code: string;
  name: string;
  shortName: string;
  hod: string;
  reportOrder: number;
  mobileNo: string;
  contactNo: string;
  autoRelease: boolean;
  requireReceveInLab: boolean;
  requireScainIn: boolean;
  routingDept: boolean;
  openingTime: string;
  closingTime: string;
  fyiLine: string;
  workLine: string;
  status: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.lab = rawData.lab;
    this.code = rawData.code;
    this.name = rawData.name;
    this.shortName = rawData.shortName;
    this.hod = rawData.hod;
    this.reportOrder = rawData.reportOrder;
    this.contactNo = rawData.contactNo;
    this.mobileNo = rawData.mobileNo;
    this.autoRelease = rawData.autoRelease;
    this.requireReceveInLab = rawData.requireReceveInLab;
    this.requireScainIn = rawData.requireScainIn;
    this.routingDept = rawData.routingDept;
    this.openingTime = rawData.openingTime;
    this.closingTime = rawData.closingTime;
    this.fyiLine = rawData.fyiLine;
    this.workLine = rawData.workLine;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class SelectedItems {
  lab: any[];
  hod: any[];
  constructor(rawData: {[key in string]: any}) {
    this.lab = rawData.lab;
    this.hod = rawData.hod;
  }
}
