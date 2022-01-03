export class EnvironmentValue{
    LABID_AUTO_GENERATE: any
    constructor(rawData: { [key in string]: any }) {
        this.LABID_AUTO_GENERATE = rawData.LABID_AUTO_GENERATE
      }
}  