export class ReportFieldMapping {
  _id: string;
  tempCode: string;
  section: object;
  sectionStyle: string;
  tableName: string;
  fieldName: string;
  startFromLine: number;
  startFromColumn: number;
  fieldLength: number;
  fieldCondition: string;
  fontId: object;
  documentType: string;
  dateOfEntry: Date;
  lastUpdated: Date;
  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.tempCode = rawData.tempCode;
    this.section = rawData.section;
    this.sectionStyle = rawData.sectionStyle;
    this.tableName = rawData.tableName;
    this.fieldName = rawData.fieldName;
    this.startFromLine = rawData.startFromLine;
    this.startFromColumn = rawData.startFromColumn;
    this.fieldLength = rawData.fieldLength;
    this.fieldCondition = rawData.fieldCondition;
    this.fontId = rawData.fontId;
    this.documentType = rawData.documentType;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
