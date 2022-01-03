export class EnvironmentValue{
    LABID_AUTO_GENERATE: string
    constructor(rawData: { [key in string]: any }) {
        this.LABID_AUTO_GENERATE = rawData.LABID_AUTO_GENERATE
      }
}