/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class AdministrativeDivisionsService extends BaseService {
  listAdministrativeDivisions = () =>
    new Promise<Models.AdministrativeDivisions[]>((resolve, reject) => {
      this.client
        .get(`master/administrativeDivisions/listAdministrativeDivisions`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addAdministrativeDivisions = (methods?: Models.AdministrativeDivisions) =>
    new Promise<any>((resolve, reject) => {
      this.client
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
      this.client
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
      this.client
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
