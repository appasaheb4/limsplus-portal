export class DeliverySchedule {
  _id: string;
  schCode: string;
  sundayProcessing: boolean;
  holidayProcessing: boolean;
  sundayReporting: boolean;
  holidayReporting: boolean;
  pStartTime: string;
  pEndTime: string;
  cutofTime: string;
  secoundCutofTime: string;
  processingType: string;
  schFrequency: any;
  reportOn: string;
  dynamicRT: string;
  dynamicTU: string;
  fixedRT: string;
  onTime: boolean;
  schForDept: string;
  schForPat: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.schCode = rawData.schCode;
    this.sundayProcessing = rawData.sundayProcessing;
    this.holidayProcessing = rawData.holidayProcessing;
    this.sundayReporting = rawData.sundayReporting;
    this.holidayReporting = rawData.holidayReporting;
    this.pStartTime = rawData.pStartTime;
    this.pEndTime = rawData.pEndTime;
    this.cutofTime = rawData.cutofTime;
    this.secoundCutofTime = rawData.secoundCutofTime;
    this.processingType = rawData.processingType;
    this.schFrequency = rawData.schFrequency;
    this.reportOn = rawData.reportOn;
    this.dynamicRT = rawData.dynamicRT;
    this.dynamicTU = rawData.dynamicTU;
    this.fixedRT = rawData.fixedRT;
    this.onTime = rawData.onTime;
    this.schForDept = rawData.schForDept;
    this.schForPat = rawData.schForPat;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
