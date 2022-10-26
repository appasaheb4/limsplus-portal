export class TemplateSettings {
  _id: string;
  tempCode: string;
  tempName: string;
  isToolbar: boolean;
  isBackgroundImage: boolean;
  backgroundImage: any;
  backgroundImageBase64: any;
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
    this.isBackgroundImage = rawData.isBackgroundImage;
    this.backgroundImage = rawData.backgroundImage;
    this.backgroundImageBase64 = rawData.backgroundImageBase64;
    this.pageSize = rawData.pageSize;
    this.mainBoxCSS = rawData.mainBoxCSS;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
