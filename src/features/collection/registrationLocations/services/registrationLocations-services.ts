/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"
import { stores } from "@lp/library/stores"

class RegistrationLocationsService  {
  listRegistrationLocations = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      const env = stores.loginStore.login && stores.loginStore.login.environment
      const role = stores.loginStore.login && stores.loginStore.login.role
      http
        .get(`master/registartionLocations/listRegistrationLocations/${page}/${limit}/${env}/${role}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
    addRegistrationLocations = (regLocation?: Models.RegistrationLocations) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/registartionLocations/addRegistrationLocations`, regLocation)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    versionUpgradeRegistrationLocations = (doctor?: Models.RegistrationLocations) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/registartionLocations/versionUpgradeRegistrationLocations`, doctor)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    duplicateRegistrationLocations = (regLocation?: Models.RegistrationLocations) =>
    new Promise<any>((resolve, reject) => {
      http
        .post(`master/registartionLocations/duplicateRegistrationLocations`, regLocation)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    deleteRegistrationLocations = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`master/registartionLocations/deleteRegistrationLocations/${id}`)
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
        .post(`master/registartionLocations/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)   
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default RegistrationLocationsService
