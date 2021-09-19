/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { stores } from "@lp/stores"

class DeginisationService {
  listDeginisation = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(`/deginisation/listDeginisation/${page}/${limit}/${env}/${role}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addDeginisation = (deginisation?: Models.Deginisation) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/deginisation/addDeginisation`, deginisation)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteDeginisation = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/deginisation/deleteDeginisation/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    

  checkExitsEnvCode = (code: string, env: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/deginisation/checkExitsEnvCode`, { code, env })
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {  
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })

    

  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/deginisation/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default DeginisationService
