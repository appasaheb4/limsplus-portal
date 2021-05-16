/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class LoginService extends BaseService {
  accountStatusUpdate = (statusInfo: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`auth/statusUpdate`, statusInfo)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  forgotPassword = (userInfo: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`auth/forgotPassword`, userInfo)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  logout = (details: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/auth/logout`, details)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default LoginService
