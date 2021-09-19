/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */

import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { stores } from "@lp/stores"

class CorporateClientsService {
  listCorporateClients = (page = 0, limit = 10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(
          `master/corporateClients/listCorporateClients/${page}/${limit}/${env}/${role}`
        )
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addCorporateClients = (clients?: Models.CorporateClients) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/corporateClients/addCorporateClients`, clients)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    versionUpgradeCorporateClient = (analyte?: Models.CorporateClients) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/corporateClients/versionUpgradeCorporateClient`, analyte)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })  
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  duplicateCorporateClient = (analyte?: Models.CorporateClients) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/corporateClients/duplicateCorporateClient`, analyte)
        .then((response) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  deleteCorporateClients = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`master/corporateClients/deleteCorporateClients/${id}`)
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
        .post(`master/corporateClients/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  checkExistsEnvCode = (code: string, env: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`/master/corporateClients/checkExistsEnvCode`, { code, env })
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
}

export default CorporateClientsService
