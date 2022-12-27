export class InterfaceManager {
  _id: string;
  interfaceType: string;
  instrumentType: string;
  instrumentName: string;
  dataFlowFrom: string;
  protocol: string;
  blockStart: string;
  blockEnd: string;
  filed: string;
  value: string;
  fileds: {filed: string; value: string}[];
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.interfaceType = rawData.interfaceType;
    this.instrumentType = rawData.instrumentType;
    this.instrumentName = rawData.instrumentName;
    this.dataFlowFrom = rawData.dataFlowFrom;
    this.protocol = rawData.protocol;
    this.blockStart = rawData.blockStart;
    this.blockEnd = rawData.blockEnd;
    this.filed = rawData.filed;
    this.value = rawData.value;
    this.fileds = rawData.fileds;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
