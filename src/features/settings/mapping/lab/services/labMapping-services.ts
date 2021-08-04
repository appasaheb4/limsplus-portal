/**
 * @fileoverview Use this file invoke LimsPlus API
 * implementation related to LimsPlus standards
 
 * @author limsplus
 */
import * as Models from "../models"
import { http } from "@lp/library/modules/http"

class LabMappingService  {
  labMappingList = () =>
    new Promise<Models.ILabMapping[]>((resolve, reject) => {
      http
        .get(`/mapping/labMappingList`)
        .then((res: any) => {
          resolve(res.data.data)
        })
        .catch((error) => {
          reject({ error })
        })
    })
  addLabMapping = (userMapping: any) =>
    new Promise<any>((resolve, reject) => {
      http
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
      http
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
