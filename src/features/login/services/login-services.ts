/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class LoginService extends BaseService {
  onLogin = (user: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/auth/login`, user)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
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

  sessionAllowedLogout = (details: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/auth/sessionAllowedLogout`, details)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default LoginService
