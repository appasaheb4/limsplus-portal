export class PatientTest {
  _id: string;
  orderId: number;
  labId: number;
  patientName: string;
  testId: number;
  panelCode: any[];
  panelList: any[];
  reportOrder: number;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.testId = rawData.testId;
    this.labId = rawData.labId;
    this.patientName = rawData.patientName;
    this.orderId = rawData.orderId;
    this.panelCode = rawData.panelCode;
    this.panelList = rawData.panelList;
    this.reportOrder = rawData.reportOrder;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
