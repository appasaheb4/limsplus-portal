import _ from 'lodash';

export class ServiceResponse<T> {
  data?: T;
  success?: number;
  message?: string;

  constructor(success: number, message: string, data?: T) {
    this.data = data;
    this.message = message;
    this.success = success;
  }

  hasData(): boolean {
    return !_.isNil(this.data);
  }

  hasError(): boolean {
    return !this.success;
  }

  getErrorMessage(): string {
    return this.message ?? '';
  }
}
