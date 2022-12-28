export class MasterAnalyte {
  _id: string;
  existsVersionId: string;
  existsRecordId: string;
  dateCreation: Date;
  dateActive: Date;
  dateExpire: Date;
  version: number;
  enteredBy: string;
  lab: string;
  analyteCode: string;
  analyteName: string;
  description: string;
  shortName: string;
  bill: boolean;
  price: number;
  schedule: Date;
  instantResult: boolean;
  tubeGroups: string;
  pageBreak: boolean;
  method: boolean;
  analyteMethodCode: string;
  analyteMethodName: string;
  workflow: string;
  departments: string;
  sampleType: string;
  reportable: boolean;
  calculationFlag: boolean;
  calcyName: string;
  rangeSetOn: string;
  repetition: boolean;
  picture: number | undefined;
  units: string;
  usage: string;
  cptCode: string;
  resultType: string;
  defaultResult: string;
  numeric: string;
  alpha: string;
  abnFlag: boolean;
  critical: boolean;
  analyteType: string;
  abnormalHighlighterCSS: string;
  criticalHighlighterCSS: string;
  internalComments: string;
  externalComments: string;
  analyteBottomMarker: object;
  analyteRightMarker: string;
  reagentCode: string;
  status: string;
  minReportable: string;
  maxReportable: string;
  interpretation: string;
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
    this.analyteCode = rawData.analyteCode;
    this.analyteName = rawData.analyteName;
    this.description = rawData.description;
    this.shortName = rawData.shortName;
    this.bill = rawData.bill;
    this.price = rawData.price;
    this.schedule = rawData.schedule;
    this.instantResult = rawData.instantResult;
    this.tubeGroups = rawData.tubeGroups;
    this.pageBreak = rawData.pageBreak;
    this.method = rawData.method;
    this.analyteMethodCode = rawData.analyteMethodCode;
    this.analyteMethodName = rawData.analyteMethodName;
    this.workflow = rawData.workflow;
    this.departments = rawData.departments;
    this.sampleType = rawData.sampleType;
    this.reportable = rawData.reportable;
    this.calculationFlag = rawData.calculationFlag;
    this.calcyName = rawData.calcyName;
    this.rangeSetOn = rawData.rangeSetOn;
    this.repetition = rawData.repetition;
    this.picture = rawData.picture;
    this.units = rawData.units;
    this.usage = rawData.usage;
    this.cptCode = rawData.cptCode;
    this.resultType = rawData.resultType;
    this.defaultResult = rawData.defaultResult;
    this.numeric = rawData.numeric;
    this.alpha = rawData.abnFlag;
    this.abnFlag = rawData.abnFlag;
    this.critical = rawData.critical;
    this.analyteType = rawData.analyteType;
    this.abnormalHighlighterCSS = rawData.abnormalHighlighterCSS;
    this.criticalHighlighterCSS = rawData.criticalHighlighterCSS;
    this.internalComments = rawData.internalComments;
    this.externalComments = rawData.externalComments;
    this.analyteBottomMarker = rawData.analyteBottomMarker;
    this.analyteRightMarker = rawData.analyteRightMarker;
    this.reagentCode = rawData.reagentCode;
    this.status = rawData.status;
    this.minReportable = rawData.minReportable;
    this.maxReportable = rawData.maxReportable;
    this.interpretation = rawData.interpretation;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class SelectedItems {
  lab: any[];
  department: any[];
  constructor(rawData: {[key in string]: any}) {
    this.lab = rawData.lab;
    this.department = rawData.department;
  }
}

export class MasterAnalyteActivity {
  disableAnalyteName: boolean;

  constructor(rawData: {[key in string]: any}) {
    this.disableAnalyteName = rawData.disableAnalyteName;
  }
}
