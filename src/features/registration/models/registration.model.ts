export class InformationGroup {
  infoDate?: Date;
  infoRelatedTo?: string;
  keyField?: string;
  infoType?: string;
  infoLookup?: boolean;
  lookupValue?: string;
  information?: string;
  attachment?: string;
  environment?: string;
  enteredBy?: string;
  status?: string;
  constructor(rawData: {[key in string]: any}) {
    this.infoDate = rawData.infoDate;
    this.infoRelatedTo = rawData.infoRelatedTo;
    this.keyField = rawData.keyField;
    this.infoType = rawData.infoType;
    this.infoLookup = rawData.infoLookup;
    this.lookupValue = rawData.lookupValue;
    this.information = rawData.information;
    this.attachment = rawData.attachment;
    this.environment = rawData.environment;
    this.enteredBy = rawData.enteredBy;
    this.status = rawData.status;
  }
}

export class SpecialResult {
  visitId?: string;
  patientResult?: string;
  analyteCode?: string;
  resultType?: string;
  lineNo?: string;
  resultTest?: string;
  ruler?: string;
  abNormal?: boolean;
  enteredBy?: string;
  environment?: string;
  constructor(rawData: {[key in string]: any}) {
    this.visitId = rawData.visitID;
    this.patientResult = rawData.patientResult;
    this.analyteCode = rawData.analyteCode;
    this.resultType = rawData.resultType;
    this.lineNo = rawData.lineNo;
    this.resultTest = rawData.resultTest;
    this.ruler = rawData.ruler;
    this.abNormal = rawData.abNormal;
    this.enteredBy = rawData.enteredBy;
    this.environment = rawData.environment;
  }
}
