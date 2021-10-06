/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @author limsplus
 */

import { Http, http } from "@lp/library/modules/http"
import { client, ServiceResponse } from "@lp/library/modules/apolloClient"
import {LOGIN} from './mutation'
export class LoginService {
  onLogin = (variables: any) =>
    new Promise<any>((resolve, reject) => {
      client  
      .mutate({
        mutation: LOGIN,
        variables
      })
      .then((response: any) => {
        console.log({ response })
        resolve(response.data)
      })
      .catch((error) =>
        reject(new ServiceResponse<any>(0, error.message, undefined))
      )

      // http
      //   .post(`/auth/login`, user)
      //   .then((response) => {
      //     const serviceResponse = Http.handleResponse<any>(response)
      //     resolve(serviceResponse)
      //   })
      //   .catch((error) => {
      //     reject(new ServiceResponse<any>(0, error.message, undefined))
      //   })


    })

  accountStatusUpdate = (statusInfo: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`auth/statusUpdate`, statusInfo)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  forgotPassword = (userInfo: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`auth/forgotPassword`, userInfo)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  logout = (details: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/auth/logout`, details)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

  sessionAllowedLogout = (details: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({ details })
  
      http
        .post(`/auth/sessionAllowedLogout`, details)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}
