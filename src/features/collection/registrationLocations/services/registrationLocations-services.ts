/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class RegistrationLocationsService extends BaseService {
  listRegistrationLocations = () =>
    new Promise<Models.RegistrationLocations[]>((resolve, reject) => {
      this.client
        .get(`master/registartionLocations/listRegistrationLocations`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
    addRegistrationLocations = (regLocation?: Models.RegistrationLocations) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
      this.client
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
      this.client
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
      this.client
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
      this.client
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
