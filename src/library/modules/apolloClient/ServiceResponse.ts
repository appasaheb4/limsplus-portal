import _ from 'lodash';

/**
 * Every function in service class returns response.
 * Data is set if data is available otherwise error will be set
 */

export class ServiceResponse<T> {
  data?: T;
  success?: number;
  /**
   * @deprecated Use getErrorMessage() instead.
   * Message property can be undefined at times if
   * server fails to return it in some scenarios.
   */
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
