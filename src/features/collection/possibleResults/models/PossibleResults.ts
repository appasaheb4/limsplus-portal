export class PossibleResults {
  analyteCode: string
  analyteName: string
  result: string;
  possibleValue: string;
  abNormal: boolean;
  critical: boolean;
  conclusionResult: [
    {
      result: string
      possibleValue: string
      abNormal: boolean
      critical: boolean
    }
  ]
  constructor(rawData: { [key in string]: any }) {
    this.analyteCode = rawData.anlyteCode
    this.analyteName = rawData.analyteName
    this.result = rawData.result;
    this.possibleValue = rawData.possibleValue;
    this.abNormal = rawData.abNormal;
    this.critical = rawData.critical;
    this.conclusionResult = rawData.conclusionResult
  }
}
