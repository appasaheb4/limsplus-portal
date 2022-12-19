export class SegmentMapping {
  _id?: string;
  index: number;
  instType: string;
  dataFlow: string;
  protocol: string;
  segments?: string;
  segmentOrder?: string;
  segmentRequired?: boolean;
  elementNo?: string;
  elementName?: string;
  elementRequired?: boolean;
  elementSequence?: number;
  transmittedData?: string;
  defaultValue?: string;
  fieldArray?: string;
  repeatDelimiter?: boolean;
  fieldType?: string;
  fieldLength?: number;
  requiredForLims?: boolean;
  limsTables?: string;
  limsFields?: string;
  environment?: string;
  dateOfEntry?: Date;
  lastUpdated?: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.index = rawData.index;
    this.instType = rawData.instType;
    this.dataFlow = rawData.dataFlow;
    this.protocol = rawData.protocol;
    this.segments = rawData.segments;
    this.segmentOrder = rawData.segmentOrder;
    this.segmentRequired = rawData.segmentRequired;
    this.elementNo = rawData.elementNo;
    this.elementName = rawData.elementName;
    this.elementRequired = rawData.elementRequired;
    this.elementSequence = rawData.elementSequence;
    this.transmittedData = rawData.transmittedData;
    this.defaultValue = rawData.defaultValue;
    this.fieldArray = rawData.fieldArray;
    this.repeatDelimiter = rawData.repeatDelimiter;
    this.fieldType = rawData.fieldType;
    this.fieldLength = rawData.fieldLength;
    this.requiredForLims = rawData.requiredForLims;
    this.limsTables = rawData.limsTables;
    this.limsFields = rawData.limsFields;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
