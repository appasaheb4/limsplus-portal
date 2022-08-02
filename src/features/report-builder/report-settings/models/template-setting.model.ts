export class TemplateSettings {
  _id: string;
  tempCode: string;
  tempName: string;
  isToolbar: boolean;
  pageSize: string;
  mainBoxCSS: string;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.tempCode = rawData.tempCode;
    this.tempName = rawData.tempName;
    this.isToolbar = rawData.isToolbar;
    this.pageSize = rawData.pageSize;
    this.mainBoxCSS = rawData.mainBoxCSS;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
