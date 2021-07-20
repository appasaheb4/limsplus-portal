/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class AdministrativeDivisionsService  {
  listAdministrativeDivisions = () =>
    new Promise<Models.AdministrativeDivisions[]>((resolve, reject) => {
      http
        .get(`master/administrativeDivisions/listAdministrativeDivisions`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
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
