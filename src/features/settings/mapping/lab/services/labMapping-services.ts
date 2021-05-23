/**
 * @fileoverview Use this file invoke Memetoons API
 * implementation related to Memetoons standards
 * @package Feed Service
 * @author limsplus
 */
import * as Models from "../models"
import BaseService from "@lp/library/modules/base-service"

class LabMappingService extends BaseService {
  labMappingList = () =>
    new Promise<Models.ILabMapping[]>((resolve, reject) => {
      this.client
        .get(`/mapping/labMappingList`)
        .then((res) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addLabMapping = (userMapping: any) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .post(`/mapping/addLabMapping`, userMapping)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  deleteLabMapping = (id: string) =>
    new Promise<any>((resolve, reject) => {
      this.client
        .delete(`/mapping/deleteLabMapping/${id}`)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {  
          reject({ error })
        })
    })
}
export default LabMappingService
