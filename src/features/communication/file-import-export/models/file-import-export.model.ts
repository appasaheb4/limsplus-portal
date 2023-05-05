export class FileImportExport {
  _id: string;
  transferType: string;
  isError: boolean;
  errorMsg: string;
  records: Array<any>;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.transferType = rawData.transferType;
    this.isError = rawData.isError;
    this.errorMsg = rawData.errorMsg;
    this.records = rawData.records;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
