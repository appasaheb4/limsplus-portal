export class ReportDelivery {
  _id: string;
  labId: string;
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
  qrCode: string;
  pdf: string;
  enteredBy: string;
  userComments: string;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.labId = rawData.labId;
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
    this.qrCode = rawData.qrCode;
    this.pdf = rawData.pdf;
    this.enteredBy = rawData.enteredBy;
    this.userComments = rawData.userComments;
  }
}
