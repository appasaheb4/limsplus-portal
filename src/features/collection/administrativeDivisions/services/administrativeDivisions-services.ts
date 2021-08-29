/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { stores } from "@lp/library/stores"

class AdministrativeDivisionsService {
  listAdministrativeDivisions = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(
          `master/administrativeDivisions/listAdministrativeDivisions/${page}/${limit}/${env}/${role}`
        )
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addAdministrativeDivisions = (methods?: Models.AdministrativeDivisions) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/administrativeDivisions/addAdministrativeDivisions`, methods)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteAdministrativeDivisions = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`master/administrativeDivisions/deleteAdministrativeDivisions/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/administrativeDivisions/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default AdministrativeDivisionsService
