/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class MasterAnalyteService extends BaseService {
  listAnalyteMaster = () =>
    new Promise<Models.MasterAnalyte[]>((resolve, reject) => {
      this.client
        .get(`master/analyteMaster/listAnalyteMaster`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addAnalyteMaster = (analyte?: Models.MasterAnalyte) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`master/analyteMaster/addAnalyteMaster`, analyte)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteAnalyteMaster = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`master/analyteMaster/deleteAnalyteMaster/${id}`)
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
        .post(`master/analyteMaster/updateSingleFiled`, newValue)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
}

export default MasterAnalyteService
