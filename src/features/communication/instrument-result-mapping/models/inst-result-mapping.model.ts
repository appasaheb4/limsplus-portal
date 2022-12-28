export class InstResultMapping {
  _id?: string;
  index: number;
  key?: string;
  pLab?: string;
  testCode?: string;
  testName?: string;
  department?: string;
  instType?: string;
  instId?: string;
  analyteCode?: string;
  analyteName?: string;
  assayCode?: string;
  instTest?: string;
  environment?: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.index = rawData.index;
    this.key = rawData.key;
    this.pLab = rawData.pLab;
    this.testCode = rawData.testCode;
    this.testName = rawData.testName;
    this.department = rawData.department;
    this.instType = rawData.instType;
    this.instId = rawData.instId;
    this.analyteCode = rawData.analyteCode;
    this.analyteName = rawData.analyteName;
    this.assayCode = rawData.assayCode;
    this.instTest = rawData.instTest;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
