export class FontSetting {
  _id: string;
  tempCode: string;

  fontName: string;
  fontSize: number;
  fontStyle: string;
  fontColor: string;
  fontBackground: string;
  fontCase: string;

  version: number;
  environment: string;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.tempCode = rawData.tempCode;

    this.fontName = rawData.fontName;
    this.fontSize = rawData.fontSize;
    this.fontStyle = rawData.fontStyle;
    this.fontColor = rawData.fontColor;
    this.fontBackground = rawData.fontBackground;
    this.fontCase = rawData.fontCase;

    this.version = rawData.version;
    this.environment = rawData.environment;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
