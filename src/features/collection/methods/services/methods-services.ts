/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class MethodsService extends BaseService {
  listMethods = () =>
    new Promise<Models.Methods[]>((resolve, reject) => {
      this.client
        .get(`master/methods/listMethods`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addMethods = (methods?: Models.Methods) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`master/methods/addMethods`, methods)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteMethods = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`master/methods/deleteMethods/${id}`)
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
        .post(`master/methods/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)   
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default MethodsService
