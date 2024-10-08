export class PatientSample {
  specimenId: number;
  pLab: string;
  rLab: string;
  outSourceLab: string;
  outSourceStatus: string;
  department: string;
  section: string;
  containerId: string;
  sampleType: string;
  testList: string;
  departmentList: string;
  receivedDate: Date;
  collectionDate: Date;
  methodCollection: string;
  primaryContainer: string;
  aliquot: string;
  uniqueContainer: string;
  labSpecific: string;
  departmentSpecific: string;
  sharedSample: string;
  labelInstructions: string;
  comment: string;
  enteredBy: string;
  status: string;
  environment: string;

  constructor(rawData: { [key in string]: any }) {
    this.specimenId = rawData.specimenId;
    this.pLab = rawData.pLab;
    this.rLab = rawData.rLab;
    this.outSourceLab = rawData.outSourceLab;
    this.outSourceStatus = rawData.outSourceStatus;
    this.department = rawData.department;
    this.section = rawData.section;
    this.containerId = rawData.containerId;
    this.sampleType = rawData.sampleType;
    this.testList = rawData.testList;
    this.departmentList = rawData.departmentList;
    this.receivedDate = rawData.receivedDate;
    this.collectionDate = rawData.collectionDate;
    this.methodCollection = rawData.methodCollection;
    this.primaryContainer = rawData.primaryContainer;
    this.aliquot = rawData.aliquot;
    this.uniqueContainer = rawData.uniqueContainer;
    this.labSpecific = rawData.labSpecific;
    this.departmentSpecific = rawData.departmentSpecific;
    this.sharedSample = rawData.sharedSample;
    this.labelInstructions = rawData.labelInstructions;
    this.comment = rawData.comment;
    this.enteredBy = rawData.enteredBy;
    this.status = rawData.status;
    this.environment = rawData.environment;
  }
}
