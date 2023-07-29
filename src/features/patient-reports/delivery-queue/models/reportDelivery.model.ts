export class ReportDelivery {
  _id: string;
  name: string;
  patientResultId: string;
  index: number;
  labId: string;
  externalLabId: string;
  employeeCode: string;
  visitId: number;
  deliveryId: number;
  deliveryDate: Date;
  reportDate: Date;
  deliveryStatus: string;
  reportType: string;
  deliveryMode: string;
  destination: string;
  comments: string;
  startDate: Date;
  endDate: Date;
  errorMsg: string;
  clientCode: string;
  clientName: string;
  registrationLocation: string;
  registrationLocationCode: string;
  doctorCode: string;
  doctorName: string;
  qrCode: string;
  pdf: string;
  reportPriority: string;
  abnFlag: boolean;
  critical: boolean;
  colorScheme: any;
  approvalDate: string;
  enteredBy: string;
  userComments: string;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.name = rawData.name;
    this.patientResultId = rawData.patientResultId;
    this.index = rawData.index;
    this.labId = rawData.labId;
    this.externalLabId = rawData.externalLabId;
    this.employeeCode = rawData.employeeCode;
    this.visitId = rawData.visitId;
    this.deliveryId = rawData.deliveryId;
    this.deliveryDate = rawData.deliveryDate;
    this.reportDate = rawData.reportDate;
    this.deliveryStatus = rawData.deliveryStatus;
    this.reportType = rawData.reportType;
    this.deliveryMode = rawData.deliveryMode;
    this.destination = rawData.destination;
    this.comments = rawData.comments;
    this.startDate = rawData.startDate;
    this.endDate = rawData.endDate;
    this.errorMsg = rawData.errorMsg;
    this.clientCode = rawData.clientCode;
    this.clientName = rawData.clientName;
    this.registrationLocation = rawData.registrationLocation;
    this.registrationLocationCode = rawData.registrationLocationCode;
    this.doctorCode = rawData.doctorCode;
    this.doctorName = rawData.doctorName;
    this.qrCode = rawData.qrCode;
    this.pdf = rawData.pdf;
    this.reportPriority = rawData.reportPriority;
    this.abnFlag = rawData.abnFlag;
    this.critical = rawData.critical;
    this.colorScheme = rawData.colorScheme;
    this.approvalDate = rawData.approvalDate;
    this.enteredBy = rawData.enteredBy;
    this.userComments = rawData.userComments;
  }
}
