/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class DeginisationService extends BaseService {
  listDeginisation = () =>
    new Promise<Models.IDeginisation[]>((resolve, reject) => {
      this.client
        .get(`/deginisation/listDeginisation`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addDeginisation = (deginisation?: Models.IDeginisation) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/deginisation/addDeginisation`, deginisation)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteDeginisation = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`/deginisation/deleteDeginisation/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  checkExitsCode = (code: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/deginisation/checkExitsCode`, { code })
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })

  updateSingleFiled = (newValue: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/deginisation/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default DeginisationService
