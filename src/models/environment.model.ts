export class EnvironmentValue {
  LABID_AUTO_GENERATE: any;
  LABID_LENGTH: any;
  constructor(rawData: {[key in string]: any}) {
    this.LABID_AUTO_GENERATE = rawData.LABID_AUTO_GENERATE;
    this.LABID_LENGTH = rawData.LABID_LENGTH;
  }
}
