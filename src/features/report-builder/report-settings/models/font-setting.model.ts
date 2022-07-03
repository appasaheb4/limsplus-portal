export class FontSetting {
  _id: string;
  fontId: string;

  fontName: string;
  fontSize: number;
  fontStyle: string;
  fontColor: string;
  fontBackground: string;
  fontCase: string;

  fontCss: string;
  version: number;
  environment: string;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.fontId = rawData.fontId;

    this.fontName = rawData.fontName;
    this.fontSize = rawData.fontSize;
    this.fontStyle = rawData.fontStyle;
    this.fontColor = rawData.fontColor;
    this.fontBackground = rawData.fontBackground;
    this.fontCase = rawData.fontCase;

    this.fontCss = rawData.fontCss;
    this.version = rawData.version;
    this.environment = rawData.environment;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
