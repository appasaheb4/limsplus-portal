/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
//import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class PatientRegistrationService  {
  sessionManagementList = () =>
    new Promise<any[]>((resolve, reject) => {
      http
        .get(`/settings/environmentSettings/listSessionManagement`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addSessionManagement = (session: any) =>
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

export default PatientRegistrationService
