export class PatientVisit {
  pId: number;
  patientName: string;
  rLab: string;
  visitId: string;
  labId: number | string;
  visitDate: Date;
  registrationDate: Date;
  collectionDate: Date;
  dueDate: Date;
  birthDate: Date;
  age: number;
  ageUnits: string;
  collectionCenter: string;
  collectionCenterName: string;
  corporateCode: string;
  corporateName: string;
  acClass: string;
  grossAmount: number;
  netAmount: number;
  discountAmount: number;
  discountPer: number;
  isNewDoctor: boolean;
  doctorId: string;
  doctorName: string;
  doctorMobileNo: string;
  miscellaneousCharges: number;
  miscCharges: Array<any>;
  discountCharges: object;
  reportType: string;
  history: boolean;
  holdReport: boolean;
  holdReason: string;
  status: string;
  extraData: {
    accountType: string;
    deliveryMode: string;
    additionalInfo: string;
    invoiceAc: string;
    billingMethod: string;
    billNumber: string;
    urgent: boolean;
    confidental: boolean;
    autoNumber: string;
    methodCollection: string;
    collectedBy: string;
    pendingDataEntry: boolean;
    receivedDate: Date;
    resultDate: Date;
    approvalDate: Date;
    approvalStatus: string;
    reportStatus: string;
    reportedDate: Date;
    enteredBy: string;
    gestation: string;
    height: string;
    weight: string;
    archieve: string;
    loginInterface: string;
    registrationInterface: string;
    submittedSystem: string;
    submittedOn: string;
    environment: string;
  };
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this.pId = rawData.pId;
    this.patientName = rawData.patientName;
    this.rLab = rawData.rLab;
    this.visitId = rawData.visitId;
    this.labId = rawData.labId;
    this.visitDate = rawData.visitDate;
    this.registrationDate = rawData.registrationDate;
    this.collectionDate = rawData.collectionDate;
    this.dueDate = rawData.dueDate;
    this.birthDate = rawData.birthDate;
    this.age = rawData.age;
    this.ageUnits = rawData.ageUnits;
    this.collectionCenter = rawData.collectionCenter;
    this.collectionCenterName = rawData.collectionCenterName;
    this.corporateCode = rawData.corporateCode;
    this.corporateName = rawData.corporateName;
    this.acClass = rawData.acClass;
    this.grossAmount = rawData.grossAmount;
    this.netAmount = rawData.netAmount;
    this.discountAmount = rawData.discountAmount;
    this.discountPer = rawData.discountPer;
    this.isNewDoctor = rawData.isNewDoctor;
    this.doctorId = rawData.doctorId;
    this.doctorName = rawData.doctorName;
    this.doctorMobileNo = rawData.doctorMobileNo;
    this.miscellaneousCharges = rawData.miscellaneousCharges;
    this.miscCharges = rawData.miscCharges;
    this.discountCharges = rawData.discountCharges;
    this.reportType = rawData.reportType;
    this.history = rawData.history;
    this.holdReport = rawData.holdReport;
    this.holdReason = rawData.holdReason;
    this.status = rawData.status;
    this.extraData = rawData.extraData;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}

export class SelectedPatientVisitItems {
  miscCharges: any[];
  constructor(rawData: {[key in string]: any}) {
    this.miscCharges = rawData.miscCharges;
  }
}
