export class PageSetting {
  _id: string;
  tempCode: string;
  pageSize: string;
  topMargin: string;
  bottomMargin: string;
  leftMargin: string;
  rightMargin: string;
  headerSize: string;
  footerSize: string;
  pageOrientation: string;
  backgroundImage: any;
  version: number;
  environment: string;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.tempCode = rawData.tempCode;
    this.pageSize = rawData.pageSize;
    this.topMargin = rawData.topMargin;
    this.bottomMargin = rawData.bottomMargin;
    this.leftMargin = rawData.leftMargin;
    this.rightMargin = rawData.rightMargin;
    this.headerSize = rawData.headerSize;
    this.footerSize = rawData.footerSize;
    this.pageOrientation = rawData.pageOrientation;
    this.version = rawData.version;
    this.environment = rawData.environment;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
