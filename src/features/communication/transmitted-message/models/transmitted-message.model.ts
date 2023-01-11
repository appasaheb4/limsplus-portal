export class TransmittedMessage {
  _id: string;
  instType: string;
  instId: string;
  protocol: string;
  segmentMessage: string;
  segmentOrder: number;
  segmentArray: Array<any>;
  status: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.instType = rawData.instType;
    this.instId = rawData.instId;
    this.protocol = rawData.protocol;
    this.segmentMessage = rawData.segmentMessage;
    this.segmentOrder = rawData.segmentOrder;
    this.segmentArray = rawData.segmentArray;
    this.status = rawData.status;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
