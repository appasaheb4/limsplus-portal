export class MasterPackage {
  _id: string;
  existsVersionId: string;
  existsRecordId: string;
  dateCreation: Date;
  dateActive: Date;
  dateExpire: Date;
  version: number;
  enteredBy: string;
  lab: string;
  packageCode: string | undefined;
  packageName: string | undefined;
  panelCode: string[];
  panelName: string[];
  bill: boolean;
  printPackageName: boolean;
  printPanelName: boolean;
  status: string;
  serviceType: string;
  reportOrder: any;
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
    this.packageCode = rawData.packageCode;
    this.packageName = rawData.packageName;
    this.panelCode = rawData.panelCode;
    this.panelName = rawData.panelName;
    this.bill = rawData.bill;
    this.printPackageName = rawData.printPackageName;
    this.printPanelName = rawData.printPanelName;
    this.status = rawData.status;
    this.serviceType = rawData.serviceType;
    this.reportOrder = rawData.reportOrder;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class SelectedItems {
  panelCode: any[];
  constructor(rawData: {[key in string]: any}) {
    this.panelCode = rawData.panelCode;
  }
}
