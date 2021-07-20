/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class EnvironmentSettingsService  {
  sessionManagementList = () =>
    new Promise<Models.SessionManagement[]>((resolve, reject) => {
      http
        .get(`/settings/environmentSettings/listSessionManagement`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
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
