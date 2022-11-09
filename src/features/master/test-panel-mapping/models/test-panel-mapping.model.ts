export class TestPanelMapping {
  _id: string;
  existsVersionId: string;
  existsRecordId: string;
  dateCreation: Date;
  dateActive: Date;
  dateExpire: Date;
  version: number;
  enteredBy: string;
  lab: string;
  panelCode: string;
  testCode: Array<string>;
  testName: Array<string>;
  reportOrder: any;
  bill: boolean;
  printTestName: boolean;
  printAnalyteName: boolean;
  printPanelName: boolean;
  panelMethod: boolean;
  testMethod: boolean;
  analyteMethod: boolean;
  panelInterpretation: boolean;
  testInterpretation: boolean;
  analyteInterpretation: boolean;
  status: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.existsVersionId = rawData.existsVersionId;
    this.existsRecordId = rawData.existsRecordId;
    this.dateCreation = rawData.dateCreation;
    this.dateActive = rawData.dateActive;
    this.dateExpire = rawData.dateExpire;
    this.version = rawData.version;
    this.enteredBy = rawData.enteredBy;
    this.lab = rawData.lab;
    this.panelCode = rawData.panelCode;
    this.testCode = rawData.testCode;
    this.testName = rawData.testName;
    this.reportOrder = rawData.reportOrder;
    this.bill = rawData.bill;
    this.printTestName = rawData.printTestName;
    this.printAnalyteName = rawData.printAnalyteName;
    this.printPanelName = rawData.printPanelName;
    this.panelMethod = rawData.panelMethod;
    this.testMethod = rawData.testMethod;
    this.analyteMethod = rawData.analyteMethod;
    this.panelInterpretation = rawData.panelInterpretation;
    this.testInterpretation = rawData.testInterpretation;
    this.analyteInterpretation = rawData.analyteInterpretation;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class SelectedItems {
  testName: any[];
  constructor(rawData: {[key in string]: any}) {
    this.testName = rawData.testName;
  }
}
