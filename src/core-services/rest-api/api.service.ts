import Axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import _ from 'lodash';
import {ServiceResponse} from './response-handle.service';
import {stores} from '@/stores';

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
};

export class Service {
  private instance: AxiosInstance | null = null;
  accessToken!: string;
  baseURL!: string;
  constructor(baseUrl) {
    this.baseURL = baseUrl;
  }

  private get service(): AxiosInstance {
    return this.instance != null ? this.instance : this.initService();
  }

  initService() {
    const service = Axios.create({
      baseURL: this.baseURL,
      headers:
        this.baseURL != 'https://api.postalpincode.in'
          ? {
              // header hide buz pin code wise address not fetch
              ...headers,
            }
          : {},
      timeout: 1000 * Number.parseInt('40', 20),
    });

    service.interceptors.request.use(
      config => {
        console.log({config});
        stores.setLoading(true);
        config.headers = {
          ...config.headers,
        };
        return config;
      },
      error => {
        stores.setLoading(false);
        console.log({error});
        const {response} = error;
        if (!response) {
          return Promise.reject({
            status: 500,
          });
        }
      },
    );

    service.interceptors.response.use(
      response => {
        console.log({response});
        stores.setLoading(false);
        return response;
      },
      error => {
        console.log({error});
        stores.setLoading(false);
        const {response} = error;
        if (Axios.isCancel(error)) {
          return Promise.reject({
            status: 408,
          });
        } else if (!response) {
          return Promise.reject({
            status: 500,
          });
        }
        const {data: errorMessage} = response;
        return errorMessage;
      },
    );
    return service;
  }

  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig,
  ): Promise<R> {
    return this.service.request<T, R>(config);
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.service.get<T, R>(url, config);
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.service.post<T, R>(url, data, config);
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.service.put<T, R>(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<R> {
    return this.service.delete<T, R>(url, config);
  }

  static handleResponse<T>(
    response: AxiosResponse,
    Type?: {new (...args: any): T},
    path?: string,
  ): ServiceResponse<T> {
    if (response?.data?.successful_response) {
      // API Success
      const {error, successful_response, data} = response.data;
      const strippedResponse = path ? _.get(data, path) : data;
      return new ServiceResponse<T>(
        successful_response ? 1 : 0, // 1= Success, 0= Failure,
        error?.message || '',
        Type ? new Type(strippedResponse) : strippedResponse,
      );
    }

    // eslint-disable-next-line no-prototype-builtins
    if (response?.data?.status.hasOwnProperty('success')) {
      // API Error
      return new ServiceResponse<T>(0, response?.data?.error?.message);
    }
    // eslint-disable-next-line no-prototype-builtins
    if (response?.data?.status?.hasOwnProperty('fallbackError')) {
      // Unknown network error
      return new ServiceResponse<T>(0, response?.data?.error?.message || ' ');
    }
    // eslint-disable-next-line no-prototype-builtins
    if (response?.data?.status === 'error') {
      // API Error with error object
      const {error, successful_response} = response.data;
      return new ServiceResponse<T>(
        successful_response ? 1 : 0, // 1= Success, 0= Failure,
        error?.message || '',
        error,
      );
    }
    // Service function error
    //return new ServiceResponse<T>(0, 'App has encountered some issues');
    return new ServiceResponse<T>(0, response?.data);
  }
}
export const service = new Service('');
