export class Role {
  code?: string | undefined;
  status?: string;
  description?: string | undefined;
  environment?: string | undefined;
  constructor(rawData: {[key in string]: any}) {
    this.code = rawData.code;
    this.status = rawData.status;
    this.description = rawData.description;
    this.environment = rawData.environment;
  }
}
