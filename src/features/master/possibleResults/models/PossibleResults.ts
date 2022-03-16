export class PossibleResults {
  _id: string;
  analyteCode: string;
  analyteName: string;
  result: string;
  possibleValue: string;
  abNormal: boolean;
  critical: boolean;
  conclusionResult: {
    result: string;
    possibleValue: string;
    abNormal: boolean;
    critical: boolean;
  }[];
  defaultConclusion: Record<string, any>;
  enteredBy: string;
  dateCreation: Date;
  dateActive: Date;
  dateExpire: Date;
  version: string;
  status: string;
  environment: string;
  dateOfEntry: Date;
  lastUpdated: Date;

  constructor(rawData: {[key in string]: any}) {
    this._id = rawData._id;
    this.analyteCode = rawData.anlyteCode;
    this.analyteName = rawData.analyteName;
    this.result = rawData.result;
    this.possibleValue = rawData.possibleValue;
    this.abNormal = rawData.abNormal;
    this.critical = rawData.critical;
    this.conclusionResult = rawData.conclusionResult;
    this.defaultConclusion = rawData.defaultConclusion;
    this.enteredBy = rawData.enteredBy;
    this.dateCreation = rawData.dateCreation;
    this.dateActive = rawData.dateActive;
    this.dateExpire = rawData.dateExpire;
    this.version = rawData.version;
    this.status = rawData.status;
    this.environment = rawData.environment;
    this.dateOfEntry = rawData.dateOfEntry;
    this.lastUpdated = rawData.lastUpdated;
  }
}
