export class NoticeBoard {
  _id: string;
  lab: string;
  header: string;
  message: string;
  action: string;
  status: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.lab = rawData.lab;
    this.header = rawData.header;
    this.message = rawData.message;
    this.action = rawData.action;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
