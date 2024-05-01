export class Role {
  code?: string;
  description?: string;
  status?: string;
  environment?: string;
  constructor(rawData: { [key in string]: any }) {
    this.code = rawData.code;
    this.status = rawData.status;
    this.description = rawData.description;
    this.environment = rawData.environment;
  }
}
