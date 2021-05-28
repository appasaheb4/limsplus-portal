/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class PatientRegistrationService extends BaseService {
  sessionManagementList = () =>
    new Promise<Models.SessionManagement[]>((resolve, reject) => {
      this.client
        .get(`/settings/environmentSettings/listSessionManagement`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addSessionManagement = (session: Models.SessionManagement) =>
    new Promise<any>((resolve, reject) => {
      session.documentType = "session"
      this.client
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
      this.client
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
      
      this.client
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
