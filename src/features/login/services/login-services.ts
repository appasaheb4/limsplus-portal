/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
//import * as Models from "../models"
import { http } from "@lp/library/modules/http"

export class LoginService {
  onLogin = (user: any) =>
    new Promise<any>((resolve, reject) => {
      http
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
      http
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
      http
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
      http
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
      http
        .post(`/auth/sessionAllowedLogout`, details)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}
