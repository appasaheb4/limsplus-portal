/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { Http, http, ServiceResponse } from "@lp/library/modules/http"

class EnvironmentSettingsService  {
  sessionManagementList = (page=0,limit=10) =>
    new Promise<any>((resolve, reject) => {
      http
        .get(`/settings/environmentSettings/listSessionManagement/${page}/${limit}`)
        .then((response: any) => {
          const serviceResponse = Http.handleResponse<any>(response)
          resolve(serviceResponse)
        })
        .catch((error) => {
          reject(new ServiceResponse<any>(0, error.message, undefined))
        })
    })
  addSessionManagement = (session: Models.SessionManagement) =>
    new Promise<any>((resolve, reject) => {
      session.documentType = "session"
      http
        .post(`/settings/environmentSettings/addSessionManagement`, session)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  deleteEnvironmentSettings = (id: string) =>
    new Promise<any>((resolve, reject) => {
      http
        .delete(`/settings/environmentSettings/deleteEnvironmentSettings/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      console.log({newValue});
      
      http
        .post(`/settings/environmentSettings/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default EnvironmentSettingsService
