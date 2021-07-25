// http.ts

import { stores } from "@lp/library/stores"
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import * as Config from "@lp/config"
import Session from "@lp/library/modules/session"
import { ServiceResponse } from "./ServiceResponse"
import _ from "lodash"

enum StatusCode {
  Unauthorized = 401,
  Forbidden = 403,
  TooManyRequests = 429,
  InternalServerError = 500,
}
const blackList = ["send_message"]
const headers: Readonly<Record<string, string | boolean>> = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
  "X-Requested-With": "XMLHttpRequest",
}

// We can use the following function to inject the JWT token through an interceptor
// We get the `accessToken` from the localStorage that we set when we authenticate
const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
  try {
    const token = localStorage.getItem("accessToken")
    if (token != null) {
      config.headers.Authorization = `x-limsplus-key ${token}`
    }
    return config
  } catch (error) {
    throw new Error(error)
  }
}

export class Http {
  private instance: AxiosInstance | null = null
  seesion = Session.getSession()
  accessToken!: string

  constructor() {
    if (!this.accessToken) {
      this.seesion.then((val) => {
        //        console.log({ val })
        this.accessToken = val ? val.accessToken : undefined
      })
    }
  }

  private get http(): AxiosInstance {
    //console.log({ instance: this.instance })
    return this.instance != null ? this.instance : this.initHttp()
  }

  initHttp() {
    const http = Axios.create({
      baseURL: Config.Api.LIMSPLUS_API_HOST,
      headers: {
        ...headers,
        Authorization: `x-limsplus-key ${
          this.accessToken || localStorage.getItem("accessToken")
        }`,
      },
      timeout: 1000 * 30,
    })

    http.interceptors.request.use(
      (config) => {
        console.log("Axios Request: ", config)
        if (!blackList.includes(config.url ?? "")) {
          stores.setLoading(true)
        }
        return injectToken(config)
        //return config
      },
      (error) => {
        stores.setLoading(false)
        return Promise.reject(error)
      }
    )

    http.interceptors.response.use(
      (response) => {
        //console.log("Axios Response: ", response)
        stores.setLoading(false)
        return response
      },
      (error) => {
        console.log("Axios Error: ", error)
        stores.setLoading(false)
        const { response } = error
        return Http.handleError(response)
      }
    )
    const token = localStorage.getItem("accessToken")
    if (token || !this.instance) {
      //localStorage.removeItem("accessToken")
      this.instance = http
    }

    return http
  }

  request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R> {
    return this.http.request<T, R>(config)
  }

  get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config)
  }

  post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config)
  }

  put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config)
  }

  delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config)
  }

  // Handle global app errors
  // We can handle generic app errors depending on the status code
  private static handleError(error: AxiosResponse) {
    const status = error?.status
    const finalResponse = {
      status: 0, // 1= Success,
      message: "There has been some server error. Please try again after some time.",
      data: null,
      fallbackError: true, // Helps to track if client set the error
    }
    switch (status) {
      case StatusCode.InternalServerError: {
        // Handle InternalServerError
        finalResponse.message =
          "There has been some server error. Please try again after some time."
        break
      }
      case StatusCode.Forbidden: {
        // Handle Forbidden
        finalResponse.message =
          "You are not allowed to access. Please try again after some time."
        break
      }
      case StatusCode.Unauthorized: {
        // Handle Unauthorized
        finalResponse.message =
          "You are not authorised. Please try again after some time."
        break
      }
      case StatusCode.TooManyRequests: {
        // Handle TooManyRequests
        finalResponse.message =
          "Server Load has been exceeded. Please try again after some time."
        break
      }
      default:
        break
    }
    return Promise.reject(finalResponse)
  }

  static handleResponse<T>(
    response: AxiosResponse,
    Type?: { new (...args: any): T },
    path?: string
  ): ServiceResponse<T> {
    console.log({ response })

    if (response?.data?.data?.settings?.success) {
      // API Success
      const { settings, data } = response.data.data
      console.log({ settings, data })
   
      const strippedResponse = path ? _.get(data, path) : data
      return new ServiceResponse<T>(
        settings.success, // 1= Success, 0= Failure,
        settings.message,
        Type ? new Type(strippedResponse) : strippedResponse
      )
    }

    if (response?.data?.data?.settings?.hasOwnProperty("success")) {
      // API Error
      return new ServiceResponse<T>(0, response?.data?.data?.settings?.message)
    }

    if (response.hasOwnProperty("fallbackError")) {
      // Unknown network error
      return new ServiceResponse<T>(0, response?.statusText || " ")
    }

    // Service function error
    return new ServiceResponse<T>(0, "App has encountered some issues")
  }
}

export const http = new Http()
